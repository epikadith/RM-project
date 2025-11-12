/**
 * Simple HTTP Server for Performance Benchmarks
 * Usage: node server.js
 * Then open http://localhost:3000/benchmark.html
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const BASE_DIR = __dirname;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.wasm': 'application/wasm',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Default to index.html or benchmark.html
    if (pathname === '/') {
        pathname = '/benchmark.html';
    }

    // Construct full file path
    let filePath = path.join(BASE_DIR, pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(BASE_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found\n\nRequested: ' + pathname);
            console.log(`[404] ${req.method} ${pathname}`);
            return;
        }

        // Get file extension
        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // For WASM files, set specific headers
        if (ext === '.wasm') {
            res.setHeader('Content-Type', 'application/wasm');
        } else {
            res.setHeader('Content-Type', contentType);
        }

        // Stream the file
        res.writeHead(200);
        fs.createReadStream(filePath).pipe(res);
        
        console.log(`[200] ${req.method} ${pathname}`);
    });
});

server.listen(PORT, 'localhost', () => {
    console.log('\n========================================');
    console.log('🚀 Performance Benchmark Server Started');
    console.log('========================================');
    console.log(`\n📍 Server running at: http://localhost:${PORT}`);
    console.log(`📍 Benchmark tests: http://localhost:${PORT}/benchmark.html`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Error: Port ${PORT} is already in use`);
        console.error('Try using a different port or killing the process using that port');
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server...');
    server.close(() => {
        console.log('Server stopped');
        process.exit(0);
    });
});
