import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "liquipedia.net" },
      { protocol: "https", hostname: "*.liquipedia.net" },
    ],
  },
};

export default nextConfig;
