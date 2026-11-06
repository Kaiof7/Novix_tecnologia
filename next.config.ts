import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site estático: só lê config/*.json no build e o pedido vai pelo WhatsApp (ver docs/architecture.md).
  // cacheComponents/partialPrefetching do create-next-app foram tirados: exigem runtime Node.
  output: "export",
  // As capturas já saem otimizadas em WebP por scripts/capture-portfolio.mjs.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
