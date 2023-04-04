const withTM = require("next-transpile-modules")(["shared"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      "i.picsum.photos",
      "eu-images.contentstack.com",
      "shopstory.s3.eu-central-1.amazonaws.com",
      "images.ctfassets.net"
    ],
  },
  i18n: {
    locales: ["en-us", "de-de"],
    defaultLocale: "en-us",
  },
};

module.exports = withTM(nextConfig);
