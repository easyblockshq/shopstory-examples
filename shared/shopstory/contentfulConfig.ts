import { Config } from "@shopstory/core";
import {contentfulPlugin} from "@shopstory/core/contentful";
import { shopstoryBaseConfig } from "./baseConfig";

export const shopstoryContentfulConfig: Config = {
  ...shopstoryBaseConfig,
  plugins: [
    contentfulPlugin({
      space: process.env.GATSBY_PUBLIC_CONTENTFUL_SPACE!,
      environment: process.env.GATSBY_PUBLIC_CONTENTFUL_ENVIRONMENT ?? "master",
      accessToken: process.env.GATSBY_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
      previewAccessToken:
        process.env.GATSBY_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
    }),
  ],
};
