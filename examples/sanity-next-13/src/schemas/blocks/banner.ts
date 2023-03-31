import { defineField, defineType } from "sanity";

export default defineType({
  name: "block_banner",
  type: "document",
  title: "Block > Banner",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
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
