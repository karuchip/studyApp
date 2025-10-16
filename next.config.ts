import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname, // ← 明示的にルートを指定
  },
};

export default nextConfig;
