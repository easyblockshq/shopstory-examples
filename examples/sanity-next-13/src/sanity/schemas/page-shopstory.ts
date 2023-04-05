import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageShopstory",
  title: "Page Shopstory",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shopstory",
      type: "shopstory",
      title: "Shopstory",
    }),
  ],
});
