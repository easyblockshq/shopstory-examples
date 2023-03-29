import { Shopstory } from "@shopstory/react";
import { ComponentType, ReactNode } from "react";
import { BannerSection } from "../blocks/BannerSection/BannerSection";
import { ProductsGridSection } from "../blocks/ProductsGridSection/ProductsGridSection";
import { TwoColumnsSection } from "../blocks/TwoColumnsSection/TwoColumnsSection";
import { PageWrapper } from "../common/PageWrapper/PageWrapper";

type PageProviderOptions = {
  beforeContent: ReactNode;
  ShopstoryProvider: ComponentType;
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
