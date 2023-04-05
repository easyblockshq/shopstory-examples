import type {
  Config,
  FetchResourcesInput,
  FetchResourcesOutput,
  ResourceInfo,
} from "@shopstory/core";
import { sanityPlugin } from "@shopstory/sanity";
import { createClient } from "next-sanity";
import { SanityDocument } from "sanity";
import { shopstoryBaseConfig } from "shared/shopstory/baseConfig";
import { MissingEnvironmentVariableError } from "shared/utils/MissingEnvironmentVariableError";
import sanityConfig from "../sanity/sanity.config";
import { mapBlockDocumentToSectionProps } from "../sanity/utils";

if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_SANITY_API_TOKEN");
}

export const shopstoryConfig: Config = {
  ...shopstoryBaseConfig,
  resourceTypes: {
    ...shopstoryBaseConfig.resourceTypes,
    "sanity.document": {
      fetch: async (resources) => {
        const resourcesGroupedByType = resources.reduce((grouped, resource) => {
          if (!resource.info) {
            return grouped;
          }

          const info = parseSanityDocumentResourceInfo(resource.info);

          if (!grouped[info.type]) {
            grouped[info.type] = [];
          }

          grouped[info.type].push(resource);

          return grouped;
        }, {} as Record<string, Array<FetchResourcesInput>>);

        const result: Array<FetchResourcesOutput> = [];

        const client = createClient({
          projectId: sanityConfig.projectId,
          dataset: sanityConfig.dataset,
          useCdn: false,
          token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
        });

        for (const [type, resources] of Object.entries(
          resourcesGroupedByType
        )) {
          const ids = resources.map((resource) => resource.id);

          let query = `*[_id in $ids && _type == $type]`;

          const baseProjection = `
            _id,
            _type,
          `;

          if (type === "block_banner") {
            query += `{
              ${baseProjection}
              buttonLabel,
              buttonLink,
              description,
              title,
              image { title, asset-> }
            }`;
          } else if (type === "block_twoColumns") {
            query += `{
              ${baseProjection}
              leftText,
              rightText,
              buttonLabel,
              buttonLink
            }`;
          } else if (type === "block_productsGrid") {
            query += `{
              ${baseProjection}
              title,
              collection,
              maxItems
            }`;
          } else {
            query = `{${baseProjection}}`;
          }

          const documents = await client.fetch<
            Array<SanityDocument & Record<string, any>>
          >(query, { ids, type });

          for (const resource of resources) {
            const resolvedDocument = documents.find(
              (document) => document._id === resource.id
            );

            if (!resolvedDocument) {
              continue;
            }

            const mappedDocument = await mapBlockDocumentToSectionProps(
              resolvedDocument
            );

            result.push({
              ...resource,
              value: mappedDocument,
            });
          }
        }

        return result;
      },
    },
  },
  plugins: [
    sanityPlugin({
      dataset: sanityConfig.dataset,
      projectId: sanityConfig.projectId,
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
            documentType: [
              "block_banner",
              "block_twoColumns",
              "block_productsGrid",
            ],
          },
        },
      ],
      type: "section",
    },
  ],
};

function parseSanityDocumentResourceInfo(info: ResourceInfo) {
  if ("type" in info && typeof info.type === "string") {
    return {
      type: info.type,
    };
  }

  throw new Error("Invalid resource info");
}
