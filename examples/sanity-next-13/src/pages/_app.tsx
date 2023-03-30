import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "shared/components/Header/Header";
import { Footer } from "shared/components/Footer/Footer";
import { ComponentType } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const noHeaderAndFooter: boolean = Component.noHeaderAndFooter;
  // types from react-modal conflicts with types of react@18
  const ComponentTypedForReact18 = Component as ComponentType;

  if (noHeaderAndFooter) {
    return <ComponentTypedForReact18 {...pageProps} />;
  }

  return (
    <div>
      <Header />
      <div style={{ minHeight: "100vh" }}>
        <ComponentTypedForReact18 {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
