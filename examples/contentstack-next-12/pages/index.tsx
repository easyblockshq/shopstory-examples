import { ShopstoryClient } from "@shopstory/core/client";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import {
  homePageProvider,
  type HomePageProps,
} from "shared/components/pages/HomePage";
import { createContentstackClient } from "../src/contentstackClient";
import { contentstackParams } from "../src/contentstackParams";
import { shopstoryConfig } from "../src/shopstory/config";
import { DemoShopstoryProvider } from "../src/shopstory/provider";
import { isQueryLivePreviewQuery } from "../src/utils/isQueryLivePreviewQuery";

const HomePage = homePageProvider({
  beforeContent: (
    <Head>
      <title>Demo store.</title>
    </Head>
  ),
  ShopstoryProvider: DemoShopstoryProvider,
});

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  try {
    const contentstackClient = createContentstackClient({
      ...contentstackParams,
      livePreviewQuery: isQueryLivePreviewQuery(context.query)
        ? context.query
        : undefined,
    });

    const homePageEntry = await contentstackClient.fetchHomePageEntry();

    const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
      locale: "main",
      contentstack: {
        preview: true,
      },
    });

    const content = shopstoryClient.add(homePageEntry.content);
    const meta = await shopstoryClient.build();

    return {
      props: {
        content,
        meta,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
