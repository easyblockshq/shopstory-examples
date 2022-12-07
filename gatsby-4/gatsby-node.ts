import { ShopstoryClient } from "@shopstory/core/client";
import type { CreatePagesArgs, CreateWebpackConfigArgs } from "gatsby";
import path from "path";
import { shopstoryConfig } from "../shared/shopstory/config";

export async function createPages({
  actions: { createPage, createRedirect },
  graphql,
}: CreatePagesArgs) {
  const shopstoryBlocksQueryResult = await graphql<{
    shopstoryBlocks: Queries.ContentfulShopstoryBlockConnection;
  }>(`
    {
      shopstoryBlocks: allContentfulShopstoryBlock {
        edges {
          node {
            id
            config {
              internal {
                content
              }
            }
            contentful_id
          }
        }
      }
    }
  `);

  if (!shopstoryBlocksQueryResult.data) {
    return;
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: "en-US",
    contentful: {
      preview: true,
    },
  });

  for (const shopstoryBlock of shopstoryBlocksQueryResult.data.shopstoryBlocks
    .edges) {
    if (shopstoryBlock.node.config?.internal.content) {
      try {
        const content = shopstoryClient.add(
          JSON.parse(shopstoryBlock.node.config.internal.content)
        );
        const meta = await shopstoryClient.fetch();

        createPage({
          component: path.resolve(
            "./src/templates/ShopstoryBlockPageTemplate.tsx"
          ),
          path: `/shopstory-block/${shopstoryBlock.node.contentful_id}`,
          context: {
            content,
            meta,
          },
        });
      } catch {
        if (process.env.NODE_ENV === "production") {
          createRedirect({
            fromPath: `/shopstory-block/${shopstoryBlock.node.contentful_id}`,
            toPath: "/404",
          });
        }

        console.error(
          `Creating page for ShopstoryBlock entry with id ${shopstoryBlock.node.contentful_id} failed`
        );
      }
    }
  }
}

export function onCreateWebpackConfig({ actions }: CreateWebpackConfigArgs) {
  actions.setWebpackConfig({
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "../shared")],
    },
  });
}
