import { Canvas } from "@shopstory/core/react";
import type { NextPage } from "next";
import { shopstoryConfig } from "../src/shopstory/config";
import { DemoShopstoryProvider } from "../src/shopstory/provider";

const ShopstoryCanvasPage: NextPage = () => {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryConfig} />
    </DemoShopstoryProvider>
  );
};

export async function getStaticProps() {
  return {
    props: {
      noHeaderAndFooter: true,
    },
  };
}

export default ShopstoryCanvasPage;
