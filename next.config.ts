import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
=======
  allowedDevOrigins: ["192.168.0.174"],
>>>>>>> niloy
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
