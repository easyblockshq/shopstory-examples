import { Metadata, RenderableContent, ShopstoryClient } from "@shopstory/core";
import { ShopstoryGrid, ShopstoryMetadataProvider } from "@shopstory/react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ProductListing from "shared/components/sections/ProductListing/ProductListing";
import fetchCollectionByHandle from "shared/data/shopify/fetchCollectionByHandle";
import { filterCollection } from "shared/data/shopify/filterCollection";
import { PLPProps } from "shared/types";
import { decomposeHandle } from "shared/utils/collectionsHandle";
import { createContentstackClient } from "../../src/contentstackClient";
import { contentstackParams } from "../../src/contentstackParams";
import { shopstoryConfig } from "../../src/shopstory/config";
import { DemoShopstoryProvider } from "../../src/shopstory/provider";
import { isQueryLivePreviewQuery } from "../../src/utils/isQueryLivePreviewQuery";
import { ProductCard } from "shared/components/ProductCard/ProductCard";

type CategoryPageProps = Omit<PLPProps, "gridContent"> & {
  renderableContent: RenderableContent;
  meta: Metadata;
};

function CategoryPage({
  meta,
  renderableContent,
  ...props
}: CategoryPageProps) {
  const productCards = props.collection
    ? props.collection.products.map((product, i) => (
        <ProductCard
          product={product}
          relatedProductsMode={"onHover"}
          withBackdrop={true}
          key={i}
        />
      ))
    : [];

  return (
    <Fragment>
      <Head>
        <title>{props.collection.title}</title>
      </Head>
      <ProductListing
        key={props.collection.handle}
        gridContent={
          <DemoShopstoryProvider>
            <ShopstoryMetadataProvider meta={meta}>
              <ShopstoryGrid cards={productCards} content={renderableContent} />
            </ShopstoryMetadataProvider>
          </DemoShopstoryProvider>
        }
        {...props}
      />
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<
  CategoryPageProps
> = async ({ params, query }) => {
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

  const contentstackClient = createContentstackClient({
    ...contentstackParams,
    livePreviewQuery: isQueryLivePreviewQuery(query) ? query : undefined,
  });

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
  };
};

export default CategoryPage;
