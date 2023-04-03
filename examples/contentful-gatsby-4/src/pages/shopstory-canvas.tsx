import { DemoShopstoryProvider } from "../shopstory/Provider";
import { Canvas } from "@shopstory/react";
import React from "react";
import { shopstoryConfig } from "../shopstory/config";

function ShopstoryCanvasPage() {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryConfig} />
    </DemoShopstoryProvider>
  );
}

export default ShopstoryCanvasPage;
