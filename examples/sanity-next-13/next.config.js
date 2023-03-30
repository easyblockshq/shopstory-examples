const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["shared"],
  i18n: {
    locales: ["en-US", "de-DE"],
    defaultLocale: "en-US",
  },
};

module.exports = nextConfig;
