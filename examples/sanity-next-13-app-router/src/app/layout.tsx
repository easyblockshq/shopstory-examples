"use client";
import { shopstoryGetStyleTag } from "@shopstory/react";
import { usePathname, useServerInsertedHTML } from "next/navigation";
import { Footer } from "shared/components/Footer/Footer";
import { Header } from "shared/components/Header/Header";
import "shared/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useServerInsertedHTML(() => {
    return shopstoryGetStyleTag();
  });

  const isHeaderAndFooterVisible =
    pathname !== "/shopstory-canvas" && !pathname.startsWith("/studio");

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#f0fb98"
        ></link>
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body>
        {isHeaderAndFooterVisible && <Header />}
        {children}
        {isHeaderAndFooterVisible && <Footer />}
      </body>
    </html>
  );
}
