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
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "2OqujCwpaLi_bz7mHNrFUthl2aidK0UgVeumw_2vlsc",
        spaceId: "blh4anz05qu1",
        host: "preview.contentful.com",
      },
    },
    "gatsby-plugin-image",
  ],
};

export default config;
