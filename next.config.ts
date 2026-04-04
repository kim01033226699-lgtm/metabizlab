import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/metabizlab',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
