import styles from "./productDetails.module.css";
import React, { FC, useEffect, useRef, useState } from "react";
import { ShopifyProduct } from "../../../types";
import { formatPrice } from "../../../utils/formatPrice";
import AddToBagButton from "../../AddToBagButton/AddToBagButton";
import { Media } from "../../Media/Media";
import Link from "next/link";
import { getCollectionColor } from "../../../data/shopify/filterCollection";
import { ToastPortal } from "../../Toast/ToastPortal";
import { Toast } from "../../Toast/Toast";
import { Button } from "../../Button/Button";

const ProductDetails: FC<{ product: ShopifyProduct }> = ({ product }) => {
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [isReadMoreButtonActive, setReadMoreButtonActive] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [galleryItemLayout, setGalleryItemLayout] = useState<
    "fill" | "responsive"
  >("fill");
  const [galleryItemObjectFit, setGalleryItemObjectFit] = useState<
    "cover" | "contain" | undefined
  >("contain");

  const openToast = () => {
    if (!isToastActive && !isToastVisible) {
      setTimeout(function () {
        setIsToastVisible(false);
        setTimeout(function () {
          setIsToastActive(false);
        }, 700);
      }, 3000);
      setIsToastActive(true);
      setIsToastVisible(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGalleryItemLayout("fill");
        setGalleryItemObjectFit("contain");
      } else {
        setGalleryItemLayout("responsive");
        setGalleryItemObjectFit(undefined);
      }

      if (descriptionRef.current) {
        if (
          descriptionRef.current?.offsetHeight <
          descriptionRef.current?.scrollHeight
        ) {
          setReadMoreButtonActive(true);
        } else {
          setReadMoreButtonActive(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        {product.media &&
          product.media.map((item, i) => {
            return (
              <div key={i} className={styles.galleryItem}>
                <Media
                  media={item}
                  sizes={`(min-width: 1000px) calc(100vw - 480px), 100vw`}
                  layout={galleryItemLayout}
                  objectFit={galleryItemObjectFit}
                />
              </div>
            );
          })}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.details}>
            {product.color && product.color?.length > 0 && (
              <div className={styles.color}>
                {getCollectionColor(product.color[0].name)?.fullName}
              </div>
            )}
            <div className={styles.prices}>
              {product.price && (
                <p className={styles.priceStandard}>
                  {formatPrice(product.price)}
                </p>
              )}
              {product.compareAtPrice && (
                <p className={styles.priceCompare}>
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
            </div>
            {product.relatedProducts && product.relatedProducts?.length > 1 && (
              <div className={styles.related}>
                {product.relatedProducts.map((relatedProduct, i) => {
                  let relatedLinkClasses = [styles.relatedProduct];
                  if (product.handle === relatedProduct.handle) {
                    relatedLinkClasses.push(styles.relatedProductActive);
                  }
                  return (
                    <Link
                      href={"/products/" + relatedProduct.handle}
                      key={i}
                      legacyBehavior
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
                })}
              </div>
            )}
          </div>
          <div className={styles.actions}>
            <AddToBagButton
              onClick={() => {
                openToast();
              }}
            />
            <ToastPortal>
              {isToastActive && (
                <Toast
                  message={"This is a demo store"}
                  isVisible={isToastVisible}
                />
              )}
            </ToastPortal>
          </div>
          <div
            className={[
              styles.description,
              !isDescriptionOpen ? styles.isShortened : "",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            ref={descriptionRef}
          />
          {isReadMoreButtonActive && (
            <Button
              size={"small"}
              appearance={"extraSmall"}
              onClick={() => {
                setIsDescriptionOpen(true);
                setReadMoreButtonActive(false);
              }}
            >
              Read more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
