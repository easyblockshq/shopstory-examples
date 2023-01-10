import ProductListing from "../../components/sections/ProductListing/ProductListing";
import { PLPProps } from "../../types";
import type { ComponentType, ReactNode } from "react";

type LandingPageProviderOptions = {
  renderBeforeContent: ({ title }: { title: string }) => ReactNode;
  ShopstoryProvider: ComponentType<{ children: ReactNode }>;
};

type CategoryPageProps = Omit<PLPProps, "ShopstoryProvider">;

function categoryPageProvider({
  renderBeforeContent,
  ShopstoryProvider,
}: LandingPageProviderOptions): ComponentType<CategoryPageProps> {
  return function CategoryPage(props) {
    return (
      <>
        {renderBeforeContent({ title: props.collection.title })}
        <ProductListing
          ShopstoryProvider={ShopstoryProvider}
          {...props}
          key={props.collection.handle}
        />
      </>
    );
  };
}

export { categoryPageProvider };
export type { CategoryPageProps };
