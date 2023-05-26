"use client";
import { Canvas } from "@shopstory/react";
import { shopstoryConfig } from "../../shopstory/config";
import { DemoShopstoryProvider } from "../../shopstory/provider";

function ShopstoryCanvasPage() {
  return (
    <DemoShopstoryProvider>
      <Canvas config={shopstoryConfig} />
    </DemoShopstoryProvider>
  );
}

export default ShopstoryCanvasPage;
