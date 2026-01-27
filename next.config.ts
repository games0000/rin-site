import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Disabled for API routes to work
  images: {
    unoptimized: true,
  },
  // Ensure API routes are treated as serverless functions
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
