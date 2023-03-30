import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

import { shopstoryGetStyleTag } from "@shopstory/react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>{shopstoryGetStyleTag()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
