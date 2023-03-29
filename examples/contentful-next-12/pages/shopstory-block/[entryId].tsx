import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { RenderableContent, Metadata } from "@shopstory/core";
import { createClient, Entry } from 'contentful'
import { ShopstoryClient } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";
import {shopstoryConfig} from "../../src/shopstory/config";
import {DemoShopstoryProvider} from "../../src/shopstory/provider";

type ShopstoryBlockPageProps = {
  renderableContent: RenderableContent,
  meta: Metadata
}

const ShopstoryBlockPage: NextPage<ShopstoryBlockPageProps> = (props) => {
  return <DemoShopstoryProvider>
    <ShopstoryMetadataProvider meta={props.meta}>
      <Shopstory content={props.renderableContent} />
    </ShopstoryMetadataProvider>
  </DemoShopstoryProvider>
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<ShopstoryBlockPageProps, { entryId: string }> = async (context) => {
  let { params, preview, locale = 'en-US' } = context

  if (!params) {
    return { notFound: true }
  }

  const contentfulClient = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE!,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? "master",
    accessToken: preview ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN! : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    host: preview ? 'preview.contentful.com' : undefined
  })

  const entry : Entry<any> = await contentfulClient.getEntry(params.entryId, {
    content_type: 'shopstoryBlock',
    locale,
  });

  const rawContent = entry.fields.content;
  const shopstoryClient = new ShopstoryClient(shopstoryConfig, { locale, contentful: { preview } });
  const renderableContent = shopstoryClient.add(rawContent);
  const meta = await shopstoryClient.build();

  return {
    props: { renderableContent, meta },
    revalidate: 10
  }
}

export default ShopstoryBlockPage
