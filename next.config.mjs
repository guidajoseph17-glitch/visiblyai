/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },   // <-- add this line
  experimental: {
    serverActions: { allowedOrigins: ['*'] }
  }
};
export default nextConfig;
