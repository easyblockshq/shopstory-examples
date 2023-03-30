import { defineType, defineField } from "sanity";

export default defineType({
  name: "shopstory-block",
  title: "Shopstory Block",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "shopstory",
      type: "shopstory",
    }),
  ],
});
