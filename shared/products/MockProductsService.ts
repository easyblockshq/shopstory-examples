import products from "./products.json";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Product = any;

function mapProduct(product: Product) {
  return {
    id: product.id,
    title: product.title,
    image: product.images.edges?.[0].node?.originalSrc
  }
}

export const MockProductsService = {
  searchProducts: async (query: string): Promise<Product[]> => {
    await sleep(500);
    return products.filter((product) =>
      product.title.match(new RegExp(`${query}`, "i"))
    ).map(mapProduct);
  },
  getProductById: async (id: string): Promise<Product | undefined> => {
    await sleep(500);
    const product = products.find((product) => product.id === id);
    if (!product) {
      return;
    }
    return mapProduct(product);
  },
  fetchProducts: async (ids: string[]): Promise<Product[]> => {
    await sleep(500);
    return products.filter((product) => ids.includes(product.id));
  },
};
