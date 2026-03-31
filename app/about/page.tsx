import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Ear,
  NotebookPen,
  Route,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { StudyCard } from "@/components/marketing/study-card";
import { JsonLd } from "@/components/seo/json-ld";
import { appStoreUrl, howItWorksItems, scenes } from "@/lib/marketing-content";
import { buildBreadcrumbSchema, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Jjin | Korean Learning App Story",
  description:
    "Learn how Jjin was shaped by real-life Korean conversations in cafes, transit, restaurants, and family visits in Korea.",
  path: "/about",
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

const fieldNotes = [
  {
    icon: NotebookPen,
    title: "Track what actually comes up",
    copy: "I kept a running list of phrases I needed in cafes, on transit, and in quick daily interactions.",
  },
  {
    icon: Ear,
    title: "Design for hearing before speaking",
    copy: "Fast conversations break confidence first. Listening loops became the core of the app.",
  },
  {
    icon: Route,
    title: "Ship around real moments",
    copy: "Every lesson is mapped to situations that happen often, not topics that only look complete on paper.",
  },
];

const momentCards = scenes.slice(0, 4);
const momentShowcaseImages = [
  {
    src: "/marketing/about/sundae-seoul.webp",
    alt: "Korean food moment in Seoul",
  },
  {
    src: "/marketing/about/cafe-seoul-insadong.webp",
    alt: "Library interior in Seoul",
  },
  {
    src: "/marketing/about/subway-station-seoul.webp",
    alt: "Subway station in Seoul",
  },
  {
    src: "/marketing/about/hanok-village-seoul.webp",
    alt: "Hanok village street in Seoul",
  },
];

function MomentShowcase() {
  return (
    <section className="relative border-y border-[#CEB8A4] bg-[linear-gradient(180deg,#E5D2C0_0%,#E9DACA_45%,#E4D1BE_100%)] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.65),transparent_33%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.4),transparent_30%)]" />
      <SectionShell>
        <div className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8B694E]">Built in real life</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#1F1712] sm:text-5xl">
              The exact moments that shaped Jjin
            </h2>
            <p className="mt-5 text-base leading-7 text-[#3E3024] sm:text-lg">
              These are not abstract lesson themes. They are the interactions that kept repeating, so they became the
              foundation of the app.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-7">
            {momentCards.map((scene, index) => {
              const showcaseImage = momentShowcaseImages[index] ?? {
                src: scene.image,
                alt: `${scene.label} scene in Korea`,
              };

              return (
                <article
                  key={scene.id}
                  className="relative overflow-hidden rounded-[1.6rem] border border-[#C6A586] bg-[linear-gradient(165deg,#F8EEDG,#EEDBC9)] p-3 shadow-[0_16px_36px_rgba(56,34,17,0.14)] sm:p-4"
                >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] sm:aspect-[16/10]">
                  <Image
                    src={showcaseImage.src}
                    alt={showcaseImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,16,11,0)_42%,rgba(23,16,11,0.32)_100%)]" />
                  <div className="absolute left-3 top-3 rounded-full border border-[#E8D3C0] bg-[#F5E6D8]/90 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#5A4433]">
                    {scene.label}
                  </div>
                </div>

                <div className="mt-3 sm:mt-4">
                  <StudyCard
                    variant="hero"
                    label={scene.label}
                    phrase={scene.phrase}
                    romanization={scene.romanization}
                    meaning={scene.meaning}
                    pills={scene.pills}
                    audioSrc={scene.audio}
                    audioLabel={`Play ${scene.label} phrase audio`}
                    className="max-w-none rounded-[1.2rem] border-[#B58D6B]/45 bg-[linear-gradient(160deg,rgba(63,45,33,0.96),rgba(90,60,44,0.93))] p-4 sm:p-4"
                  />
                </div>
                </article>
              );
            })}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navbar />
      <main className="relative overflow-hidden border-t border-[#CEB8A4] bg-[linear-gradient(180deg,#F1E5DA_0%,#EADBCD_38%,#F3E9DF_100%)] pt-24 text-[#1E1712]">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.75),transparent_36%),radial-gradient(circle_at_80%_5%,rgba(235,191,149,0.38),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(192,155,121,0.22),transparent_40%)]" />

        <section className="relative pb-12 pt-6 sm:pb-20 sm:pt-10">
          <SectionShell>
            <div className="grid items-start gap-10 lg:grid-cols-[1.08fr,1fr]">
              <div className="relative z-10">
                <p className="inline-flex rounded-full border border-[#C29D7D] bg-[#F4E5D6]/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#88664A]">
                  About Jjin
                </p>
                <h1 className="mt-5 max-w-[14ch] font-heading text-4xl font-semibold leading-[1.04] sm:text-6xl">
                  I built Jjin to talk with family in Korea
                </h1>
                <div className="mt-6 max-w-xl space-y-4 text-base leading-7 text-[#3D2F23] sm:text-lg">
                  <p>
                    Jjin started as a personal fix. I wanted to stop freezing in everyday Korean moments and start
                    responding with more confidence.
                  </p>
                  <p>
                    The apps I tried felt broad, game-like, or too classroom-first. They did not match the pressure of
                    real conversations, so I built the one I wanted to use every day.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#2A2018] bg-[#2D221A] px-5 py-3 text-sm font-semibold text-[#F8EBDC] transition hover:bg-[#1E1712]"
                  >
                    Get Jjin on iOS
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#real-moments"
                    className="inline-flex items-center rounded-full border border-[#B28E72] bg-[#F7ECDD]/80 px-5 py-3 text-sm font-semibold text-[#3A2C20] transition hover:bg-white"
                  >
                    Hear Real Phrase Cards
                  </a>
                </div>
              </div>

              <div className="relative lg:pt-2">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#B89579] bg-[#DCC6AF] p-3 shadow-[0_30px_60px_rgba(71,44,25,0.2)]">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem]">
                    <Image
                      src="/marketing/about/hangul-statue-seoul.webp"
                      alt="Jjin founder story visual in a Korea street setting"
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,15,0)_30%,rgba(10,12,15,0.55)_100%)]" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-3xl border border-[#BA977A] bg-[#F2E3D3] p-2 shadow-[0_20px_40px_rgba(71,44,25,0.14)]">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                      <Image
                        src="/marketing/about/gwangju-walking-night.webp"
                        alt="Visiting Lotte Tower"
                        fill
                        sizes="(max-width: 1024px) 45vw, 18vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-3xl border border-[#BA977A] bg-[#F2E3D3] p-2 shadow-[0_20px_40px_rgba(71,44,25,0.14)]">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                      <Image
                        src="/marketing/about/starfield-coex-library.webp"
                        alt="Cafe moment in Korea"
                        fill
                        sizes="(max-width: 1024px) 45vw, 18vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </SectionShell>
        </section>

        <section className="relative py-14 sm:py-24">
          <SectionShell>
            <div className="grid gap-9 lg:grid-cols-[1fr,1.05fr] lg:items-center">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#BD9A7E] bg-[#1D232D] p-3 shadow-[0_25px_50px_rgba(60,36,18,0.2)]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                  <Image
                    src="/marketing/about/family-flowers-gwangju.webp"
                    alt="Subway moment in Korea"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,15,0.2)_0%,rgba(8,11,15,0.68)_100%)]" />
                </div>
                <div className="hidden absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/35 p-4 text-white/90 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/80">What was missing</p>
                  <p className="mt-2 text-sm leading-6 sm:text-base">
                    Most apps gave me points and streaks. I needed phrases I could actually use when I was moving fast,
                    listening hard, and trying to connect.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8B694E]">Field-tested in Korea</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-5xl">
                  A month in Korea changed the product roadmap
                </h2>
                <p className="mt-5 text-base leading-7 text-[#3E3024] sm:text-lg">
                  I spent a month in Korea tracking the phrases that came up over and over, where hesitation happened,
                  and what was actually useful. That cut the filler and sharpened the app around practical listening and
                  speaking confidence.
                </p>

                
              </div>
              
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {fieldNotes.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.title}
                        className="rounded-3xl border border-[#C5A789] bg-[#F8EEDF]/90 p-5 shadow-[0_14px_30px_rgba(67,43,24,0.08)]"
                      >
                        <Icon className="h-5 w-5 text-[#7E5E44]" />
                        <h3 className="mt-3 font-heading text-lg font-semibold text-[#231A14]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#473729]">{item.copy}</p>
                      </article>
                    );
                  })}
                </div>
          </SectionShell>
        </section>

        <MomentShowcase />

        <section id="real-moments" className="relative py-16 sm:py-24">
          <SectionShell>
            <div className="grid gap-8 lg:grid-cols-[1fr,0.95fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8B694E]">Why this works</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-5xl">
                  Personal scope. Clear purpose. No fake fluency promises.
                </h2>
                <p className="mt-5 text-base leading-7 text-[#3E3024] sm:text-lg">
                  Jjin is intentionally focused. It is for practical phrases, listening-first practice, and confidence
                  in everyday situations. That narrow scope is the point, and it keeps the app honest.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {howItWorksItems.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-[#C0A184] bg-[#F8EEDF]/85 p-4 text-center"
                    >
                      <p className="font-heading text-4xl font-semibold leading-none text-[#5D4634]">{item.stat}</p>
                      <p className="mt-2 text-sm font-semibold text-[#2D2118]">{item.title}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#BA977B] bg-[#DFCCB9] p-3 shadow-[0_24px_50px_rgba(62,38,20,0.2)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
                    <Image
                      src="/marketing/about/lotte-tower-outside.webp"
                      alt="Daily Korea basics environment"
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,11,0.05)_20%,rgba(7,9,11,0.6)_100%)]" />
                  </div>
                </div>

                <div className="absolute -left-3 -top-3 rounded-2xl border border-[#B28F73] bg-[#F9EEDC] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#7D5D43] shadow-lg sm:-left-6 sm:-top-6">
                  built from lived experience
                </div>
                <div className="absolute -bottom-4 -right-2 rounded-2xl border border-[#AB886D] bg-[#2D2219] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#F0E3D3] shadow-lg sm:-bottom-5 sm:-right-5">
                  listening first
                </div>
              </div>
            </div>
          </SectionShell>
        </section>

        <section className="relative pb-16 sm:pb-24">
          <SectionShell>
            <div className="relative overflow-hidden rounded-[2.1rem] border border-[#9D7D63] bg-[#261B13] p-8 text-[#F5E8D9] shadow-[0_28px_60px_rgba(46,28,15,0.38)] sm:p-12">
              <div className="absolute inset-0">
                <Image
                  src="/marketing/scenes/jjin-hotel-bg.webp"
                  alt="Korea evening scene"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(19,13,9,0.9),rgba(41,27,16,0.82))]" />
              </div>

              <div className="relative z-10 max-w-3xl">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D7B696]">
                  <Sparkles className="h-4 w-4" />
                  Founder note
                </p>
                <p className="mt-5 text-lg leading-8 sm:text-2xl sm:leading-10">
                  I am building Jjin for the same reason I started it: to feel more connected in Korea, not more
                  academic. If that is what you want too, this app was made for you.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#E9D2BA]/75 bg-[#F5E4D2] px-5 py-3 text-sm font-semibold text-[#2A2018] transition hover:bg-white"
                  >
                    Download Jjin
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-full border border-[#C19B7D]/65 px-5 py-3 text-sm font-semibold text-[#F5E8D9] transition hover:bg-white/10"
                  >
                    Back to homepage
                  </Link>
                </div>

                <div className="mt-9 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-[#D4B090]">
                  <span className="rounded-full border border-[#B59072]/70 px-3 py-1">real Korea moments</span>
                  <span className="rounded-full border border-[#B59072]/70 px-3 py-1">practical phrases</span>
                  <span className="rounded-full border border-[#B59072]/70 px-3 py-1">confidence in everyday situations</span>
                </div>
              </div>
            </div>
          </SectionShell>
        </section>
      </main>
      <Footer />
    </>
  );
}
