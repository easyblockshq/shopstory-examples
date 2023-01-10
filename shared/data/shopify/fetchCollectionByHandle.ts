import { mapCollection } from "../../utils/mapCollection";
import { fetchProducts } from "./fetchProducts";
import fetchShopify from "./fetchShopify";
import { fetchCollectionByHandleQuery } from "./graphql/fetchCollectionByHandleQuery";

const fetchCollectionByHandle = async (handle: string) => {
  let data;
  let collection;
  let collectionProducts: any = [];
  let lastProductCursor = null;
  let hasNextPage = false;

  do {
    data = await fetchShopify(fetchCollectionByHandleQuery, {
      handle: handle,
      cursor: lastProductCursor,
    });

    if (!data.collectionByHandle) return null;

    hasNextPage = data.collectionByHandle.products.pageInfo.hasNextPage;
    if (hasNextPage) {
      lastProductCursor =
        data.collectionByHandle.products.edges[
          data.collectionByHandle.products.edges.length - 1
        ].cursor;
    }
    collectionProducts = [
      ...collectionProducts,
      ...data.collectionByHandle.products.edges,
    ];

    if (!collection) {
      collection = data.collectionByHandle;
    }
  } while (hasNextPage);

  if (!collection) {
    return null;
  }

  collection.products.edges = collectionProducts;
  collection = mapCollection(collection);

  const productsWithRelated = await Promise.all(
    collection.products.map(async (product: any) => {
      let relatedProducts;

      if (product.tags) {
        const relatedTag = product.tags.find((tag: string) =>
          tag.startsWith("related")
        );
        relatedProducts = await fetchProducts("tag:" + relatedTag);
      }

      return {
        ...product,
        relatedProducts,
      };
    })
  );

  collection.products = productsWithRelated;

  return collection;
};

export default fetchCollectionByHandle;
