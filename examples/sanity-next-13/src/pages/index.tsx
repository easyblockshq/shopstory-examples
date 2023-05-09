import type { NextPage } from "next";
import { WelcomeSection } from "shared/components/sections/WelcomeSection/WelcomeSection";
import { PageWrapper } from "shared/components/PageWrapper/PageWrapper";

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <WelcomeSection>Welcome to Shopstory + Sanity demo!</WelcomeSection>
    </PageWrapper>
  );
};

export default Home;
