import { ImageProps, ShopstoryLink, ShopstoryProvider } from "@shopstory/react";
import NextImage from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { AlertAction } from "shared/actions/AlertAction";
import { Button } from "shared/components/Button/Button";
import { CustomComponent } from "shared/components/CustomComponent/CustomComponent";
import { ProductCard } from "shared/components/ProductCard/ProductCard";

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

export const DemoShopstoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
