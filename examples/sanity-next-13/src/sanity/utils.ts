import fetchCollectionByHandle from "shared/data/shopify/fetchCollectionByHandle";

function previewFilter(preview: boolean | undefined) {
  return preview ? "" : '&& !(_id in path("drafts.**"))';
}

async function mapBlockDocumentToSectionProps(document: Record<string, any>) {
  if (document._type === "block_banner") {
    return {
      type: "block_banner" as const,
      props: {
        description: document.description,
        title: document.title,
        ...(document.buttonLabel && {
          button: { label: document.buttonLabel, url: document.buttonLink },
        }),
        ...(document.image && {
          image: {
            src: document.image.asset.url,
            title: document.image.asset.altText ?? document.image.asset.title,
          },
        }),
      },
    };
  } else if (document._type === "block_productsGrid") {
    const collection = await fetchCollectionByHandle(document.collection);

    return {
      type: "block_productsGrid" as const,
      props: {
        title: document.title,
        products: collection?.products.slice(0, document.maxItems ?? 12),
      },
    };
  } else if (document._type === "block_twoColumns") {
    return {
      type: "block_twoColumns" as const,
      props: {
        leftText: document.leftText,
        rightText: document.rightText,
        ...(document.buttonLabel && {
          button: {
            label: document.buttonLabel,
            url: document.buttonLink,
          },
        }),
      },
    };
  } else {
    throw new Error(`Unknown block document ${document._type}`);
  }
}

export { mapBlockDocumentToSectionProps, previewFilter };
