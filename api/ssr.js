// Static import so Vercel's nft can trace the dependency graph at build time
import server from '../dist/server/server.js';

// Resolve the correct export shape (may be nested default)
const app = server?.default || server;

// Pages that don't hit the database can be cached at the edge
const CACHEABLE_PATHS = ['/', '/test'];

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

    const webResponse = await app.fetch(webRequest);

    res.statusCode = webResponse.status;
    for (const [key, value] of webResponse.headers.entries()) {
      res.setHeader(key, value);
    }

    // Cache static pages at the Vercel edge
    if (CACHEABLE_PATHS.includes(url.pathname) && req.method === 'GET') {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');
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
    console.error('SSR Error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error: ' + (err?.message || 'Unknown'));
  }
}
