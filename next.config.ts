import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@tsparticles/react",
    "@tsparticles/slim",
    "@tsparticles/engine",
  ],
};

export default nextConfig;
