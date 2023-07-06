import { Config } from "@shopstory/core";
import { fetchProductsByIds } from "../data/shopify/fetchProductsByIds";
import { fetchProducts } from "../data/shopify/fetchProducts";
import { fetchProductById } from "../data/shopify/fetchProductById";

export const shopstoryBaseConfig: Config = {
  /**
   * Aspect ratios are tokenized.
   */
  aspectRatios: [
    {
      id: "$gridMainObjectDefault",
      value: "10:7",
    },
  ],

  /**
   * Color tokens
   */
  colors: [
    {
      id: "color_black_01",
      label: "Black 01",
      value: "#252525",
      mapTo: ["$dark", "$backgroundDark"],
    },
    {
      id: "color_black_02",
      label: "Black 02",
      value: "#4f4f4f",
    },
    {
      id: "color_black_03",
      label: "Black 03",
      value: "#000000",
    },
    {
      id: "white_01",
      label: "White 01",
      value: "#f9f8f3",
      mapTo: ["$light", "$backgroundLight"],
    },
    {
      id: "white_02",
      label: "White 02",
      value: "#bdbdbd",
    },
    {
      id: "beige_01",
      label: "Beige 01",
      value: "#f1f0ea",
    },
    {
      id: "grey_01",
      label: "Grey 01",
      value: "#a0a09d",
    },
    {
      id: "grey_02",
      label: "Grey 02",
      value: "#4F4F4F",
    },
  ],

  fonts: [
    {
      id: "body",
      label: "Body",
      value: {
        fontSize: 20,
        lineHeight: 1.8,
        fontFamily: "test-soehne-mono",
      },
      mapTo: ["$body", "$body.bold"],
    },
    {
      id: "body-small",
      label: "Body small",
      value: {
        fontSize: 13,
        lineHeight: 1.8,
        fontFamily: "test-soehne-mono",
      },
      mapTo: ["$body2", "$body2.bold"],
    },
    {
      id: "heading1",
      label: "Heading 1",
      value: {
        fontFamily: "test-national-2",
        fontSize: 48,
        lineHeight: 1.2,
        fontWeight: 700,
        "@sm": {
          fontSize: 36, // responsiveness is easy
        },
      },
      mapTo: "$heading1",
    },
    {
      id: "heading2",
      label: "Heading 2",
      value: {
        fontFamily: "test-national-2",
        fontSize: 36,
        lineHeight: 1.2,
        fontWeight: 700,
        "@sm": {
          fontSize: 24, // responsiveness is easy
        },
      },
      mapTo: "$heading2",
    },
    {
      id: "heading3",
      label: "Heading 3",
      value: {
        fontFamily: "test-national-2",
        fontSize: 21,
        lineHeight: 1.4,
        fontWeight: 600,
      },
      mapTo: "$heading3",
    },
    {
      id: "heading4",
      label: "Heading 4",
      value: {
        fontFamily: "test-national-2",
        fontSize: 16,
        lineHeight: 1.4,
        fontWeight: 600,
      },
      mapTo: "$heading4",
    },
    {
      id: "heading5",
      label: "Heading 5",
      value: {
        fontFamily: "test-national-2",
        fontSize: 13,
        lineHeight: 1.4,
        fontWeight: 600,
      },
    },
  ],

  space: [
    {
      id: "containerMargin.default",
      value: {
        "@initial": 96,
        "@xxl": 96,
        "@xl": 80,
        "@lg": 60,
        "@md": 40,
        "@sm": 24,
        "@xs": 24,
      },
    },
    {
      id: "containerMargin.large",
      value: {
        "@initial": 384,
        "@xxl": 384,
        "@xl": 280,
        "@lg": 160,
        "@md": 40,
        "@sm": 24,
        "@xs": 24,
      },
    },
    {
      id: "containerMargin.medium",
      value: {
        "@initial": 192,
        "@xxl": 192,
        "@xl": 160,
        "@lg": 92,
        "@md": 40,
        "@sm": 24,
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
          prop: "product",
          label: "Product",
          type: "resource",
          resourceType: "product",
        },
        {
          prop: "relatedProductsMode",
          label: "Related products - mode",
          type: "select",
          options: [
            {
              label: "Off",
              value: "disabled",
            },
            {
              label: "On",
              value: "enabled",
            },
            {
              label: "On hover",
              value: "onHover",
            },
          ],
        },
        {
          prop: "withBackdrop",
          label: "Backdrop",
          type: "boolean",
        },
      ],
    },
  ],
  buttons: [
    {
      id: "Button",
      schema: [
        {
          prop: "appearance",
          type: "select",
          options: [
            "solidBlack",
            "solidGrey",
            "solidWhite",
            "outlineBlack",
            "underlinedBlack",
          ],
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
        const products = await fetchProductsByIds(ids, {
          includeRelated: true,
        });

        return resources.map((resource) => ({
          ...resource,
          value: products.find(
            (product) =>
              decodeObjectId(product.id) === decodeObjectId(resource.id)
          ),
        }));
      },
      widget: {
        type: "item-picker",
        getItems: async (query) => {
          const products = await fetchProducts(query);

          return products.map((product) => ({
            id: product.id,
            title: product.title,
            thumbnail: product.primaryImage?.mediaObject?.src,
          }));
        },
        getItemById: async (id) => {
          const product = await fetchProductById(id);
          if (!product) {
            throw new Error("can't find product");
          }

          return {
            id: product.id,
            title: product.title,
            thumbnail: product.primaryImage?.mediaObject?.src,
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

function decodeObjectId(id: string) {
  if (isGid(id)) return id;

  return typeof window === "undefined"
    ? Buffer.from(id, "base64").toString("utf-8")
    : window.atob(id);
}

function isGid(id: string) {
  return id.startsWith("gid://shopify/");
}
