import { mapProduct } from "../../utils/mapProduct";
import { fetchProducts } from "./fetchProducts";
import fetchShopify from "./fetchShopify";
import { fetchProductByHandleQuery } from "./graphql/fetchProductQuery";

const fetchProductByHandle = async (handle: string) => {
  const data: any = await fetchShopify(fetchProductByHandleQuery, { handle });

  if (!data)
    throw new Error(
      "(fetchProductByHandle) Handle doesn't exist in Shopify: " + handle
    );

  if (!data.productByHandle) {
    return null;
  }

  const product = mapProduct(data.productByHandle);
  const relatedTag = product.tags.find((tag: any) => tag.startsWith("related"));
  const relatedProducts = await fetchProducts("tag:" + relatedTag);

  return { ...product, relatedProducts };
};

export default fetchProductByHandle;
