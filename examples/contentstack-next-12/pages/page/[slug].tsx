import { ShopstoryClient } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { PageWrapper } from "shared/components/PageWrapper/PageWrapper";
import { BannerSection } from "shared/components/sections/BannerSection/BannerSection";
import { ProductsGridSection } from "shared/components/sections/ProductsGridSection/ProductsGridSection";
import { TwoColumnsSection } from "shared/components/sections/TwoColumnsSection/TwoColumnsSection";
import fetchCollectionByHandle from "shared/data/shopify/fetchCollectionByHandle";
import { createContentstackClient } from "../../src/contentstackClient";
import { contentstackParams } from "../../src/contentstackParams";
import { shopstoryConfig } from "../../src/shopstory/config";
import { DemoShopstoryProvider } from "../../src/shopstory/provider";
import { isQueryLivePreviewQuery } from "../../src/utils/isQueryLivePreviewQuery";

type PageProps = {
  blocks: any[];
};

function Page(props: PageProps) {
  return (
    <Fragment>
      <Head>
        <title>Demo store.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageWrapper>
        {props.blocks.map((block: any, index) => {
          if (block.type === "blockBanner") {
            return <BannerSection key={index} {...block.data} />;
          } else if (block.type === "blockProductsGrid") {
            return <ProductsGridSection key={index} {...block.data} />;
          } else if (block.type === "blockTwoColumns") {
            return <TwoColumnsSection key={index} {...block.data} />;
          } else if (block.type === "shopstoryBlock") {
            return (
              <DemoShopstoryProvider key={index}>
                <ShopstoryMetadataProvider meta={block.meta}>
                  <Shopstory content={block.content} />
                </ShopstoryMetadataProvider>
              </DemoShopstoryProvider>
            );
          } else {
            throw new Error(`unknown block type: ${block.type}`);
          }
        })}
      </PageWrapper>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  { slug: string }
> = async (context) => {
  const { params, query } = context;

  if (!params) {
    return { notFound: true };
  }

  const contentstackClient = createContentstackClient({
    ...contentstackParams,
    livePreviewQuery: isQueryLivePreviewQuery(query) ? query : undefined,
  });

  const entry = await contentstackClient.fetchPageEntryBySlug(params.slug);

  if (!entry) {
    return { notFound: true };
  }

  const blocks: any[] = await Promise.all(
    entry.blocks.map(async (block: any) => {
      const type = block._content_type_uid;

      if (type === "block_banner") {
        const image = block.image;

        return {
          type: "blockBanner",
          data: {
            title: block.title,
            description: block.description,
            image: {
              src: image.url,
              title: image.title,
              width: image.dimension?.width ?? null,
              height: image.dimension?.height ?? null,
            },
            button: block.button_label
              ? {
                  label: block.button_label,
                  url: block.button_link,
                }
              : null,
          },
        };
      } else if (type === "block_products_grid") {
        const collection = await fetchCollectionByHandle(block.collection);

        return {
          type: "blockProductsGrid",
          data: {
            title: block.title,
            products: collection?.products.slice(0, block.maxItems ?? 12),
          },
        };
      } else if (type === "block_two_columns") {
        return {
          type: "blockTwoColumns",
          data: {
            leftText: block.left_text,
            rightText: block.right_text,
            button: block.button_label
              ? {
                  label: block.button_label,
                  url: block.button_link,
                }
              : null,
          },
        };
      } else if (type === "shopstory_block") {
        const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
          locale: "main",
        });

        const content = shopstoryClient.add(block.content);
        const meta = await shopstoryClient.build();

        return {
          type: "shopstoryBlock",
          content,
          meta,
        };
      } else {
        return {
          type,
        };
      }
    })
  );

  return {
    props: {
      blocks,
    },
  };
};

export default Page;
