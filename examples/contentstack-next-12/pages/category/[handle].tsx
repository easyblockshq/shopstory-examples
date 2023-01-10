import { ShopstoryClient } from "@shopstory/core/client";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  categoryPageProvider,
  type CategoryPageProps,
} from "shared/components/pages/CategoryPage";
import fetchCollectionByHandle from "shared/data/shopify/fetchCollectionByHandle";
import { filterCollection } from "shared/data/shopify/filterCollection";
import { decomposeHandle } from "shared/utils/collectionsHandle";
import { contentstackClient } from "../../src/contentstackClient";
import { shopstoryConfig } from "../../src/shopstory/config";
import { DemoShopstoryProvider } from "../../src/shopstory/provider";

const CategoryPage: NextPage<CategoryPageProps> = categoryPageProvider({
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

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
  preview,
}) => {
  if (!params?.handle)
    throw new Error("Catch all accessed without given [handle]");

  if (typeof params.handle !== "string")
    throw new Error("Catch all accessed with wrong type of [handle]");

  const { handle, values } = decomposeHandle(params.handle);

  if (!handle) {
    return {
      notFound: true,
    };
  }

  const collectionEntry =
    await contentstackClient.fetchCollectionPageEntryBySlug(handle);
  const shopifyCollectionHandle = collectionEntry?.collection_id ?? handle;

  const fullCollection = await fetchCollectionByHandle(shopifyCollectionHandle);
  if (!fullCollection) {
    return {
      notFound: true,
    };
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: "main",
    contentstack: {
      preview: true,
    },
  });

  const renderableContent = shopstoryClient.add(collectionEntry?.content, {
    mode: "grid",
  });

  const meta = await shopstoryClient.build();

  const { filters, collection, pagination, numberOfItems } = filterCollection(
    fullCollection,
    values
  );

  return {
    props: {
      fullCollection,
      collection,
      filters,
      pagination,
      numberOfItems,
      renderableContent,
      meta,
    },
    revalidate: 60,
  };
};

export default CategoryPage;
