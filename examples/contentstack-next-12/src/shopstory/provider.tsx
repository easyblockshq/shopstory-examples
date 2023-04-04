import { ShopstoryProvider, ImageProps, ShopstoryLink } from "@shopstory/react";

import { Button } from "shared/components/Button/Button";
import { ProductCard } from "shared/components/ProductCard/ProductCard";
import { AlertAction } from "shared/actions/AlertAction";

import Link from "next/link";
import NextImage from "next/image";
import { ReactNode, forwardRef } from "react";
import type { ShopstoryButtonProps } from "@shopstory/react";

const ShopstoryButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ShopstoryButtonProps
>(({ label, traceId, traceClicks, traceImpressions, ...restProps }, ref) => {
  return (
    <Button ref={ref} {...restProps}>
      {label}
    </Button>
  );
});

ShopstoryButton.displayName = "ShopstoryButton";

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

export const DemoShopstoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ShopstoryProvider
      components={{
        ProductCard,
      }}
      buttons={{
        Button: ShopstoryButton,
      }}
      links={{
        MyLink: NextLink,
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
