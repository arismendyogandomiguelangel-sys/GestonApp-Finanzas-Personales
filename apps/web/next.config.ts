import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: [
    "@opentelemetry/sdk-node",
    "@opentelemetry/exporter-trace-otlp-grpc",
    "@opentelemetry/otlp-grpc-exporter-base",
    "@grpc/grpc-js",
    "pg",
  ],
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    proxyClientMaxBodySize: "100mb",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
