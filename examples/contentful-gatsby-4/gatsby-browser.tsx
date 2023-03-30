import { WrapPageElementBrowserArgs } from "gatsby";
import React, { Fragment } from "react";
import { MockFooter } from "shared/components/MockFooter/MockFooter";
import { MockHeader } from "shared/components/MockHeader/MockHeader";
import "./src/styles/globals.css";

export function wrapPageElement({
  element,
  props,
}: WrapPageElementBrowserArgs) {
  if (props.location.pathname.includes("shopstory-canvas")) {
    return element;
  }

  return (
    <Fragment>
      <MockHeader />
      <div style={{ minHeight: "100vh" }}>{element}</div>
      <MockFooter />
    </Fragment>
  );
}
