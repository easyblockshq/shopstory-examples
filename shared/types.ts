import { Metadata, RenderableContent } from "@shopstory/core";
import { ComponentType, ReactNode } from "react";

export type Path = {
  params: {
    handle: string[];
  };
};

export type ShopifyPrice = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductColor = {
  name: string;
};

export type ShopifyProductRoom = {
  name: string;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice;
  media: MediaObject[];
  primaryImage?: MediaObject;
  secondaryImage?: MediaObject;
  relatedProducts?: ShopifyProduct[];
  tags?: string[];
  color?: ShopifyProductColor[];
};

export type ShopifyCollectionWithEdges = {
  title: string;
  id: string;
  handle: string;
  descriptionHtml?: string;
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: any;
  };
};

export type ShopifyCollection = {
  title: string;
  id: string;
  handle: string;
  descriptionHtml?: string;
  products: ShopifyProduct[];
};

export type CollectionFilterOption = {
  id: string;
  label: string;
};

export type CollectionFilterButtonType =
  | "select"
  | "multiselect"
  | "colorselect";

export type CollectionFilterValues = {
  sort: string;
  color: string[];
  room: string[];
  page: number;
};

export type CollectionFilter = {
  id: keyof CollectionFilterValues;
  label: string;
  type: CollectionFilterButtonType;
  options: CollectionFilterOption[];
};

export type PLPProps = {
  filters: any;
  fullCollection: any;
  collection: ShopifyCollection;
  pagination: {
    current: number;
    max: number;
  };
  numberOfItems: number;
  gridContent: ReactNode;
};

export type ImageObject = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  format?: string;
  id: string;
  from: "shopify";
};

export type MediaObject =
  | {
      mediaType: "image";
      mediaObject: ImageObject;
    }
  | {
      mediaType: "video";
      mediaObject: any;
    };
