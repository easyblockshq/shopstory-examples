import {
  ShopstoryProvider,
  ImageProps,
  ShopstoryLink,
} from "@shopstory/core/react";

import { Button } from "shared/components/Button/Button";
import { CustomComponent } from "shared/components/CustomComponent/CustomComponent";
import { ProductCard } from "shared/components/ProductCard/ProductCard";
import { AlertAction } from "shared/actions/AlertAction";

import Link from "next/link";
import NextImage from "next/image";

const NextLink: ShopstoryLink = ({ Component, componentProps, values }) => {
  return (
    <Link href={values.pagePath} passHref={true}>
      <Component {...componentProps} />
    </Link>
  );
};

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage src={props.src} alt={props.alt} layout={"fill"} />;
};

export const DemoShopstoryProvider: React.FC = ({ children }) => {
  return (
    <ShopstoryProvider
      components={{
        CustomComponent,
        ProductCard,
      }}
      buttons={{
        Button,
      }}
      links={{
        NextLink,
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
