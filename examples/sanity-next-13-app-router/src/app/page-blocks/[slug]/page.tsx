import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
// @ts-expect-error
import { cache, ComponentPropsWithoutRef } from "react";
import { PageWrapper } from "shared/components/PageWrapper/PageWrapper";
import { BannerSection } from "shared/components/sections/BannerSection/BannerSection";
import { ProductsGridSection } from "shared/components/sections/ProductsGridSection/ProductsGridSection";
import { TwoColumnsSection } from "shared/components/sections/TwoColumnsSection/TwoColumnsSection";
import { ShopstoryContent } from "../../../shopstory/ShopstoryContent";

import { sanityClient } from "../../../sanity/sanityClient";
import {
  mapBlockDocumentToSectionProps,
  previewFilter,
} from "../../../sanity/utils";
import { shopstoryConfig } from "../../../shopstory/config";
import { DemoShopstoryProvider } from "../../../shopstory/provider";

type MappedPageBlocks = {
  title: string;
  blocks: Array<
    | {
        type: "shopstoryBlock";
        props: {
          renderableContent: RenderableContent;
          meta: Metadata;
        };
      }
    | {
        type: "block_banner";
        props: ComponentPropsWithoutRef<typeof BannerSection>;
      }
    | {
        type: "block_productsGrid";
        props: ComponentPropsWithoutRef<typeof ProductsGridSection>;
      }
    | {
        type: "block_twoColumns";
        props: ComponentPropsWithoutRef<typeof TwoColumnsSection>;
      }
  >;
};

export default async function PageBlocks({
  params,
}: {
  params: Record<string, string>;
}) {
  const { isEnabled } = draftMode();

  const document = await sanityClient.fetch<{
    title: string;
    blocks: Array<Record<string, any>>;
  }>(
    `*[_type == 'pageBlocks' && slug.current == '${params.slug}'
      ${previewFilter(isEnabled)}] | order(_updatedAt desc) [0] {
          title, 
          blocks[] {
            _type,
            _type == 'shopstoryBlock' => {
              "content": content.${"en"}
            },
            _type == 'block_banner' => {
              buttonLabel,
              buttonLink,
              description,
              title,
              image { title, asset-> }
            },
            _type == 'block_productsGrid' => {
              title,
              collection,
              maxItems
            },
            _type == 'block_twoColumns' => {
              leftText,
              rightText,
              buttonLabel,
              buttonLink
            }
          }
      }`
  );

  if (!document) {
    notFound();
  }

  const mappedBlocks = document.blocks
    .filter(Boolean)
    .map<Promise<MappedPageBlocks["blocks"][number]>>((block) => {
      return new Promise(async (resolve) => {
        if (block._type === "shopstoryBlock") {
          const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
            locale: "en",
            sanity: { preview: isEnabled },
          });

          const renderableContent = shopstoryClient.add(block.content);
          const meta = await shopstoryClient.build();

          return resolve({
            type: "shopstoryBlock",
            props: {
              renderableContent,
              meta,
            },
          });
        }

        const mappedDocumentBlock = await mapBlockDocumentToSectionProps(block);
        return resolve(mappedDocumentBlock);
      });
    });

  const blocks = await Promise.all(mappedBlocks);

  return (
    <PageWrapper>
      {blocks.map((block, index) => {
        const { type, props } = block;

        if (type === "shopstoryBlock") {
          return (
            <DemoShopstoryProvider key={index}>
              <ShopstoryContent
                content={props.renderableContent}
                meta={props.meta}
              />
            </DemoShopstoryProvider>
          );
        }

        if (type === "block_banner") {
          return <BannerSection key={index} {...props} />;
        }

        if (type === "block_productsGrid") {
          return <ProductsGridSection key={index} {...props} />;
        }

        if (type === "block_twoColumns") {
          return <TwoColumnsSection key={index} {...props} />;
        }

        // @ts-ignore
        throw new Error(`Unknown block type: ${block.type}`);
      })}
    </PageWrapper>
  );
}
