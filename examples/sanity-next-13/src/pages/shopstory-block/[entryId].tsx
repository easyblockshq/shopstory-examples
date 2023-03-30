import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { createClient } from "next-sanity";
import sanityConfig from "../../sanity.config";
import { shopstoryConfig } from "../../shopstory/config";
import { DemoShopstoryProvider } from "../../shopstory/provider";

type ShopstoryBlockPageProps = {
  renderableContent: RenderableContent;
  meta: Metadata;
};

const ShopstoryBlockPage: NextPage<ShopstoryBlockPageProps> = (props) => {
  return (
    <DemoShopstoryProvider>
      <ShopstoryMetadataProvider meta={props.meta}>
        <Shopstory content={props.renderableContent} />
      </ShopstoryMetadataProvider>
    </DemoShopstoryProvider>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  ShopstoryBlockPageProps,
  { entryId: string }
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

  const documents = await sanityClient.fetch(
    `*[_id == "${params.entryId}"]{"shopstory": shopstory.${locale}}`
  );

  const rawContent = documents[0].shopstory;
  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale,
    sanity: { preview },
  });
  const renderableContent = shopstoryClient.add(rawContent);
  const meta = await shopstoryClient.build();

  return {
    props: { renderableContent, meta },
    revalidate: 10,
  };
};

export default ShopstoryBlockPage;
