import contentstack, { LivePreviewQuery, type Region } from "contentstack";

type ContentstackClient = {
  fetchHomePageEntry(): Promise<any>;
  fetchPageEntryBySlug(slug: string): Promise<any>;
  fetchCollectionPageEntryBySlug(slug: string): Promise<any>;
  fetchLandingPageEntryBySlug(slug: string): Promise<any>;
};

export type ContentstackClientParams = {
  apiKey: string;
  deliveryToken: string;
  managementToken: string;
  region: Region;
  environment: string;
  preview?: boolean;
};

function createContentstackClient(
  params: ContentstackClientParams & { livePreviewQuery?: LivePreviewQuery }
): ContentstackClient {
  const stack = contentstack.Stack({
    region: params.region,
    api_key: params.apiKey,
    delivery_token: params.deliveryToken,
    environment: params.environment,
    live_preview: {
      management_token: params.managementToken,
      enable: true,
      host:
        params.region === "us"
          ? "api.contentstack.io"
          : `${params.region}-api.contentstack.com`,
    },
  });

  // @ts-expect-error All these fields are private, so they're not present in typings, but transpiled JS have it.
  stack.live_preview.live_preview = undefined;
  // @ts-expect-error
  stack.live_preview.content_type_uid = undefined;
  // @ts-expect-error
  stack.live_preview.entry_uid = undefined;

  stack.setHost(
    params.region === "us"
      ? "cdn.contentstack.io"
      : `${params.region}-cdn.contentstack.com`
  );

  if (params.livePreviewQuery) {
    stack.livePreviewQuery(params.livePreviewQuery);
  }

  return {
    async fetchCollectionPageEntryBySlug(slug) {
      try {
        const collectionPageEntry = await stack
          .ContentType("collection_page")
          .Query()
          .where("url", `/category/${slug}`)
          .toJSON()
          .findOne();

        return collectionPageEntry;
      } catch (error) {
        console.error(error);
        return;
      }
    },
    async fetchLandingPageEntryBySlug(slug) {
      try {
        const landingPageEntry = await stack
          .ContentType("landing_page")
          .Query()
          .where("url", `/landing/${slug}`)

          .toJSON()
          .findOne();

        return landingPageEntry;
      } catch (error) {
        console.error(error);
        return;
      }
    },
    async fetchPageEntryBySlug(slug) {
      try {
        const pageEntry = await stack
          .ContentType("page")
          .Query()
          .where("url", `/page/${slug}`)
          .includeReference("blocks")
          .addQuery("include_dimension", "true")
          .toJSON()
          .findOne();

        return pageEntry;
      } catch (error) {
        console.error(error);
        return;
      }
    },
    async fetchHomePageEntry() {
      const homePageEntry = await stack
        .ContentType("homepage")
        .Query()
        .toJSON()
        .findOne();

      return homePageEntry;
    },
  };
}

export { createContentstackClient };
