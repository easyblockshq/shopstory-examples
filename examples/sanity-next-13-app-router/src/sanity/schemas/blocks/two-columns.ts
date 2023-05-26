import { defineField, defineType } from "sanity";

export default defineType({
  name: "block_twoColumns",
  type: "document",
  title: "Block > Two Columns",
  fields: [
    defineField({
      name: "leftText",
      type: "string",
    }),
    defineField({
      name: "rightText",
      type: "string",
    }),
    defineField({
      name: "buttonLabel",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      type: "string",
    }),
  ],
});
