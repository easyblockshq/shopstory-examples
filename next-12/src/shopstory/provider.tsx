import { ShopstoryProvider, ImageProps, ShopstoryLink } from "@shopstory/core/react";
import {Button} from "../components/Button/Button";
import Link from "next/link";
import { CustomComponent } from "../components/CustomComponent/CustomComponent";
import { ProductCard } from "../components/ProductCard/ProductCard";
import NextImage from "next/image";

const NextLink : ShopstoryLink = ({ Component, componentProps, values }) => {
  return (
    <Link href={values.pagePath} passHref={true}>
      <Component {...componentProps} />
    </Link>
  )
}

const AlertAction = (props: any) => {
  alert("Alert message: " + props.text);
}

const Image : React.FC<ImageProps> = (props) => {
  return <NextImage src={props.src} alt={props.alt} layout={"fill"} />
}

export const DemoShopstoryProvider : React.FC = ({ children }) => {
  return <ShopstoryProvider
    components={{
      CustomComponent,
      ProductCard
    }}
    buttons={{
      Button
    }}
    links={{
      NextLink
    }}
    actions={{
      AlertAction
    }}
    Image={Image}
  >
    { children }
  </ShopstoryProvider>
}