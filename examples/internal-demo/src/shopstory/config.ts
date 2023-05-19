import type { Config } from "@shopstory/core";
import { noCMSPlugin } from "@shopstory/nocms";
import { shopstoryBaseConfig } from "shared/shopstory/baseConfig";

export const shopstoryConfig: Config = {
  ...shopstoryBaseConfig,
  projectId: "demo",
  plugins: [noCMSPlugin],
  resourceTypes: {
    ...shopstoryBaseConfig.resourceTypes,
  },
  components: [...(shopstoryBaseConfig.components ?? [])],
};
