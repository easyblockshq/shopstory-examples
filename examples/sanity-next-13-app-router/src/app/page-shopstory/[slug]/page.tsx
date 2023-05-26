import { ShopstoryClient } from "@shopstory/core";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { PageWrapper } from "shared/components/PageWrapper/PageWrapper";
import { sanityClient } from "../../../sanity/sanityClient";
import { previewFilter } from "../../../sanity/utils";
import { ShopstoryContent } from "../../../shopstory/ShopstoryContent";
import { shopstoryConfig } from "../../../shopstory/config";
import { DemoShopstoryProvider } from "../../../shopstory/provider";

type PageShopstoryProjection = {
  title: string;
  content: string;
};

export default async function PageShopstory({
  params,
}: {
  params: Record<string, string>;
}) {
  const { isEnabled } = draftMode();

  const document = await sanityClient.fetch<PageShopstoryProjection>(
    `*[_type == "pageShopstory" && slug.current == "${params.slug}"
      ${previewFilter(
        isEnabled
      )}] | order(_updatedAt desc) [0] {title, "content": content.${"en"}}`
  );

  if (!document) {
    notFound();
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: "en",
    sanity: { preview: true },
  });
  const renderableContent = shopstoryClient.add(document.content);
  const meta = await shopstoryClient.build();

  return (
    <PageWrapper>
      <DemoShopstoryProvider>
        <ShopstoryContent content={renderableContent} meta={meta} />
      </DemoShopstoryProvider>
    </PageWrapper>
  );
}
