import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Disabled for API routes to work
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
