import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ProductDetails from "shared/components/sections/ProductDetails/ProductDetails";
import fetchAllProductHandles from "shared/data/shopify/fetchAllProductHandles";
import fetchProductByHandle from "shared/data/shopify/fetchProductByHandle";
import type { Path, ShopifyProduct } from "shared/types";

type ProductPageProps = {
  product: ShopifyProduct;
};

function ProductPage(props: ProductPageProps) {
  if (!props.product) {
    return null;
  }

  return (
    <Fragment>
      <Head>
        <title>{props.product.title}</title>
      </Head>
      <ProductDetails product={props.product} />
    </Fragment>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: Path[] = [];

  if (process.env.IS_VERCEL_PREVIEW !== "true") {
    const handles = await fetchAllProductHandles();
    paths = handles.map((h) => ({ params: h }));
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  params,
}) => {
  if (!params?.handle)
    throw new Error("Catch all accessed without given [handle]");

  if (typeof params.handle !== "string")
    throw new Error("Catch all accessed with wrong type of [handle]");

  const responses = await Promise.all([fetchProductByHandle(params.handle)]);
  const product = responses[0];

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};

export default ProductPage;
