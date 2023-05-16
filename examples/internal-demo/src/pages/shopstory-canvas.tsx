import type { Config, Template } from "@shopstory/core";
import { Canvas } from "@shopstory/react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { shopstoryConfig } from "../shopstory/config";
import { getNoomaTemplates } from "../shopstory/getNoomaTemplates";
import { DemoShopstoryProvider } from "../shopstory/provider";

const ShopstoryCanvasPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <DemoShopstoryProvider>
      <Canvas config={addTemplates(shopstoryConfig, props.templates)} />
    </DemoShopstoryProvider>
  );
};

// @ts-expect-error
ShopstoryCanvasPage.noHeaderAndFooter = true;

const getStaticProps: GetStaticProps<{
  templates: Awaited<ReturnType<typeof getNoomaTemplates>>;
}> = async () => {
  const templates = await getNoomaTemplates();

  return {
    props: {
      templates,
    },
  };
};

export default ShopstoryCanvasPage;
export { getStaticProps };

function addTemplates(
  config: Config,
  templates: InferGetStaticPropsType<typeof getStaticProps>["templates"]
) {
  return {
    ...config,
    unstable_templates: [
      ...(config.unstable_templates ?? []),
      ...templates.cardTemplates?.map((t): Template => {
        return {
          type: "Card",
          label: t.label,
          config: t.config,
          previewImage: t.previewImageUrl,
        };
      }),
      ...templates.sectionTemplates?.map((t): Template => {
        return {
          type: "Section",
          label: t.label,
          config: t.config,
          previewImage: t.previewImageUrl,
        };
      }),
    ],
  };
}
