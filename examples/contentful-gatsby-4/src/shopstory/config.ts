import { Config } from "@shopstory/core";
import { contentfulPlugin } from "@shopstory/contentful";
import { shopstoryBaseConfig } from "../../../../shared/shopstory/baseConfig";

export const shopstoryConfig: Config = {
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
