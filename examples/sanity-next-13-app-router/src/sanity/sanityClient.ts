import { createClient } from "next-sanity";

const sanityClient = createClient({
  apiVersion: "2023-03-30",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

export { sanityClient };
