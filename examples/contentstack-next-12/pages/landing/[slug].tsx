import { ShopstoryClient } from "@shopstory/core/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  landingPageProvider,
  type LandingPageProps,
} from "shared/components/pages/LandingPage";
import { createContentstackClient } from "../../src/contentstackClient";
import { contentstackParams } from "../../src/contentstackParams";
import { shopstoryConfig } from "../../src/shopstory/config";
import { DemoShopstoryProvider } from "../../src/shopstory/provider";

const LandingPage = landingPageProvider({
  renderBeforeContent: ({ title }) => (
    <Head>
      <title>{title}</title>
    </Head>
  ),
  ShopstoryProvider: DemoShopstoryProvider,
});

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  LandingPageProps,
  { slug: string }
> = async (context) => {
  let { params } = context;

  if (!params) {
    return { notFound: true };
  }

  const contentstackClient = createContentstackClient(contentstackParams);
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
    revalidate: 10,
  };
};

export default LandingPage;
