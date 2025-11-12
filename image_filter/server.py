#!/usr/bin/env python3
"""
Simple HTTP Server for Performance Benchmarks
Usage: python3 server.py
Then open http://localhost:3000/benchmark.html
"""

import os
import sys
import argparse
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

class BenchmarkRequestHandler(SimpleHTTPRequestHandler):
    """Custom request handler with proper MIME types and CORS headers"""
    
    def end_headers(self):
        """Add CORS headers to all responses"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def translate_path(self, path):
        """Override to serve benchmark.html as index"""
        if path == '/':
            path = '/benchmark.html'
        return super().translate_path(path)

    def log_message(self, format, *args):
        """Override logging with more readable format"""
        if args[1] == 200:
            print(f"✓ [200] {args[0]}")
        elif args[1] == 404:
            print(f"✗ [404] {args[0]}")
        else:
            print(f"• [{args[1]}] {args[0]}")


def run_server(port=3000, directory=None):
    """Run the benchmark server"""
    
    if directory:
        os.chdir(directory)
    
    # Change to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    server_address = ('localhost', port)
    httpd = HTTPServer(server_address, BenchmarkRequestHandler)
    
    print("\n" + "="*50)
    print("🚀 Performance Benchmark Server Started")
    print("="*50)
    print(f"\n📍 Server running at: http://localhost:{port}")
    print(f"📍 Benchmark tests: http://localhost:{port}/benchmark.html")
    print(f"📁 Serving from: {os.getcwd()}")
    print("\nPress Ctrl+C to stop the server\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Shutting down server...")
        httpd.server_close()
        print("Server stopped")
        sys.exit(0)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Start a benchmark server for WASM vs JS performance tests'
    )
    parser.add_argument(
        '-p', '--port',
        type=int,
        default=3000,
        help='Port to run server on (default: 3000)'
    )
    parser.add_argument(
        '-d', '--directory',
        type=str,
        help='Directory to serve from (default: current directory)'
    )
    
    args = parser.parse_args()
    
    run_server(port=args.port, directory=args.directory)
