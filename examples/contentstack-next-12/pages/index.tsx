import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { PageWrapper } from "shared/components/PageWrapper/PageWrapper";
import { createContentstackClient } from "../src/contentstackClient";
import { contentstackParams } from "../src/contentstackParams";
import { shopstoryConfig } from "../src/shopstory/config";
import { DemoShopstoryProvider } from "../src/shopstory/provider";
import { isQueryLivePreviewQuery } from "../src/utils/isQueryLivePreviewQuery";

type HomePageProps = {
  content: RenderableContent;
  meta: Metadata;
};

function HomePage(props: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>Demo store.</title>
      </Head>

      <PageWrapper>
        <DemoShopstoryProvider>
          <ShopstoryMetadataProvider meta={props.meta}>
            <Shopstory content={props.content} />
          </ShopstoryMetadataProvider>
        </DemoShopstoryProvider>
      </PageWrapper>
    </Fragment>
  );
}

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
