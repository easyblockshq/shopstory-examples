import { ShopstoryClient } from "@shopstory/core/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  landingPageProvider,
  type LandingPageProps,
} from "shared/components/pages/LandingPage";
import { createContentstackClient } from "../../src/contentstackClient";
import { contentstackParams } from "../../src/contentstackParams";
import { shopstoryConfig } from "../../src/shopstory/config";
import { DemoShopstoryProvider } from "../../src/shopstory/provider";
import { isQueryLivePreviewQuery } from "../../src/utils/isQueryLivePreviewQuery";

const LandingPage = landingPageProvider({
  renderBeforeContent: ({ title }) => (
    <Head>
      <title>{title}</title>
    </Head>
  ),
  ShopstoryProvider: DemoShopstoryProvider,
});

export const getServerSideProps: GetServerSideProps<
  LandingPageProps,
  { slug: string }
> = async (context) => {
  let { params, query } = context;

  if (!params) {
    return { notFound: true };
  }

  const contentstackClient = createContentstackClient({
    ...contentstackParams,
    livePreviewQuery: isQueryLivePreviewQuery(query) ? query : undefined,
  });

  const entry = await contentstackClient.fetchLandingPageEntryBySlug(
    params.slug
  );

  if (!entry) {
    return { notFound: true };
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: "main",
  });

  const content = shopstoryClient.add(entry.content);
  const meta = await shopstoryClient.build();

  return {
    props: { title: entry.title, content, meta },
  };
};

export default LandingPage;
