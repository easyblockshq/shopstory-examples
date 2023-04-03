import { defineType, defineField } from "sanity";

export default defineType({
  name: "shopstoryBlock",
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
