import type { AppProps } from "next/app";
// import { useEffect } from "react";
// import { setAppElement } from "react-modal";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { Footer } from "shared/components/common/Footer/Footer";
import { Header } from "shared/components/common/Header/Header";
import "shared/styles/globals.css";
import "../public/fonts/style.css";
import { contentstackParams } from "../src/contentstackParams";
import "../styles/global.css";

ContentstackLivePreview.init({
  enable: true,
  ssr: true,
  stackDetails: {
    apiKey: contentstackParams.apiKey,
  },
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{ noHeaderAndFooter?: boolean }>) {
  // useEffect(() => {
  //   setAppElement("#modalContainer");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const pageContent = <Component {...pageProps} />;

  return (
    <div id="shopstory-example">
      {!pageProps.noHeaderAndFooter && (
        <>
          <Header />
          {pageContent}
          <Footer />
        </>
      )}

      {pageProps.noHeaderAndFooter && pageContent}

      {/* <div id={"modalContainer"} /> */}
      <div id={"toastContainer"} />
    </div>
  );
}

export default MyApp;
