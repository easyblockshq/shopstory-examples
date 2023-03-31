/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["shared"],
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
