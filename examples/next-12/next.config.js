const withTM = require("next-transpile-modules")(["shared"]); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.picsum.photos", "images.ctfassets.net"],
  },
  i18n: {
    locales: ["en-US", "de-DE"],
    defaultLocale: "en-US",
  },
};

module.exports = withTM(nextConfig);
