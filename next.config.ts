import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fcyrimjuwctjvvoijrqi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // output: "export",

};

export default nextConfig;
