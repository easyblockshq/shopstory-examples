import type { RenderableContent, Metadata } from "@shopstory/core";
import { Shopstory } from "@shopstory/react";
import { type ComponentType, Fragment, type ReactNode } from "react";
import { PageWrapper } from "../PageWrapper/PageWrapper";

type HomePageProviderOptions = {
  beforeContent: ReactNode;
  ShopstoryProvider: ComponentType<{ children: ReactNode }>;
};

type HomePageProps = {
  content: RenderableContent;
  meta: Metadata;
};

function homePageProvider({
  beforeContent,
  ShopstoryProvider,
}: HomePageProviderOptions): ComponentType<HomePageProps> {
  return function HomePage(props) {
    return (
      <Fragment>
        {beforeContent}

        <PageWrapper>
          <ShopstoryProvider>
            <Shopstory {...props} />
          </ShopstoryProvider>
        </PageWrapper>
      </Fragment>
    );
  };
}

export { homePageProvider };
export type { HomePageProps };
