import { defineField } from "sanity";

export const pageCommonFields = [
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
  })
]
