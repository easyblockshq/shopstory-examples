import { ComponentType, Fragment, ReactNode } from "react";
import { ShopifyProduct } from "../../types";
import ProductDetails from "../sections/ProductDetails/ProductDetails";

type ProductPageProviderOptions = {
  renderBeforeContent: ({ title }: { title: string }) => ReactNode;
};

type ProductPageProps = {
  product: ShopifyProduct;
};

function productPageProvider({
  renderBeforeContent,
}: ProductPageProviderOptions): ComponentType<ProductPageProps> {
  return function ProductPage({ product }) {
    if (!product) {
      return null;
    }

    return (
      <Fragment>
        {renderBeforeContent({ title: product.title })}
        <ProductDetails product={product} />
      </Fragment>
    );
  };
}

export { productPageProvider };
export type { ProductPageProps };
