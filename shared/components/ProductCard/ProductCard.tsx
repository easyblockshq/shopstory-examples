import { FC } from "react";
import { ShopifyProduct } from "../../types";
import { formatPrice } from "../../utils/formatPrice";
import Link from "next/link";
import { Media } from "../Media/Media";
import styles from "./productCard.module.css";

const ProductCard: FC<{
  product: ShopifyProduct;
  relatedProductsMode: "enabled" | "disabled" | "onHover";
  withBackdrop: Boolean;
}> = ({ product, relatedProductsMode, withBackdrop: withBackdrop }) => {
  const hasRelatedProducts = product.relatedProducts && product.relatedProducts?.length > 1;
  const shouldShowRelatedProducts = hasRelatedProducts && relatedProductsMode === "enabled";
  const shouldShowRelatedProductsOnHover = hasRelatedProducts && relatedProductsMode === "onHover"

  let relatedProductsClassName = "";
  if (shouldShowRelatedProducts) {
    relatedProductsClassName = styles.wrapperWithVariants;
  } else if (shouldShowRelatedProductsOnHover) {
    relatedProductsClassName = styles.wrapperWithVariantsOnHover;
  }

  return (
    <div className={`${styles.wrapper} ${relatedProductsClassName}`}>
      <Link href={"/products/" + product.handle}>
        <a>
          <div
            className={[
              styles.thumbnail,
              withBackdrop ? styles.thumbnailWithBackdrop : "",
            ].join(" ")}
          >
            {product.primaryImage ? (
              <Media
                media={product.primaryImage}
                layout="fill"
                sizes="(min-width: 1300px) 33.3333vw, (min-width: 740px) 50vw, 100vw"
              />
            ) : (
              <div className={styles.placeholder}>No image</div>
            )}
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{product.title}</h2>
            {product.price && (
              <p className={styles.priceStandard}>
                {formatPrice(product.price)}
              </p>
            )}
            {relatedProductsMode !== "disabled" &&
              product.relatedProducts &&
              product.relatedProducts?.length > 1 && (
                <div className={styles.related}>
                  {product.relatedProducts.map((relatedProduct, i) => {
                    let relatedLinkClasses = [styles.relatedProduct];
                    if (product.handle === relatedProduct.handle) {
                      relatedLinkClasses.push(styles.relatedProductActive);
                    }

                    if (
                      relatedProduct.color &&
                      relatedProduct.color?.length > 0
                    ) {
                      return (
                        <Link
                          href={"/products/" + relatedProduct.handle}
                          key={i}
                        >
                          <a className={relatedLinkClasses.join(" ")}>
                            {relatedProduct.primaryImage ? (
                              <Media
                                media={relatedProduct.primaryImage}
                                sizes="80px"
                              />
                            ) : (
                              <div className={styles.placeholder}>No image</div>
                            )}
                          </a>
                        </Link>
                      );
                    }
                  })}
                </div>
              )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export { ProductCard };
