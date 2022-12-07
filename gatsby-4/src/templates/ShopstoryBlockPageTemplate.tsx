import * as React from "react";
import type { RenderableContentPiece, Metadata } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/core/react";
import type { PageProps } from "gatsby";
import { DemoShopstoryProvider } from "../shopstory/Provider";

type ShopstoryBlockPageTemplateProps = PageProps<
  never,
  {
    content: RenderableContentPiece;
    meta: Metadata;
  }
>;

function ShopstoryBlockPageTemplate(props: ShopstoryBlockPageTemplateProps) {
  return (
    <DemoShopstoryProvider>
      <ShopstoryMetadataProvider meta={props.pageContext.meta}>
        <Shopstory content={props.pageContext.content} />
      </ShopstoryMetadataProvider>
    </DemoShopstoryProvider>
  );
}

export default ShopstoryBlockPageTemplate;
