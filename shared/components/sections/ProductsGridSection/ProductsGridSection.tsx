import styles from "./ProductsGridSection.module.css";
import { ShopifyProduct } from "../../../types";
import { ProductCard } from "../../ProductCard/ProductCard";

export type ProductsGridSectionProps = {
  title: string;
  products?: ShopifyProduct[];
  disableInternalMargins?: boolean;
};

export const ProductsGridSection: React.FC<ProductsGridSectionProps> = (
  props
) => {
  const products = (props.products ?? []).slice(0, 12);

  const wrapperClassNames = [styles.wrapper];

  if (props.disableInternalMargins) {
    wrapperClassNames.push(styles.disableInternalMargins);
  }

  return (
    <div className={wrapperClassNames.join(" ")}>
      <div className={styles.title}>{props.title}</div>
      <br />
      <div className={styles.container}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            relatedProductsMode={"disabled"}
            withBackdrop={false}
          />
        ))}
      </div>
    </div>
  );
};
