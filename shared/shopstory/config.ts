import { Config } from "../../gatsby-4/node_modules/@shopstory/core";
import { contentfulPlugin } from "../../gatsby-4/node_modules/@shopstory/core/contentful";
import { MockProductsService } from "../products/MockProductsService";

export const shopstoryConfig: Config = {
  plugins: [
    contentfulPlugin({
      space: process.env.GATSBY_PUBLIC_CONTENTFUL_SPACE!,
      environment: process.env.GATSBY_PUBLIC_CONTENTFUL_ENVIRONMENT ?? "master",
      accessToken: process.env.GATSBY_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
      previewAccessToken:
        process.env.GATSBY_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
    }),
  ],

  fonts: [
    {
      id: "body",
      label: "Body",
      value: {
        fontSize: 20,
        lineHeight: 1.4,
        fontFamily: "sans-serif",
        "@xs": {
          fontSize: 18,
        },
      },
    },
    {
      id: "body-small",
      label: "Body small",
      value: {
        fontSize: 15,
        lineHeight: 1.4,
        fontFamily: "sans-serif",
      },
    },
    {
      id: "heading-large",
      label: "Heading large",
      value: {
        fontSize: 48,
        lineHeight: 1.2,
        fontWeight: 700,
        fontFamily: "sans-serif",
        "@sm": {
          fontSize: 36, // responsiveness is easy
        },
      },
    },
    {
      id: "heading-medium",
      label: "Heading medium",
      value: {
        fontSize: 36,
        lineHeight: 1.2,
        fontWeight: 700,
        fontFamily: "sans-serif",
        "@sm": {
          fontSize: 24, // responsiveness is easy
        },
      },
    },
    {
      id: "heading-small",
      label: "Heading small",
      value: {
        fontSize: 24,
        lineHeight: 1.2,
        fontWeight: 700,
        fontFamily: "sans-serif",
      },
    },
  ],
  colors: [
    {
      id: "green",
      label: "Green",
      value: "#83d1c4",
    },
    {
      id: "purple",
      label: "Purple",
      value: "#78517c",
    },
    {
      id: "orange",
      label: "Orange",
      value: "#f17950",
    },
  ],
  space: [
    {
      id: "sections-spacing",
      label: "Sections spacing",
      value: {
        "@2xl": 96,
        "@xl": 64,
        "@lg": 40,
        "@xs": 36,
      },
    },
    {
      id: "containerMargin.default",
      value: {
        "@lg": "5vw",
        "@xs": 24,
      },
    },
  ],
  containerWidths: [
    {
      id: "small",
      value: 800,
    },
  ],
  components: [
    {
      id: "CustomComponent",
      label: "Custom component",
      schema: [
        {
          prop: "color",
          label: "Color",
          type: "select",
          options: ["white", "purple", "green"],
        },
        {
          prop: "noBorder",
          label: "Disable border",
          type: "boolean",
        },
      ],
    },
    {
      id: "ProductCard",
      label: "Product Card",
      type: "card",
      schema: [
        {
          prop: "hasOverlay",
          label: "Has overlay",
          type: "boolean",
        },
        {
          prop: "product",
          label: "Product",
          type: "resource",
          resourceType: "product",
        },
      ],
    },
  ],
  buttons: [
    {
      id: "Button",
      label: "Demo Button",
      schema: [
        {
          prop: "variant",
          label: "Variant",
          type: "select",
          options: ["dark", "light", "dark-outline", "light-outline"],
        },
      ],
    },
  ],
  links: [
    {
      id: "InternalLink",
      label: "Internal link",
      schema: [
        {
          prop: "pagePath",
          label: "Path",
          type: "string",
          defaultValue: "/",
        },
      ],
    },
  ],
  actions: [
    {
      id: "AlertAction",
      label: "Alert action",
      schema: [
        {
          prop: "text",
          label: "Text",
          type: "string",
          defaultValue: "Hello",
        },
      ],
    },
  ],
  resourceTypes: {
    product: {
      fetch: async (resources) => {
        const ids = resources.map((resource) => resource.id);
        const products = await MockProductsService.getProductsByIds(ids);

        return resources.map((resource) => ({
          ...resource,
          value: products.find((product) => product.id === resource.id),
        }));
      },
      widget: {
        type: "item-picker",
        getItems: async (query) => {
          const products = await MockProductsService.searchProducts(query);
          return products.map((product) => ({
            id: product.id,
            title: product.title,
            thumbnail: product.image,
          }));
        },
        getItemById: async (id) => {
          const product = await MockProductsService.getProductById(id);
          if (!product) {
            throw new Error("can't find product");
          }

          return {
            id: product.id,
            title: product.title,
            thumbnail: product.image,
          };
        },
      },
    },
  },
  devices: {
    sm: {
      startsFrom: 520,
    },
  },
};
