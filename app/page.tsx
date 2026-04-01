import { Hero } from "@/components/marketing/hero";
import { SceneSection } from "@/components/marketing/scene-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { AppScreensStrip } from "@/components/marketing/app-screens-strip";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";
import {
  ExploreLandingPagesSection,
  FounderPerspectiveSection,
  HomepageFaqSection,
} from "@/components/marketing/landing-content";
import { scenes } from "@/lib/marketing-content";
import { Navbar } from "@/components/marketing/navbar";

export default function HomePage() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <SceneSection scenes={scenes} />

        <HowItWorks />
        <AppScreensStrip />
        <ExploreLandingPagesSection />
        <FounderPerspectiveSection />
        <HomepageFaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
