import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.sirv.com",
      },
      {
        protocol: "https",
        hostname: "sirv.com",
      },
    ],
  },
};

export default nextConfig;
