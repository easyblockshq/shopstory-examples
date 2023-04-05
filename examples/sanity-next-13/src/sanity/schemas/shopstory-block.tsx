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
      type: "shopstory",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(value) {
      return {
        title: value.title,
        media: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" fill="#F0FB98" />
            <path
              d="M24.8625 24.3526C24.8625 22.0386 23.2513 20.4408 21.4253 19.0909L20.0559 18.0716C18.6595 17.0248 17.9076 16.2534 17.9076 15.0964C17.9076 13.7741 19.0354 13.0028 20.4318 13.0028C21.7207 13.0028 22.768 13.4986 23.5467 14.876L26.2857 13.1956C24.9162 10.7989 22.7948 10 20.5661 10C17.3437 10 14.739 11.9559 14.739 15.2066C14.739 17.438 16.0011 19.0083 18.0687 20.5234L19.4382 21.5427C20.942 22.5895 21.6133 23.3884 21.6133 24.6281C21.6133 26.0055 20.4049 26.9972 18.6058 26.9972C16.6724 26.9972 15.464 25.8678 14.7927 24.2424L12 25.9504C13.0741 28.292 15.3298 30 18.4178 30C22.4189 30 24.8625 27.5207 24.8625 24.3526Z"
              fill="black"
            />
          </svg>
        ),
      };
    },
  },
});
