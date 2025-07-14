import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['id.worldcoin.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'id.worldcoin.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ["https://be.pawaret.uk", "https://world.pawaret.dev"],
};

export default nextConfig;
