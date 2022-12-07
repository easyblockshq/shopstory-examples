import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Header} from "../../shared/components/Header/Header";
import {Footer} from "../../shared/components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {

  // @ts-ignore
  const noHeaderAndFooter: boolean = Component.noHeaderAndFooter;

  if (noHeaderAndFooter) {
    return <Component {...pageProps} />;
  }

  return <div>
    <Header />
    <div style={{minHeight: "100vh"}}>
      <Component {...pageProps} />
    </div>
    <Footer />
  </div>
}

export default MyApp
