import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages resolves /work/ as work/index.html, not work.html.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
