/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ["shared"],
  images: {
    domains: ["cdn.sanity.io", "images.ctfassets.net"],
  },
};

module.exports = nextConfig;
