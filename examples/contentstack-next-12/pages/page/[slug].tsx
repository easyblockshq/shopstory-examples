import { ShopstoryClient } from "@shopstory/core/client";
import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import {
  landingPageProvider,
  type PageProps,
} from "shared/components/pages/Page";
import fetchCollectionByHandle from "shared/data/shopify/fetchCollectionByHandle";
import { contentstackClient } from "../../src/contentstackClient";
import { shopstoryConfig } from "../../src/shopstory/config";
import { DemoShopstoryProvider } from "../../src/shopstory/provider";

const LandingPage: NextPage<PageProps> = landingPageProvider({
  beforeContent: (
    <Head>
      <title>Demo store.</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  ),
  ShopstoryProvider: DemoShopstoryProvider,
});

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { slug: string }
> = async (context) => {
  let { params } = context;

  if (!params) {
    return { notFound: true };
  }

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
          contentstack: {
            preview: true,
          },
        });

        const content = shopstoryClient.add(block.content);
        const meta = await shopstoryClient.build();

        return {
          type,
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
    revalidate: 10,
  };
};

export default LandingPage;
