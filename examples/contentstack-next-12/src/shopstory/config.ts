import type { Config, FetchResourcesOutput } from "@shopstory/core";
import { contentstackPlugin } from "@shopstory/contentstack";
import { fetchProductsByIds } from "shared/data/shopify/fetchProductsByIds";
import { fetchProducts } from "shared/data/shopify/fetchProducts";
import { shopifyProductPickerField } from "@shopstory/shopify";
import { contentstackParams } from "../contentstackParams";

export const shopstoryConfig: Config = {
  actions: [],

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

  /**
   * Custom components.
   *
   * Here we connect custom components from the project to the Shopstory. Each custom components needs to have type, reference to the component and schema.
   *
   */
  components: [
    {
      id: "ProductCard",
      type: "card",
      schema: [
        /**
         * Product is a "custom type". In compilation config and editor config you will see how we define this type.
         */
        {
          prop: "product",
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

  /**
   * Devices / breakpoints
   */
  devices: {
    xs: {
      // startsFrom: 480,
      h: 667,
      w: 375,
    },
    sm: {
      // startsFrom: 768,
      h: 375,
      hidden: true,
      w: 667,
    },
    md: {
      // startsFrom: 1024,
      h: 1024,
      w: 768,
    },
    lg: {
      // startsFrom: 1280,
      w: 1024,
      h: 768,
      hidden: true,
    },
    xl: {
      // startsFrom: 1680,
      h: 768,
      w: 1366,
    },
    "2xl": {
      h: 920,
      hidden: true,
      w: 1920,
    },
  },

  /**
   * Font tokens
   */
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

  /**
   * Custom link actions.
   *
   * Below we define Next.js link. Each custom link action can have its own custom schema.
   */
  links: [
    {
      id: "MyLink",
      label: "URL Route",
      schema: [
        {
          prop: "pagePath",
          type: "string",
          defaultValue: "/",
        },
      ],
    },
  ],

  /**
   * Collection page grid information
   */
  mainGrid: {
    containerMargin: 0,
    horizontalGap: 1,
    numberOfItemsInRow: {
      "@initial": "3",
      "@sm": "2",
    },
    verticalGap: 24,
  },

  /**
   * Space tokens.
   *
   * containerMargin.default is a default container margin for the page.
   */
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

  resourceTypes: {
    /**
     * In Shopstory config we used "resource" type for product in a ProductCard schema. This is not Shopstory-defined type, so we must pass the instruction how to fetch it.
     *
     * Below we're defining "fetch function" that transforms unresolved product resources to the product objects necessary for ProductCard. It is totally custom and up to the developers.
     */
    product: {
      widget: () => {
        return shopifyProductPickerField({
          store: "shopstory-demo",
          storefrontAccessToken: "f8b32eaae0d2dc7996bfc02f2dc33b56",
        });
      },
      fetch: async (resources) => {
        const ids = resources.map((resource) => resource.id);
        const products = await fetchProductsByIds(ids);
        const result: Array<FetchResourcesOutput> = [];

        await Promise.all(
          products.map(async (product) => {
            const relatedTag = product.tags?.find((tag: any) =>
              tag.startsWith("related")
            );
            const relatedProducts = await fetchProducts("tag:" + relatedTag);

            const relatedResources = resources.filter((resource) => {
              return decodeObjectId(resource.id) === decodeObjectId(product.id);
            });

            relatedResources.forEach((relatedResource) => {
              result.push({
                ...relatedResource,
                value: {
                  ...product,
                  relatedProducts,
                },
              });
            });
          })
        );

        return result;
      },
    },
  },

  plugins: [contentstackPlugin(contentstackParams)],

  unstable_templates: [
    {
      label: "Button Dark",
      mapTo: "buttonDark",
      config: {
        _template: "Button",
        appearance: "solidBlack",
      },
    },

    {
      label: "Button Light",
      mapTo: "buttonLight",
      config: {
        _template: "Button",
        appearance: "solidWhite",
      },
    },

    {
      label: "Text Button",
      mapTo: ["buttonTextDark", "buttonTextLight"],
      config: {
        _template: "Button",
        appearance: "underlinedBlack",
      },
    },

    {
      mapTo: ["buttonSliderLeft", "buttonSliderLeftDark"],
      config: {
        _template: "$IconButton2",
        action: [],
        symbol: [
          {
            _template: "$icon",
            icon: {
              ref: "$sliderLeft",
            },
            color: {
              $res: true,
              xl: {
                ref: "white_01",
                value: "#f9f8f3",
              },
            },
          },
        ],
        hasBackground: true,
        backgroundColor: {
          $res: true,
          xl: {
            ref: "color_black_01",
          },
        },
        hasBorder: false,
        borderWidth: "1",
        borderColor: {
          $res: true,
          xl: {
            ref: "color_black_01",
          },
        },
        symbolSize: {
          $res: true,
          xl: "24",
        },
        buttonSize: {
          $res: true,
          xl: "48",
        },
        shape: "circle",
        label: {
          id: "local.caf60360-0080-44b3-b62b-ba9a942487ec",
          value: {
            main: "Previous",
          },
        },
        traceImpressions: false,
        traceClicks: false,
      },
    },

    {
      mapTo: ["buttonSliderRight", "buttonSliderRightDark"],
      config: {
        _template: "$IconButton2",
        action: [],
        symbol: [
          {
            _template: "$icon",
            icon: {
              ref: "$sliderRight",
            },
            color: {
              $res: true,
              xl: {
                ref: "white_01",
                value: "#f9f8f3",
              },
            },
          },
        ],
        hasBackground: true,
        backgroundColor: {
          $res: true,
          xl: {
            ref: "color_black_01",
          },
        },
        hasBorder: false,
        borderWidth: "1",
        borderColor: {
          $res: true,
          xl: {
            ref: "color_black_01",
          },
        },
        symbolSize: {
          $res: true,
          xl: "24",
        },
        buttonSize: {
          $res: true,
          xl: "48",
        },
        shape: "circle",
        label: {
          id: "local.caf60360-0080-44b3-b62b-ba9a942487ec",
          value: {
            main: "Next",
          },
        },
        traceImpressions: false,
        traceClicks: false,
      },
    },
  ],
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
