import type { AppProps } from "next/app";
import { MockHeader } from "shared/components/MockHeader/MockHeader";
import { MockFooter } from "shared/components/MockFooter/MockFooter";
import "shared/styles/globals.css";
import "../public/fonts/style.css";

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const noHeaderAndFooter: boolean = Component.noHeaderAndFooter;

  if (noHeaderAndFooter) {
    return <Component {...pageProps} />;
  }

  return (
    <div>
      <MockHeader />
      <div style={{ minHeight: "100vh" }}>
        <Component {...pageProps} />
      </div>
      <MockFooter />
    </div>
  );
}

export default MyApp;
