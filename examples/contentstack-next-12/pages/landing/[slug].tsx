import { ShopstoryClient } from "@shopstory/core/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  landingPageProvider,
  type LandingPageProps,
} from "shared/components/pages/LandingPage";
import { contentstackClient } from "../../src/contentstackClient";
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
  let { params, preview } = context;

  if (!params) {
    return { notFound: true };
  }

  const entry = await contentstackClient.fetchLandingPageEntryBySlug(
    params.slug
  );

  if (!entry) {
    return { notFound: true };
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: "main",
    contentstack: {
      preview: true,
    },
  });

  const content = shopstoryClient.add(entry.content);
  const meta = await shopstoryClient.build();

  return {
    props: { title: entry.title, content, meta },
    revalidate: 10,
  };
};

export default LandingPage;
