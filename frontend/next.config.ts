import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: undefined,
  // Configure Turbopack to work with webpack config
  turbopack: {},
  // Fix for multiple lock files
  webpack: (config) => {
    // Remove any vite-related configurations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@vite/client': false,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Proxy API requests to backend server
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
}

export default nextConfig
