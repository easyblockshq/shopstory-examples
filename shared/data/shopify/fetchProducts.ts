import { mapProduct } from "../../utils/mapProduct";
import { removeEdges } from "../../utils/removeEdges";
import fetchShopify from "./fetchShopify";
import { fetchProductsQuery } from "./graphql/fetchProductsQuery";

const fetchProducts = async (query: string) => {
  const data = await fetchShopify(fetchProductsQuery, {
    query,
    sortKey: "CREATED_AT",
    sortIndex: 0,
    reverse: false,
    first: 250,
  });

  const products = removeEdges(data.products).map(mapProduct);

  return products;
};

export { fetchProducts };
