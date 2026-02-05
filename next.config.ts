import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',
      },
    ],
    // Disable image optimization for OpenWeatherMap icons
    // as they don't need optimization and might cause IP resolution issues
    unoptimized: true,
  },
  // Add this to prevent the private IP resolution error
  experimental: {
    serverActions: {
      allowedOrigins: ['openweathermap.org'],
    },
  },
};

export default nextConfig;
