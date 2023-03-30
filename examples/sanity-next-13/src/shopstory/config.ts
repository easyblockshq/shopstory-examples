import type { Config } from "@shopstory/core";
import { sanityPlugin } from "@shopstory/sanity";
import { shopstoryBaseConfig } from "shared/shopstory/baseConfig";
import { MissingEnvironmentVariableError } from "shared/utils/MissingEnvironmentVariableError";
import sanityConfig from "../sanity.config";

if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_SANITY_API_TOKEN");
}

export const shopstoryConfig: Config = {
  ...shopstoryBaseConfig,
  plugins: [
    sanityPlugin({
      dataset: sanityConfig.dataset,
      projectId: sanityConfig.projectId,
      useCdn: false,
      token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
    }),
  ],
};
