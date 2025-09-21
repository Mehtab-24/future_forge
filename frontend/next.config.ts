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
}

export default nextConfig
