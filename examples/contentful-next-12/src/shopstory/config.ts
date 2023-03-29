import { Config } from "@shopstory/core";
import { shopstoryBaseConfig } from "shared/shopstory/baseConfig";
import {contentfulPlugin} from "@shopstory/contentful";

export const shopstoryConfig: Config = {
  ...shopstoryBaseConfig,
  plugins: [
    contentfulPlugin({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE!,
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? "master",
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
      previewAccessToken:
        process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
    }),
  ]
};
