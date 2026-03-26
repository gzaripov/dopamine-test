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

# Bundle server into a single self-contained file
bun build dist/server/server.js \
  --outdir .vercel/output/functions/ssr.func \
  --outfile bundled-server.js \
  --target node \
  --format esm \
  --external @prisma/client \
  --external .prisma/client \
  --external prisma

# Copy only the Prisma client (not all node_modules)
mkdir -p .vercel/output/functions/ssr.func/node_modules/.prisma
mkdir -p .vercel/output/functions/ssr.func/node_modules/@prisma
cp -r node_modules/.prisma/client .vercel/output/functions/ssr.func/node_modules/.prisma/client
cp -r node_modules/@prisma/client .vercel/output/functions/ssr.func/node_modules/@prisma/client

# Show engine files for debugging
echo "Prisma engine files:"
ls -la .vercel/output/functions/ssr.func/node_modules/.prisma/client/ | grep -E "engine|\.node|\.so"

# Vercel function config
cat > .vercel/output/functions/ssr.func/.vc-config.json << 'EOF'
{
  "runtime": "nodejs22.x",
  "handler": "handler.mjs",
  "launcherType": "Nodejs",
  "maxDuration": 30
}
EOF

# Handler wrapper — use .mjs extension for guaranteed ESM
cat > .vercel/output/functions/ssr.func/handler.mjs << 'HANDLER'
const mod = await import('./bundled-server.js');
const server = mod.default?.default || mod.default;

export default async function handler(req, res) {
  try {
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

    res.statusCode = webResponse.status;
    for (const [key, value] of webResponse.headers.entries()) {
      res.setHeader(key, value);
    }

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end(await webResponse.text());
    }
  } catch (err) {
    console.error('SSR Error:', err?.message, err?.stack);
    res.statusCode = 500;
    res.end('Internal Server Error: ' + (err?.message || 'Unknown'));
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
du -sh .vercel/output/functions/ssr.func/ | sed 's/^/Function size: /'
