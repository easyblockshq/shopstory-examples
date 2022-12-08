import products from "./products.json";

const IMAGE_ROOT = "https://shopstory.s3.eu-central-1.amazonaws.com/shopstory-examples"

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Product = {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
};

function mapProduct(product: Product) {
  return {
    ...product,
    image: `${IMAGE_ROOT}${product.image}`
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
  getProductsByIds: async (ids: string[]): Promise<Product[]> => {
    await sleep(500);
    return products.filter((product) => ids.includes(product.id)).map(mapProduct);
  },
};
