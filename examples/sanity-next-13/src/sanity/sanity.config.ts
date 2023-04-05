import { visionTool } from "@sanity/vision";
import { shopstory } from "@shopstory/sanity";
import { SanityDocument, Slug, defineConfig } from "sanity";
import Iframe from "sanity-plugin-iframe-pane";
import { media, mediaAssetSource } from "sanity-plugin-media";
import {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  deskTool,
} from "sanity/desk";
import { MissingEnvironmentVariableError } from "shared/utils/MissingEnvironmentVariableError";
import { schemaTypes } from "./schemas";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_SANITY_DATASET");
}

function getPreviewUrl(doc: SanityDocument & { slug?: Slug }, baseUrl: string) {
  if (doc.slug?.current) {
    return `${window.location.protocol}//${window.location.host}/api/preview?page=/${baseUrl}/${doc.slug.current}`;
  }

  return `${window.location.protocol}//${window.location.host}`;
}

function previewView(S: StructureBuilder, baseUrl: string) {
  return S.view
    .component(Iframe)
    .options({
      url: (doc: SanityDocument) => getPreviewUrl(doc, baseUrl),
      reload: {
        button: true,
        revision: true,
      },
    })
    .title("Preview");
}

const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case "pageShopstory":
      return S.document().views([
        S.view.form(),
        previewView(S, "page-shopstory"),
      ]);
    case "pageBlocks":
      return S.document().views([S.view.form(), previewView(S, "page-blocks")]);
    default:
      return S.document().views([S.view.form()]);
  }
};

export default defineConfig({
  basePath: "/studio",
  name: "default",
  title: "Shopstory Example",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  plugins: [
    deskTool({
      defaultDocumentNode,
    }),
    visionTool(),
    shopstory({
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0X2lkIjoiNGE4NjUwMjktNWQ2Mi00NGRiLTkzYjItNmMwNDQ1NmQ0MzYyIiwianRpIjoiODk0OWE2OTUtZmYwNC00NmQyLTllOGEtNTk1MGZjYWQ5OTBjIiwiaWF0IjoxNjgwMDA2NjIzfQ.GQKKyZU764RSzSZgzWgi--M3YykC9Mx8aqWkGa938pQ",
      canvasUrl: "/shopstory-canvas",
      locales: [
        {
          code: "en",
          isDefault: true,
        },
        {
          code: "de",
          fallback: "en",
        },
      ],
      assetSource: mediaAssetSource,
    }),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
