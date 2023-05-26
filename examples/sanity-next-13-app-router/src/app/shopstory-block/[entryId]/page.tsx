import { ShopstoryClient } from "@shopstory/core";
import { draftMode } from "next/headers";
import { PageWrapper } from "shared/components/PageWrapper/PageWrapper";
import { sanityClient } from "../../../sanity/sanityClient";
import { ShopstoryContent } from "../../../shopstory/ShopstoryContent";
import { shopstoryConfig } from "../../../shopstory/config";
import { DemoShopstoryProvider } from "../../../shopstory/provider";

export default async function ShopstoryBlockPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const { isEnabled } = draftMode();

  const rawContent = await fetchShopstoryContentJSONFromCMS(
    params.entryId,
    "en",
    isEnabled
  );

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: "en",
    sanity: { preview: isEnabled },
  });
  const renderableContent = shopstoryClient.add(rawContent);
  const meta = await shopstoryClient.build();

  return (
    <PageWrapper>
      <DemoShopstoryProvider>
        <ShopstoryContent content={renderableContent} meta={meta} />
      </DemoShopstoryProvider>
    </PageWrapper>
  );
}

async function fetchShopstoryContentJSONFromCMS(
  entryId: string,
  locale: string,
  preview: boolean
) {
  const entryIdQuery =
    preview && !entryId.startsWith("drafts.") ? `drafts.${entryId}` : entryId;

  const documents = await sanityClient.fetch(
    `*[_id == "${entryIdQuery}"]{"content": content.${locale}}`
  );

  return documents[0].content;
}
