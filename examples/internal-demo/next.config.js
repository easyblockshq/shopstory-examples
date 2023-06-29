/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["shared"],
  images: {
    domains: ["images.ctfassets.net", "gveekliishdkkfnppfpt.supabase.co"],
  },
};

module.exports = nextConfig;
