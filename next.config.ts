import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ปิดการตรวจสอบ ESLint ระหว่าง build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ปิดการตรวจสอบ TypeScript errors ระหว่าง build
    ignoreBuildErrors: true,
  },
  // เพิ่ม config options อื่นๆ ที่นี่ถ้าจำเป็น
};
  /* config options here */
// next.config.js (ถ้ามี)
module.exports = {
  reactStrictMode: true,
};


export default nextConfig;
