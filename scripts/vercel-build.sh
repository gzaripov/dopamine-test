#!/bin/bash
set -e

# Generate Prisma client & build app
bunx prisma generate
bun run build

# Prepare Vercel Build Output API structure
rm -rf .vercel/output
mkdir -p .vercel/output/static
mkdir -p .vercel/output/functions/ssr.func

# Static client assets
cp -r dist/client/* .vercel/output/static/

# Server function — copy server bundle + node_modules
cp -r dist/server/* .vercel/output/functions/ssr.func/
cp -r node_modules .vercel/output/functions/ssr.func/node_modules
cp package.json .vercel/output/functions/ssr.func/

# Vercel function config
cat > .vercel/output/functions/ssr.func/.vc-config.json << 'EOF'
{
  "runtime": "nodejs22.x",
  "handler": "handler.js",
  "launcherType": "Nodejs",
  "maxDuration": 30
}
EOF

# Thin handler wrapper that converts Vercel's Node handler to the fetch API
cat > .vercel/output/functions/ssr.func/handler.js << 'HANDLER'
import server from './server.js';

export default async function handler(req, res) {
  try {
    // Build a Web Request from Node's IncomingMessage
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (val) headers.set(key, Array.isArray(val) ? val.join(', ') : val);
    }

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body: hasBody ? req : undefined,
      duplex: hasBody ? 'half' : undefined,
    });

    const webResponse = await server.fetch(webRequest);

    // Write response
    res.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      };
      await pump();
    } else {
      res.end(await webResponse.text());
    }
  } catch (err) {
    console.error('SSR Error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
HANDLER

# Routing config
cat > .vercel/output/config.json << 'EOF'
{
  "version": 3,
  "routes": [
    { "src": "/assets/(.*)", "headers": { "Cache-Control": "public, max-age=31536000, immutable" } },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/ssr" }
  ]
}
EOF

echo "Vercel build output ready"
