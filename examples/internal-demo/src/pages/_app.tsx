import type { AppProps } from "next/app";
import { Header } from "shared/components/Header/Header";
import { Footer } from "shared/components/Footer/Footer";
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
      <Footer />
    </div>
  );
}

export default MyApp;
