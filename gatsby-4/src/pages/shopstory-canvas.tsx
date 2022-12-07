import { DemoShopstoryProvider } from "../shopstory/Provider";
import { Canvas } from "@shopstory/core/react";
import React from "react";
import { shopstoryConfig } from "../../../shared/shopstory/config";

function ShopstoryCanvasPage() {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryConfig} />
    </DemoShopstoryProvider>
  );
}

export default ShopstoryCanvasPage;
