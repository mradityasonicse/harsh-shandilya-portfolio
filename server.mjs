import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, 'dist');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const SITE_URL = (process.env.SITE_URL || 'https://YOUR_DOMAIN_HERE.com').replace(/\/+$/, '');

// Ensure the dist directory exists before starting
if (!fs.existsSync(DIST_DIR)) {
  console.error('\n❌ ERROR: Build directory "dist" not found!');
  console.error('👉 Please run "npm run build" first before starting the production server.\n');
  process.exit(1);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const COMPRESSIBLE_EXTENSIONS = new Set([
  '.html',
  '.js',
  '.mjs',
  '.css',
  '.json',
  '.svg',
  '.txt',
  '.xml',
]);

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

function getCacheControl(relativePath) {
  // Vite hashed assets can be cached aggressively (1 year, immutable)
  if (relativePath.startsWith('/assets/')) {
    return 'public, max-age=31536000, immutable';
  }
  // HTML documents should always be revalidated for immediate updates
  if (relativePath.endsWith('.html') || relativePath === '/' || relativePath === '') {
    return 'no-cache, no-store, must-revalidate';
  }
  // Media, fonts, favicon, and documents
  return 'public, max-age=86400, stale-while-revalidate=604800';
}

const server = http.createServer((req, res) => {
  // Only allow GET and HEAD requests for static file hosting
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET, HEAD' });
    res.end('Method Not Allowed');
    return;
  }

  // Health check endpoint for AWS Target Groups, Route 53, or ALB (Explicitly noindexed)
  if (req.url === '/health' || req.url === '/healthz') {
    const healthData = JSON.stringify({
      status: 'healthy',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
      ...SECURITY_HEADERS,
    });
    res.end(healthData);
    return;
  }

  // Parse requested URL pathname
  let reqPath = '/';
  let searchParams = '';
  try {
    const parsed = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    reqPath = decodeURIComponent(parsed.pathname);
    searchParams = parsed.search || '';
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  // Technical SEO 1: Permanent 301 Redirect for duplicate `/index.html` -> `/`
  if (reqPath.toLowerCase() === '/index.html') {
    const destination = `/${searchParams}`;
    res.writeHead(301, {
      'Location': destination,
      'Cache-Control': 'public, max-age=31536000',
    });
    res.end();
    return;
  }

  // Technical SEO 2: Normalize trailing slashes for non-root paths (e.g., `/about/` -> `/about`)
  if (reqPath.length > 1 && reqPath.endsWith('/')) {
    const cleanPath = reqPath.slice(0, -1);
    const destination = `${cleanPath}${searchParams}`;
    res.writeHead(301, {
      'Location': destination,
      'Cache-Control': 'public, max-age=31536000',
    });
    res.end();
    return;
  }

  // Normalize path and prevent directory traversal
  let safeRelativePath = path.posix.normalize(reqPath);
  if (safeRelativePath.startsWith('..') || safeRelativePath.includes('/../')) {
    res.writeHead(403, {
      'Content-Type': 'text/plain',
      'X-Robots-Tag': 'noindex, nofollow',
    });
    res.end('Forbidden');
    return;
  }

  let filePath = path.join(DIST_DIR, safeRelativePath);

  // Check if file exists, or if it is a directory try index.html
  let fileStats = null;
  try {
    fileStats = fs.statSync(filePath);
    if (fileStats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      fileStats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    }
  } catch {
    fileStats = null;
  }

  // Technical SEO 3: Soft 404 Prevention
  // If the path has a file extension (e.g. .png, .js, .css) and is not found, return true HTTP 404!
  const hasFileExtension = path.extname(safeRelativePath) !== '';
  let isSpaFallback = false;

  if (!fileStats) {
    if (hasFileExtension) {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow',
        ...SECURITY_HEADERS,
      });
      res.end('404 Not Found');
      return;
    }

    // Clean SPA route fallback for paths without extensions (e.g. /projects, /about)
    filePath = path.join(DIST_DIR, 'index.html');
    isSpaFallback = true;
    try {
      fileStats = fs.statSync(filePath);
    } catch {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow',
      });
      res.end('File Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const cacheControl = isSpaFallback ? 'no-cache, no-store, must-revalidate' : getCacheControl(safeRelativePath);

  const headers = {
    'Content-Type': contentType,
    'Cache-Control': cacheControl,
    ...SECURITY_HEADERS,
  };

  // Add Canonical Link Header for HTML documents (RFC 5988)
  if (ext === '.html') {
    headers['Link'] = `<${SITE_URL}/>; rel="canonical"`;
  }

  // If HEAD request, respond with headers only
  if (req.method === 'HEAD') {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  // Handle gzip compression for compressible text assets
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const canCompress = COMPRESSIBLE_EXTENSIONS.has(ext) && acceptEncoding.includes('gzip');

  if (canCompress) {
    headers['Content-Encoding'] = 'gzip';
    res.writeHead(200, headers);

    const rawStream = fs.createReadStream(filePath);
    const gzip = zlib.createGzip({ level: 6 });

    rawStream.pipe(gzip).pipe(res);

    rawStream.on('error', (err) => {
      console.error('File stream error:', err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  } else {
    headers['Content-Length'] = fileStats.size;
    res.writeHead(200, headers);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

    stream.on('error', (err) => {
      console.error('File stream error:', err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  }
});

// Start listening
server.listen(PORT, HOST, () => {
  console.log(`\n🚀 Harsh Portfolio Production Server is running!`);
  console.log(`   - Local:     http://localhost:${PORT}`);
  console.log(`   - Network:   http://${HOST}:${PORT}`);
  console.log(`   - Directory: ${DIST_DIR}`);
  console.log(`   - Site URL:  ${SITE_URL}`);
  console.log(`   - Health:    http://localhost:${PORT}/health\n`);
});

// Handle graceful shutdown
function shutdown(signal) {
  console.log(`\n[${signal}] Shutting down server gracefully...`);
  server.close(() => {
    console.log('✅ Server closed cleanly. Bye!');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('⚠️ Forcing server shutdown after timeout.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
