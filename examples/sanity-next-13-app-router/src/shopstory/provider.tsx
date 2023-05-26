"use client";
import { ImageProps, ShopstoryLink, ShopstoryProvider } from "@shopstory/react";
import NextImage from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { AlertAction } from "shared/actions/AlertAction";
import { Button } from "shared/components/Button/Button";
import { CustomComponent } from "shared/components/CustomComponent/CustomComponent";
import { ProductCard } from "shared/components/ProductCard/ProductCard";
import { BannerSection } from "shared/components/sections/BannerSection/BannerSection";
import { ProductsGridSection } from "shared/components/sections/ProductsGridSection/ProductsGridSection";
import { TwoColumnsSection } from "shared/components/sections/TwoColumnsSection/TwoColumnsSection";

const NextLink: ShopstoryLink = ({ Component, componentProps, values }) => {
  return (
    <Link href={values.pagePath} passHref={true} legacyBehavior={true}>
      <Component {...componentProps} />
    </Link>
  );
};

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage src={props.src} alt={props.alt} fill />;
};

const SanitySection: React.FC<{ section: { type: string; props: any } }> = ({
  section: { type, props },
}) => {
  if (type === "block_banner") {
    return <BannerSection {...props} disableInternalMargins />;
  } else if (type === "block_twoColumns") {
    return <TwoColumnsSection {...props} />;
  } else if (type === "block_productsGrid") {
    return <ProductsGridSection {...props} disableInternalMargins />;
  }

  throw new Error(`Wrong type of block provided to SanitySection`);
};

export const DemoShopstoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ShopstoryProvider
      components={{
        CustomComponent,
        ProductCard,
        SanitySection,
      }}
      buttons={{
        Button,
      }}
      links={{
        InternalLink: NextLink,
      }}
      actions={{
        AlertAction,
      }}
      Image={Image}
    >
      {children}
    </ShopstoryProvider>
  );
};
