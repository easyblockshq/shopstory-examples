/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["shared"],
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
