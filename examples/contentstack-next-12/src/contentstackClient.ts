import { type Region } from "contentstack";
import { Stack } from "./stack";

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

const contentstackClient: ContentstackClient = {
  async fetchCollectionPageEntryBySlug(slug) {
    try {
      const collectionPageEntry = await Stack.ContentType("collection_page")
        .Query()
        .where("url", `/${slug}`)
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
      const landingPageEntry = await Stack.ContentType("landing_page")
        .Query()
        .where("url", `/${slug}`)

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
      const pageEntry = await Stack.ContentType("page")
        .Query()
        .where("url", `/${slug}`)
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
    const homePageEntry = await Stack.ContentType("homepage").Entry(
      "bltb22d3fe3206e3ba9"
    );

    return homePageEntry.toJSON().fetch();
  },
};

export { contentstackClient };
