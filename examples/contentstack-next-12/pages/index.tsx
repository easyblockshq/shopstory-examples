import { ShopstoryClient } from "@shopstory/core/client";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import {
  homePageProvider,
  type HomePageProps,
} from "shared/components/pages/HomePage";
import { contentstackClient } from "../src/contentstackClient";
import { shopstoryConfig } from "../src/shopstory/config";
import { DemoShopstoryProvider } from "../src/shopstory/provider";
import { Stack } from "../src/stack";
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
  if (isQueryLivePreviewQuery(context.query)) {
    Stack.livePreviewQuery(context.query);
  }

  try {
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
