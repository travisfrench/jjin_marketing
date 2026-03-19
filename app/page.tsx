import { Hero } from "@/components/marketing/hero";
import { SceneSection } from "@/components/marketing/scene-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { AppScreensStrip } from "@/components/marketing/app-screens-strip";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";
import { scenes } from "@/lib/marketing-content";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <SceneSection scenes={scenes} />

        <HowItWorks />
        <AppScreensStrip />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
