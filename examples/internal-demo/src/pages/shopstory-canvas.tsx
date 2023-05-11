import { Canvas } from "@shopstory/react";
import type { NextPage } from "next";
import { shopstoryConfig } from "../shopstory/config";
import { DemoShopstoryProvider } from "../shopstory/provider";
import React from "react";

const ShopstoryCanvasPage: NextPage = () => {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryConfig} />
    </DemoShopstoryProvider>
  );
};

// @ts-expect-error
ShopstoryCanvasPage.noHeaderAndFooter = true;

export default ShopstoryCanvasPage;
