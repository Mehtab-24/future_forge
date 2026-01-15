import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: undefined,
  experimental: {
    // Disable problematic features
    turbo: undefined,
  },
  // Fix for multiple lock files
  webpack: (config, { isServer }) => {
    // Remove any vite-related configurations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@vite/client': false,
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Proxy API requests to backend server
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
}

export default nextConfig
