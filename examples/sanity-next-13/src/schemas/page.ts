import { defineField, defineType } from "sanity";
import banner from "./blocks/banner";
import shopstoryBlock from "./shopstory-block";
import twoColumns from "./blocks/two-columns";
import productsGrid from "./blocks/products-grid";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
    }),
    defineField({
      name: "metaTitle",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      type: "string",
    }),
    defineField({
      name: "metaImage",
      type: "image",
    }),
    defineField({
      name: "blocks",
      type: "reference",
      to: [banner, twoColumns, productsGrid, shopstoryBlock],
    }),
  ],
});
