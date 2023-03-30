require("dotenv").config();

import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-4`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-pnpm`,
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken:
          process.env.GATSBY_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN ??
          process.env.GATSBY_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.GATSBY_PUBLIC_CONTENTFUL_SPACE,
        host: process.env.GATSBY_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
          ? "preview.contentful.com"
          : undefined,
      },
    },
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          modules: {
            namedExport: false,
          },
        },
      },
    },
  ],
};

export default config;
