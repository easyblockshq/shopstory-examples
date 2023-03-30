import type { AppProps } from "next/app";
// import { setAppElement } from "react-modal";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Footer } from "shared/components/Footer/Footer";
import { Header } from "shared/components/Header/Header";
import "shared/styles/globals.css";
import "../public/fonts/style.css";
import "../styles/global.css";

import { contentstackParams } from "../src/contentstackParams";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ noHeaderAndFooter?: boolean }>) {
  const router = useRouter();

  // useEffect(() => {
  //   setAppElement("#modalContainer");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const pageContent = <Component {...pageProps} />;

  useEffect(() => {
    ContentstackLivePreview.init({
      ssr: false,
      stackDetails: {
        apiKey: contentstackParams.apiKey,
      },
    })?.then((livePreview) => {
      livePreview?.setOnChangeCallback(() => {
        const { hash, content_type_uid, entry_uid } =
          // @ts-ignore `config` is a private property, but we can access it in transpiled code.
          livePreview?.config.stackSdk.live_preview;

        if (hash && content_type_uid && entry_uid) {
          const livePreviewQueryParams = new URLSearchParams();
          livePreviewQueryParams.append("live_preview", hash);
          livePreviewQueryParams.append("content_type_uid", content_type_uid);
          livePreviewQueryParams.append("entry_uid", entry_uid);

          router.replace(
            `${window.location.pathname}?${livePreviewQueryParams.toString()}`,
            undefined,
            {
              scroll: false,
            }
          );
        }
      });
    });
  }, [router]);

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
