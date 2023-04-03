import type { NextPage } from "next";
import { Canvas } from "@shopstory/react";
import { shopstoryConfig } from "../src/shopstory/config";
import { DemoShopstoryProvider } from "../src/shopstory/provider";

const ShopstoryCanvasPage: NextPage = () => {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryConfig} />
    </DemoShopstoryProvider>
  );
};

// @ts-ignore
ShopstoryCanvasPage.noHeaderAndFooter = true;

export default ShopstoryCanvasPage;
