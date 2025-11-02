#!/usr/bin/env python3
"""
CORS-enabled HTTP Server for local development
Run: python cors_server.py
Then visit: http://localhost:8000
"""
import http.server
import socketserver
import os
import sys

PORT = 8000

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler with CORS headers"""

    def end_headers(self):
        """Add CORS headers to all responses"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        """Handle OPTIONS requests"""
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        """Custom logging"""
        print(f"[{self.log_date_time_string()}] {format % args}")

# Change to script directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("=" * 50)
print("🚀 CORS Server Starting...")
print("=" * 50)
print(f"📍 Visit: http://localhost:{PORT}")
print(f"📁 Serving files from: {os.getcwd()}")
print("Press Ctrl+C to stop")
print("=" * 50)

try:
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n✅ Server stopped")
    sys.exit(0)
except OSError as e:
    print(f"❌ Error: {e}")
    print(f"   Is port {PORT} already in use?")
    sys.exit(1)
