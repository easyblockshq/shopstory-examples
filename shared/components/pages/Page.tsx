import { Shopstory, ShopstoryProvider } from "@shopstory/react";
import { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";
import { BannerSection } from "../sections/BannerSection/BannerSection";
import { ProductsGridSection } from "../sections/ProductsGridSection/ProductsGridSection";
import { TwoColumnsSection } from "../sections/TwoColumnsSection/TwoColumnsSection";
import { PageWrapper } from "../PageWrapper/PageWrapper";

type PageProviderOptions = {
  beforeContent: ReactNode;
  ShopstoryProvider: ComponentType<
    ComponentPropsWithoutRef<typeof ShopstoryProvider>
  >;
};

type PageProps = {
  blocks: any[];
};

function landingPageProvider({
  beforeContent,
  ShopstoryProvider,
}: PageProviderOptions): ComponentType<PageProps> {
  return function LandingPage(props) {
    return (
      <>
        {beforeContent}

        <PageWrapper>
          {props.blocks.map((block: any) => {
            if (block.type === "blockBanner") {
              return <BannerSection {...block.data} />;
            } else if (block.type === "blockProductsGrid") {
              return <ProductsGridSection {...block.data} />;
            } else if (block.type === "blockTwoColumns") {
              return <TwoColumnsSection {...block.data} />;
            } else if (block.type === "shopstoryBlock") {
              return (
                <ShopstoryProvider>
                  <Shopstory content={block.content} meta={block.meta} />
                </ShopstoryProvider>
              );
            } else {
              throw new Error(`unknown block type: ${block.type}`);
            }
          })}
        </PageWrapper>
      </>
    );
  };
}

export { landingPageProvider };
export type { PageProps };
