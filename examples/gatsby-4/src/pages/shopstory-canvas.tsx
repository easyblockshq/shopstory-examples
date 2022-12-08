import { DemoShopstoryProvider } from "../shopstory/Provider";
import { Canvas } from "@shopstory/core/react";
import React from "react";
import { shopstoryBaseConfig } from "shared/shopstory/config";

function ShopstoryCanvasPage() {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryBaseConfig} />
    </DemoShopstoryProvider>
  );
}

export default ShopstoryCanvasPage;
