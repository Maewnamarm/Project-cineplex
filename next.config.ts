import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ปิดการตรวจสอบ ESLint ระหว่าง build
  },
  typescript: {
    ignoreBuildErrors: true, // ปิดการตรวจสอบ TypeScript errors ระหว่าง build
  },
};

export default nextConfig;
