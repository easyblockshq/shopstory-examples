import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  productPageProvider,
  type ProductPageProps,
} from "shared/components/pages/ProductPage";
import fetchAllProductHandles from "shared/data/shopify/fetchAllProductHandles";
import fetchProductByHandle from "shared/data/shopify/fetchProductByHandle";
import type { Path } from "shared/types";

const ProductPage = productPageProvider({
  renderBeforeContent: ({ title }) => (
    <Head>
      <title>{title}</title>
    </Head>
  ),
});

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
