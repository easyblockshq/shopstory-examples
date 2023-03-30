import { defineConfig, isDev } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { shopstoryInput } from "@shopstory/sanity";
import { MissingEnvironmentVariableError } from "shared/utils/MissingEnvironmentVariableError";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_SANITY_DATASET");
}

export default defineConfig({
  basePath: "/studio",
  name: "default",
  title: "Shopstory Example",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  plugins: [
    deskTool(),
    visionTool(),
    shopstoryInput({
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0X2lkIjoiNGE4NjUwMjktNWQ2Mi00NGRiLTkzYjItNmMwNDQ1NmQ0MzYyIiwianRpIjoiODk0OWE2OTUtZmYwNC00NmQyLTllOGEtNTk1MGZjYWQ5OTBjIiwiaWF0IjoxNjgwMDA2NjIzfQ.GQKKyZU764RSzSZgzWgi--M3YykC9Mx8aqWkGa938pQ",
      canvasUrl: "/shopstory-canvas",
      locales: [
        {
          code: "en-US",
          isDefault: true,
        },
        {
          code: "de-DE",
          fallback: "en-US",
        },
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
