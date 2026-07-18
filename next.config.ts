import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
