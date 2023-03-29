import {
  ImageProps,
  ShopstoryLink,
  ShopstoryProvider,
} from "@shopstory/react";
import { Link } from "gatsby";
import { GatsbyImage, getImageData } from "gatsby-plugin-image";
import * as React from "react";
import { Button } from "shared/components/Button/Button";
import { CustomComponent } from "shared/components/CustomComponent/CustomComponent";
import { ProductCard } from "shared/components/ProductCard/ProductCard";

const InternalLink: ShopstoryLink = ({ Component, componentProps, values }) => {
  return (
    <Link to={values.pagePath}>
      <Component {...componentProps} as="span" />
    </Link>
  );
};

const AlertAction = (props: any) => {
  alert("Alert message: " + props.text);
};

const gatsbyImageStyle = { height: "100%" };
const gatsbyImageImgStyle = { width: "100%", height: "100%" };

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  const imageData = React.useMemo(() => {
    return generateGatsbyImageData({ imageUrl: src });
  }, [src]);

  return (
    <GatsbyImage
      image={imageData}
      alt={alt}
      style={gatsbyImageStyle}
      imgStyle={gatsbyImageImgStyle}
      title={alt}
    />
  );
};

export const DemoShopstoryProvider: React.FC<{ children: React.ReactNode }> = ({
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
        InternalLink,
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

export function generateGatsbyImageData({ imageUrl, width, height }: any) {
  return getImageData({
    baseUrl: imageUrl,
    urlBuilder: ({ baseUrl }) => {
      return baseUrl;
    },
    sourceWidth: width,
    sourceHeight: height,
    layout: "fullWidth",
    formats: ["webp", "jpg"],
    breakpoints: [
      320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840,
    ],
  });
}
