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
  components: [
    ...(shopstoryBaseConfig.components ?? []),
    {
      id: "SanitySection",
      schema: [
        {
          prop: "section",
          type: "resource",
          label: "Sanity Section",
          resourceType: "sanity.document",
          params: {
            documentType: ["block_banner", "block_twoColumns"],
          },
          transform: (data) => {
            const type = data._type;

            if (type === "block_banner") {
              return {
                type,
                props: {
                  title: data.title,
                  description: data.description,
                  button: {
                    label: data.buttonLabel,
                    url: data.buttonLink
                  }
                }
              };
            }
            else if (type === "block_twoColumns") {
              return {
                type,
                props: {
                  leftText: data.leftText,
                  rightText: data.rightText,
                  button: data.buttonLabel
                    ? {
                      label: data.buttonLabel,
                      url: data.buttonLink,
                    }
                    : null,
                }
              };
            }

            throw new Error("wrong document type selected");
          }
        },
      ],
      type: "section",
    },
  ],
};
