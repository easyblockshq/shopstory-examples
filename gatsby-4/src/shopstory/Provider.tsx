import * as React from "react";
import { ShopstoryProvider, ImageProps } from "@shopstory/core/react";
import { Button } from "../components/Button/Button";
import { Link } from "gatsby";
import { CustomComponent } from "../components/CustomComponent/CustomComponent";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { GatsbyImage, getImageData } from "gatsby-plugin-image";

function GatsbyLink({ Component, componentProps, values }: any) {
  return (
    <Link to={values.pagePath}>
      <Component {...componentProps} as="span" />
    </Link>
  );
}

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
        GatsbyLink,
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

function createUrl(imgUrl: string, options: Record<string, any> = {}) {
  // If radius is -1, we need to pass `max` to the API
  const cornerRadius =
    options.cornerRadius === -1 ? `max` : options.cornerRadius;

  if (options.toFormat === `auto`) {
    delete options.toFormat;
  }

  // Convert to Contentful names and filter out undefined/null values.
  const urlArgs: Record<string, any> = {
    w: options.width || undefined,
    h: options.height || undefined,
    fl:
      options.toFormat === `jpg` && options.jpegProgressive
        ? `progressive`
        : undefined,
    q: options.quality || undefined,
    fm: options.toFormat || undefined,
    fit: options.resizingBehavior || undefined,
    f: options.cropFocus || undefined,
    bg: options.background || undefined,
    r: cornerRadius || undefined,
  };

  const isBrowser = typeof window !== `undefined`;

  const searchParams = isBrowser
    ? new window.URLSearchParams()
    : new URLSearchParams();

  for (const paramKey in urlArgs) {
    if (typeof urlArgs[paramKey] !== `undefined`) {
      searchParams.append(paramKey, urlArgs[paramKey] ?? ``);
    }
  }

  return `https://images.ctfassets.net/${imgUrl}`;
}
