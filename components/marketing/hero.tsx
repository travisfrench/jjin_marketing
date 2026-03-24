import Image from "next/image";
import { StudyCard } from "@/components/marketing/study-card";
import { appStoreUrl, heroContent } from "@/lib/marketing-content";

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src="/marketing/hero/jinjja-hero-mobile-sky.webp"
        alt="Jinjja hero scene showing the app in a Korean street setting"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center sm:hidden"
      />
      <Image
        src={heroContent.heroArt}
        alt="Jinjja hero scene showing the app in a Korean street setting"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center sm:block"
      />

      <div className="hidden absolute z-20 top-4 left-8 mb-3 sm:inline-flex items-center gap-3">
        <p className="font-korean text-2xl font-black text-neutral-900">Jinjja</p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[58svh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.88)_0%,rgba(239,246,255,0.72)_28%,rgba(255,255,255,0.34)_52%,transparent_76%)]" />

      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full items-center px-2 sm:px-8 lg:px-10">
        <div className="relative mx-auto flex min-h-[100svh] w-full flex-col items-center">
          <div className="relative flex flex-col items-center justify-start gap-2 pt-8 text-center sm:pt-10">
            <div className="sm:hidden mb-3 inline-flex items-center gap-3">
              <p className="font-korean text-2xl font-black text-neutral-900">Jinjja</p>
            </div>
            <p className="inline-flex rounded-full border border-blue-600/50 bg-blue-600/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-neutral-700">
              {heroContent.eyebrow}
            </p>
            <h1 className="mx-auto mt-4 max-w-[14ch] font-heading text-4xl font-semibold leading-[1.02] text-neutral-900 sm:text-5xl lg:text-[3.5rem]">
              {heroContent.title}
            </h1>
            <p className="mx-auto max-w-2xl text-sm font-medium text-neutral-800 sm:text-lg">
              {heroContent.description}
            </p>
          </div>

          <div className="absolute left-1/2 top-[36%] z-30 w-[90%] max-w-[18rem] -translate-x-1/2 sm:top-[40%] sm:w-[50%] sm:max-w-[23rem]">
            <StudyCard
              variant="hero"
              label="Basics"
              phrase="안녕하세요"
              romanization="annyeonghaseyo"
              meaning="Hello (polite)"
              audioSrc="/marketing/audio/hello.wav"
              audioLabel="Play hello phrase audio"
              pills={["First phrase", "Everyday", "Essentials"]}
              className="border-white/20 bg-[linear-gradient(160deg,rgba(18,24,30,0.94),rgba(7,9,13,0.92))] p-3 sm:p-4"
            />
          </div>

          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-[12%] left-1/2 z-30 inline-flex -translate-x-1/2 transition hover:opacity-90 sm:bottom-[12%]"
            aria-label="Download Jinjja from the App Store"
          >
            <p className="rounded-md border border-black/70 bg-white px-3 py-2 text-center text-md font-semibold text-black shadow-lg">
              iOS App Available Soon!
            </p>
            <Image
              src={appStoreBadgeSrc}
              alt="Download on the App Store"
              width={180}
              height={60}
              className="hidden h-11 w-auto sm:h-12"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
