"use client";
import { Metadata, RenderableContent } from "@shopstory/core";
import { Shopstory, ShopstoryMetadataProvider } from "@shopstory/react";

export function ShopstoryContent(props: {
  content: RenderableContent;
  meta: Metadata;
}) {
  return (
    <ShopstoryMetadataProvider meta={props.meta}>
      <Shopstory content={props.content} />
    </ShopstoryMetadataProvider>
  );
}
