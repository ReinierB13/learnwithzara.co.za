import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-68019f01cee142348aa3e9e8cbf6b13b.r2.dev",
        pathname: "/calendar/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
