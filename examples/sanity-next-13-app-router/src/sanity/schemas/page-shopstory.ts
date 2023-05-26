import { defineField, defineType } from "sanity";
import {pageCommonFields} from "./page-common-fields";

export default defineType({
  name: "pageShopstory",
  title: "Page (shopstory)",
  type: "document",
  fields: [
    ...pageCommonFields,
    defineField({
      name: "content",
      type: "shopstory",
      title: "Content",
    }),
  ],
});
