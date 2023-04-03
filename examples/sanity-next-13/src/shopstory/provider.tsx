import {
  ShopstoryProvider,
  ImageProps,
  ShopstoryLink,
  Shopstory,
} from "@shopstory/react";

import { Button } from "shared/components/Button/Button";
import { CustomComponent } from "shared/components/CustomComponent/CustomComponent";
import { ProductCard } from "shared/components/ProductCard/ProductCard";
import { AlertAction } from "shared/actions/AlertAction";

import Link from "next/link";
import NextImage from "next/image";
import { ReactNode } from "react";
import {BannerSection} from "shared/components/sections/BannerSection/BannerSection";
import {TwoColumnsSection} from "shared/components/sections/TwoColumnsSection/TwoColumnsSection";

const NextLink: ShopstoryLink = ({ Component, componentProps, values }) => {
  return (
    <Link href={values.pagePath} passHref={true} legacyBehavior={true}>
      <Component {...componentProps} />
    </Link>
  );
};

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage src={props.src} alt={props.alt} layout={"fill"} />;
};

const SanitySection : React.FC<{ section: { type: string, props: any } }> = ({ section: { type, props }}) => {
  if (type === "block_banner") {
    return <BannerSection {...props} />
  }
  else if (type === "block_twoColumns") {
    return <TwoColumnsSection {...props} />
  }

  throw new Error("wrong type of block provided to SanitySection");
}

export const DemoShopstoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ShopstoryProvider
      components={{
        CustomComponent,
        ProductCard,
        SanitySection
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
