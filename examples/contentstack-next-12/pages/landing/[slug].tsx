import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { PageWrapper } from "shared/components/PageWrapper/PageWrapper";
import { createContentstackClient } from "../../src/contentstackClient";
import { contentstackParams } from "../../src/contentstackParams";
import { shopstoryConfig } from "../../src/shopstory/config";
import { DemoShopstoryProvider } from "../../src/shopstory/provider";
import { isQueryLivePreviewQuery } from "../../src/utils/isQueryLivePreviewQuery";

type LandingPageProps = {
  title: string;
  content: RenderableContent;
  meta: Metadata;
};

function LandingPage(props: LandingPageProps) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
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
