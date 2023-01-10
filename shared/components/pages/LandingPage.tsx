import type { Metadata, RenderableContent } from "@shopstory/core";
import { Shopstory } from "@shopstory/core/react";
import { type ComponentType, Fragment, type ReactNode } from "react";
import { PageWrapper } from "../common/PageWrapper/PageWrapper";

type LandingPageProviderOptions = {
  renderBeforeContent: ({ title }: { title: string }) => ReactNode;
  ShopstoryProvider: ComponentType<{ children: ReactNode }>;
};

type LandingPageProps = {
  title: string;
  content: RenderableContent;
  meta: Metadata;
};

function landingPageProvider({
  renderBeforeContent,
  ShopstoryProvider,
}: LandingPageProviderOptions) {
  return function LandingPage({ title, ...props }: LandingPageProps) {
    return (
      <Fragment>
        {renderBeforeContent({ title })}
        <PageWrapper>
          <ShopstoryProvider>
            <Shopstory {...props} />
          </ShopstoryProvider>
        </PageWrapper>
      </Fragment>
    );
  };
}

export { landingPageProvider };
export type { LandingPageProps };
