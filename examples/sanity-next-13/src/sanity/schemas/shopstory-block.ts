import { defineType, defineField } from "sanity";

export default defineType({
  name: "shopstoryBlock",
  title: "Shopstory Block",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "shopstory"
    }),
  ],
});
