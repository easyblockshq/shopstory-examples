import { ShopstoryClient } from "@shopstory/core";
import { createClient } from "contentful";
import type { CreatePagesArgs } from "gatsby";
import path from "path";
import { shopstoryConfig } from "./src/shopstory/config";

export async function createPages({
  actions: { createPage, createRedirect },
  graphql,
}: CreatePagesArgs) {
  const contentfulClient = createClient({
    space: process.env.GATSBY_PUBLIC_CONTENTFUL_SPACE!,
    environment: process.env.GATSBY_PUBLIC_CONTENTFUL_ENVIRONMENT ?? "master",
    accessToken:
      process.env.GATSBY_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN ??
      process.env.GATSBY_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    host: "preview.contentful.com",
  });

  const locales = await contentfulClient.getLocales();

  for (const locale of locales.items) {
    const shopstoryContentQueryResult = await graphql<{
      shopstoryContent: Queries.ContentfulShopstoryBlockConnection;
    }>(`
      {
        shopstoryContent: allContentfulShopstoryBlock(filter: {node_locale: {eq: "${locale.code}"}}) {
          edges {
            node {
              id
              content {
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

    if (!shopstoryContentQueryResult.data) {
      return;
    }

    const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
      locale: locale.code,
      contentful: {
        preview: true,
      },
    });

    for (const shopstoryContentEdge of shopstoryContentQueryResult.data
      .shopstoryContent.edges) {
      const shopstoryContent =
        shopstoryContentEdge.node.content?.internal.content;

      if (shopstoryContent) {
        try {
          const content = shopstoryClient.add(JSON.parse(shopstoryContent));
          const meta = await shopstoryClient.build();

          const pagePath = `/shopstory-block/${shopstoryContentEdge.node.contentful_id}`;

          createPage({
            component: path.resolve(
              "./src/templates/ShopstoryBlockPageTemplate.tsx"
            ),
            path: prefixWithLocaleCode(locale.code, pagePath),
            context: {
              content,
              meta,
            },
          });

          if (locale.default) {
            createPage({
              component: path.resolve(
                "./src/templates/ShopstoryBlockPageTemplate.tsx"
              ),
              path: pagePath,
              context: {
                content,
                meta,
              },
            });
          }
        } catch (error) {
          console.log(error);

          if (process.env.NODE_ENV === "production") {
            createRedirect({
              fromPath: `/shopstory-block/${shopstoryContentEdge.node.contentful_id}`,
              toPath: "/404",
            });
          }

          console.error(
            `Creating page for ShopstoryBlock entry with id ${shopstoryContentEdge.node.contentful_id} failed`
          );
        }
      }
    }
  }
}

function prefixWithLocaleCode(localeCode: string, path: string) {
  return `/${localeCode.toLowerCase()}${path}`;
}
