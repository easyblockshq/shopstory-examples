import type { AppProps } from "next/app";
import { Header } from "shared/components/Header/Header";
import { MockFooter } from "shared/components/MockFooter/MockFooter";
import "shared/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const noHeaderAndFooter: boolean = Component.noHeaderAndFooter;

  if (noHeaderAndFooter) {
    return <Component {...pageProps} />;
  }

  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <MockFooter />
    </div>
  );
}

export default MyApp;
