import { defineField, defineType } from "sanity";

export default defineType({
  name: "block_productsGrid",
  type: "document",
  title: "Block > Products Grid",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "collection",
      type: "string",
    }),
    defineField({
      name: "maxItems",
      type: "number",
    }),
  ],
});
