import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    // Default is 10 MB. The /api/chat route sends base64-encoded images in the
    // JSON body — 5 screenshots easily exceed 10 MB. Set to 100 MB to match
    // the upstream Cloudflare free-plan limit.
    proxyClientMaxBodySize: "100mb",
  },
};

export default nextConfig;
