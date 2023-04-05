import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import Head from "next/head";
import config from "../../sanity/sanity.config";

export default function StudioPage() {
  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <NextStudio config={config} />
    </>
  );
}

StudioPage.noHeaderAndFooter = true;
