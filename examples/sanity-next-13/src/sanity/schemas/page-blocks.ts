import { defineField, defineType } from "sanity";
import banner from "./blocks/banner";
import twoColumns from "./blocks/two-columns";
import productsGrid from "./blocks/products-grid";
import { pageCommonFields } from "./page-common-fields";

export default defineType({
  name: "pageBlocks",
  title: "Page (blocks)",
  type: "document",
  fields: [
    ...pageCommonFields,
    defineField({
      name: "blocks",
      type: "array",
      of: [
        {
          type: "reference",
          to: [banner, twoColumns, productsGrid],
        },
      ],
    }),
  ],
});
