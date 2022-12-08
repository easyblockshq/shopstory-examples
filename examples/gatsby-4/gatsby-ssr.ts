import { shopstoryGetStyleTag } from "@shopstory/core/react";
import { PreRenderHTMLArgs } from "gatsby";
import { cloneElement } from "react";
import { wrapPageElement } from "./gatsby-browser";

export function onPreRenderHTML({
  getHeadComponents,
  replaceHeadComponents,
}: PreRenderHTMLArgs) {
  const headComponents = getHeadComponents();
  const shopstoryStyleTagElement = shopstoryGetStyleTag();

  headComponents.push(
    cloneElement(shopstoryStyleTagElement, {
      key: "shopstory-styles",
    })
  );

  replaceHeadComponents(headComponents);
}

export { wrapPageElement };
