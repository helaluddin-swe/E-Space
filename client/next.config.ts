import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // Allows all images from this host
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Corrected Unsplash hostname
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;