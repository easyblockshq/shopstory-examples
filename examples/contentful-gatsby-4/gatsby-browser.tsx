import { WrapPageElementBrowserArgs } from "gatsby";
import React, { Fragment } from "react";
import { Footer } from "./src/components/Footer/Footer";
import { Header } from "./src/components/Header/Header";
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
      <Header />
      <div style={{ minHeight: "100vh" }}>{element}</div>
      <Footer />
    </Fragment>
  );
}
