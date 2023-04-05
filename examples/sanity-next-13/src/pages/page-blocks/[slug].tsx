import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "next-sanity";
import Head from "next/head";
import { ComponentPropsWithoutRef, Fragment } from "react";
import { BannerSection } from "shared/components/sections/BannerSection/BannerSection";
import { ProductsGridSection } from "shared/components/sections/ProductsGridSection/ProductsGridSection";
import { TwoColumnsSection } from "shared/components/sections/TwoColumnsSection/TwoColumnsSection";
import sanityConfig from "../../sanity/sanity.config";
import {
  mapBlockDocumentToSectionProps,
  previewFilter,
} from "../../sanity/utils";
import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import { shopstoryConfig } from "../../shopstory/config";
import { DemoShopstoryProvider } from "../../shopstory/provider";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";

type PageBlocksProps = {
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

export default function PageShopstory({ title, blocks }: PageBlocksProps) {
  return (
    <Fragment>
      <Head>{title}</Head>
      {blocks.map((block, index) => {
        const { type, props } = block;

        if (type === "shopstoryBlock") {
          return (
            <DemoShopstoryProvider key={index}>
              <ShopstoryMetadataProvider meta={props.meta}>
                <Shopstory content={props.renderableContent} />
              </ShopstoryMetadataProvider>
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
    `*[_type == 'pageBlocks' && slug.current == '${params.slug}'
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
    return { notFound: true };
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale,
    sanity: { preview },
  });

  const blocks = document.blocks
    .filter(Boolean)
    .map<Promise<PageBlocksProps["blocks"][number]>>((block) => {
      return new Promise(async (resolve) => {
        if (block._type === "shopstoryBlock") {
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

  const mappedBlocks = await Promise.all(blocks);

  return {
    props: { title: document.title, blocks: mappedBlocks },
    revalidate: 10,
  };
};
