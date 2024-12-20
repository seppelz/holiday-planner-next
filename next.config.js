/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Proxy /app/* requests to the Vite dev server
        {
          source: '/app/:path*',
          destination: 'http://localhost:5173/app/:path*',
        },
        // Handle old routes for compatibility
        {
          source: '/holiday/:path*',
          destination: '/app/:path*',
        }
      ],
    }
  },
  // Use static exports for better performance
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig 