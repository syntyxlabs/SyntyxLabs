import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "framer-motion",
    "@tsparticles/react",
    "@tsparticles/slim",
    "@tsparticles/engine",
  ],
};

export default nextConfig;
