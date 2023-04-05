import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import {
  Shopstory,
  ShopstoryMetadataProvider,
  ShopstoryProvider,
} from "@shopstory/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "next-sanity";
import Head from "next/head";
import { ComponentPropsWithoutRef, Fragment } from "react";
import { BannerSection } from "shared/components/sections/BannerSection/BannerSection";
import { ProductsGridSection } from "shared/components/sections/ProductsGridSection/ProductsGridSection";
import { TwoColumnsSection } from "shared/components/sections/TwoColumnsSection/TwoColumnsSection";
import fetchCollectionByHandle from "shared/data/shopify/fetchCollectionByHandle";
import sanityConfig from "../../sanity/sanity.config";
import { shopstoryConfig } from "../../shopstory/config";
import { previewFilter } from "../../sanity/utils";

type PageBlocksProps = {
  title: string;
  blocks: Array<
    | {
        type: "shopstoryBlock";
        renderableContent: RenderableContent;
        meta: Metadata;
      }
    | ({
        type: "block_banner";
      } & ComponentPropsWithoutRef<typeof BannerSection>)
    | ({
        type: "block_productsGrid";
      } & ComponentPropsWithoutRef<typeof ProductsGridSection>)
    | ({
        type: "block_twoColumns";
      } & ComponentPropsWithoutRef<typeof TwoColumnsSection>)
  >;
};

export default function PageShopstory({ title, blocks }: PageBlocksProps) {
  return (
    <Fragment>
      <Head>{title}</Head>
      {blocks.map((block, index) => {
        if (block.type === "shopstoryBlock") {
          return (
            <ShopstoryProvider key={index}>
              <ShopstoryMetadataProvider meta={block.meta}>
                <Shopstory content={block.renderableContent} />
              </ShopstoryMetadataProvider>
            </ShopstoryProvider>
          );
        }

        if (block.type === "block_banner") {
          return <BannerSection key={index} {...block} />;
        }

        if (block.type === "block_productsGrid") {
          return <ProductsGridSection key={index} {...block} />;
        }

        if (block.type === "block_twoColumns") {
          return <TwoColumnsSection key={index} {...block} />;
        }

        // @ts-ignore
        throw new Error(`Unknown block type: ${block.type}`);
      })}
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  PageBlocksProps,
  { slug: string }
> = async (context) => {
  let { params, preview, locale = "en" } = context;

  if (!params) {
    return { notFound: true };
  }

  const sanityClient = createClient({
    apiVersion: "2023-03-30",
    dataset: sanityConfig.dataset,
    projectId: sanityConfig.projectId,
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  });

  const document = await sanityClient.fetch<{
    title: string;
    blocks: Array<Record<string, any>>;
  }>(
    `*[_type == 'page' && slug.current == '${params.slug}'
    ${previewFilter(preview)}] | order(_updatedAt desc) [0] {
        title, 
        blocks[]->{
          _type,
          _type == 'shopstoryBlock' => {
            "content": content.${locale}
          },
          _type == 'block_banner' => {
            buttonLabel,
            buttonLink,
            description,
            title,
            image{title,asset->}
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
    return { notFound: true };
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale,
    sanity: { preview },
  });

  const blocks = document.blocks.map<
    Promise<PageBlocksProps["blocks"][number]>
  >((block) => {
    return new Promise(async (resolve, reject) => {
      if (block._type === "shopstoryBlock") {
        const renderableContent = shopstoryClient.add(block.content);
        const meta = await shopstoryClient.build();

        return resolve({
          type: "shopstoryBlock",
          renderableContent,
          meta,
        });
      }

      if (block._type === "block_banner") {
        return resolve({
          type: "block_banner",
          description: block.description,
          title: block.title,
          ...(block.buttonLabel && {
            button: { label: block.buttonLabel, url: block.buttonLink },
          }),
          ...(block.image && {
            image: {
              src: block.image.asset.url,
              title: block.image.asset.altText ?? block.image.asset.title,
            },
          }),
        });
      }

      if (block._type === "block_productsGrid") {
        const collection = await fetchCollectionByHandle(block.collection);

        return resolve({
          type: "block_productsGrid",
          title: block.title,
          products: collection?.products.slice(0, block.maxItems ?? 12),
        });
      }

      if (block._type === "block_twoColumns") {
        return resolve({
          type: "block_twoColumns",
          leftText: block.leftText,
          rightText: block.rightText,
          ...(block.buttonLabel && {
            button: {
              label: block.buttonLabel,
              url: block.buttonLink,
            },
          }),
        });
      }

      reject(new Error(`Unknown block type: ${block._type}`));
    });
  });

  const mappedBlocks = await Promise.all(blocks);

  return {
    props: { title: document.title, blocks: mappedBlocks },
    revalidate: 10,
  };
};
