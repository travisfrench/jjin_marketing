import Image from "next/image";
import { StudyCard } from "@/components/marketing/study-card";
import { appStoreUrl, heroContent } from "@/lib/marketing-content";

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(214,186,150,0.34),transparent_42%),radial-gradient(circle_at_50%_72%,rgba(168,140,104,0.16),transparent_58%),linear-gradient(180deg,#e9dfd2_0%,#ddd0bf_46%,#cdb9a0_100%)]" />
      <div className="pointer-events-none absolute left-[0%] top-[-12%] h-[42rem] w-[12rem] rotate-[-38deg] bg-[radial-gradient(ellipse_at_top,rgba(205,46,58,0.20)_0%,rgba(205,46,58,0.42)_28%,rgba(205,46,58,0.35)_52%,transparent_12%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[0%] top-[-12%] h-[42rem] w-[12rem] rotate-[38deg] bg-[radial-gradient(ellipse_at_top,rgba(0,71,160,0.20)_0%,rgba(0,71,160,0.42)_28%,rgba(0,71,160,0.35)_52%,transparent_12%)] blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full  items-center px-5 sm:px-8 lg:px-10">
        <div className="relative mx-auto w-full min-h-[100svh]">
          <div className="relative aspect-[1000/667] w-full min-h-[98svh]">
            <Image
              src="/marketing/hero/hero-iphone-jinjja-2.webp"
              alt="Jinjja hero scene showing the app in a Korean street setting"
              fill
              priority
              sizes="92vw"
              className="object-contain mt-20 sm:hidden"
            />
            <Image
              src={heroContent.heroArt}
              alt="Jinjja hero scene showing the app in a Korean street setting"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 1100px"
              className="hidden object-contain mx-auto mt-24 max-w-6xl sm:block"
            />

            <div className="pointer-events-none absolute inset-x-0 top-[8%] z-30 h-[45%] bg-gradient-to-b from-[#E6DCD0] via-[#E6DCD0]/80 to-transparent blur-3xl" />

            <div className="relative flex flex-col gap-2 justify-center items-center z-30 px-2 text-center">
              <div className="inline-flex items-center mb-3 gap-3">
                
                <p className="font-korean text-2xl font-black text-[#CD2E3A]">
                  Jinjja
                </p>
                <Image src="/marketing/hero/south-korea-flag.png" alt="Flag of South Korea" width={40} height={20} />
              </div>
              <p className="inline-flex rounded-full border border-slate-600/20 bg-slate-600/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-neutral-700/80">
                {heroContent.eyebrow}
              </p>
              <h1 className="mx-auto mt-4 max-w-[14ch] font-heading text-4xl font-semibold leading-[1.02] text-neutral-700 sm:text-5xl lg:text-[3.5rem]">
                {heroContent.title}
              </h1>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-800 font-medium sm:mt-4 sm:text-lg">
                {heroContent.description}
              </p>
            </div>

            <div className="absolute left-1/2 top-[36%] z-50 w-[46%] max-w-[16rem] -translate-x-1/2 sm:top-[34%] sm:w-[31%] sm:max-w-[18rem]">
              <StudyCard
                variant="hero"
                label="Basics"
                phrase="안녕하세요"
                romanization="annyeonghaseyo"
                meaning="Hello"
                audioSrc="/marketing/audio/hello.wav"
                audioLabel="Play hello phrase audio"
                pills={["First phrase", "Everyday", "Speak"]}
                className="border-white/20 bg-[linear-gradient(160deg,rgba(18,24,30,0.94),rgba(7,9,13,0.92))] p-3 sm:p-4"
              />
            </div>

            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-[12%] left-1/2 z-20 inline-flex -translate-x-1/2 transition hover:opacity-90 sm:bottom-[9%]"
              aria-label="Download Jinjja from the App Store"
            >
              <Image
                src={appStoreBadgeSrc}
                alt="Download on the App Store"
                width={180}
                height={60}
                className="h-11 w-auto sm:h-12"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
