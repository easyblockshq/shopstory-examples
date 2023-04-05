import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "next-sanity";
import Head from "next/head";
import sanityConfig from "../../sanity/sanity.config";
import { shopstoryConfig } from "../../shopstory/config";
import { DemoShopstoryProvider } from "../../shopstory/provider";
import { previewFilter } from "../../sanity/utils";

type PageShopstoryProps = {
  title: string;
  renderableContent: RenderableContent;
  meta: Metadata;
};

export default function PageShopstory({
  title,
  renderableContent,
  meta,
}: PageShopstoryProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <DemoShopstoryProvider>
        <ShopstoryMetadataProvider meta={meta}>
          <Shopstory content={renderableContent} />
        </ShopstoryMetadataProvider>
      </DemoShopstoryProvider>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

type PageShopstoryProjection = {
  title: string;
  content: string;
};

export const getStaticProps: GetStaticProps<
  PageShopstoryProps,
  { slug: string }
> = async (context) => {
  const { params, preview, locale = "en" } = context;

  if (!params?.slug) {
    return { notFound: true };
  }

  const sanityClient = createClient({
    apiVersion: "2023-03-30",
    dataset: sanityConfig.dataset,
    projectId: sanityConfig.projectId,
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  });

  const document = await sanityClient.fetch<PageShopstoryProjection>(
    `*[_type == "pageShopstory" && slug.current == "${params.slug}"
    ${previewFilter(
      preview
    )}] | order(_updatedAt desc) [0] {title, "content": content.${locale}} `,
    { slug: params.slug, locale }
  );

  if (!document) {
    return { notFound: true };
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale,
    sanity: { preview },
  });
  const renderableContent = shopstoryClient.add(document.content);
  const meta = await shopstoryClient.build();

  return {
    props: { title: document.title, renderableContent, meta },
    revalidate: 10,
  };
};
