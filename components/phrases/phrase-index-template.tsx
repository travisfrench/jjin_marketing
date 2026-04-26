import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Coffee,
  HandHeart,
  Headphones,
  Hotel,
  MapPinned,
  MessageCircle,
  ShoppingBag,
  Siren,
  Train,
  Utensils,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { QuickPhrasePlayButton } from "@/components/phrases/quick-phrase-play-button";
import { appStoreUrl } from "@/lib/site-config";
import { getPhraseAudioSources } from "@/lib/phrases/phrase-audio";
import { getPhrasePath } from "@/lib/phrases/phrase-data";
import type { PhraseAudioSource, PhraseHub, PhraseRecord } from "@/lib/phrases/types";

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

const categoryIcons: Record<string, ComponentType<{ className?: string }>> = {
  cafe: Coffee,
  courtesy: HandHeart,
  directions: MapPinned,
  emergency: Siren,
  greeting: MessageCircle,
  hotel: Hotel,
  restaurant: Utensils,
  shopping: ShoppingBag,
  transit: Train,
};

const categoryBackgrounds: Record<string, string> = {
  cafe: "/marketing/scenes/jjin-cafe-bg.webp",
  courtesy: "/marketing/about/hanok-village-seoul.webp",
  restaurant: "/marketing/scenes/jjin-kbbq-bg.webp",
  transit: "/marketing/scenes/jjin-subway-bg.webp",
};

function getCategoryIcon(category: string) {
  return categoryIcons[category] ?? Headphones;
}

function HeroPhraseCard({
  phrase,
  audioSources,
}: {
  phrase: PhraseRecord;
  audioSources: PhraseAudioSource[];
}) {
  const [audioSource] = audioSources;

  return (
    <Link
      href={getPhrasePath(phrase)}
      className="group flex items-center gap-4 rounded-2xl border border-white/16 bg-white hover:bg-white/80 p-3 text-neutral-600 shadow-[0_14px_36px_rgba(0,0,0,0.16)] backdrop-blur transition hover:bg-white/16"
    >
      <QuickPhrasePlayButton
        src={audioSource?.src}
        label={`Play audio for ${phrase.englishText}`}
        variant="light"
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-korean text-2xl font-semibold leading-tight">
            {phrase.koreanText}
          </p>
          <p className="mt-1 text-xs text-white/58">{phrase.romanization}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <p className="hidden text-sm font-semibold text-white/86 sm:block">
          {phrase.englishText}
        </p>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function PhrasePreviewCard({ phrase }: { phrase: PhraseRecord }) {
  const [audioSource] = getPhraseAudioSources(phrase);

  return (
    <article className="rounded-2xl border border-white/18 bg-white/60 p-5 shadow-xl backdrop-blur hover:shadow-2xl transition hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-korean text-2xl font-semibold text-neutral-950">
            {phrase.koreanText}
          </p>
          <p className="mt-1 text-sm text-neutral-500">{phrase.romanization}</p>
        </div>

      </div>
      <p className="mt-4 text-base font-semibold text-neutral-900">
        {phrase.englishText}
      </p>
      <div className="mt-5 w-full inline-flex items-center justify-between">
        <Link
          href={getPhrasePath(phrase)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2253D9]"
        >
          Study
          <ArrowRight className="h-4 w-4" />
        </Link>
        <QuickPhrasePlayButton
          src={audioSource?.src}
          label={`Play audio for ${phrase.englishText}`}
        />
      </div>
    </article>
  );
}

export function PhraseIndexTemplate({
  hubs,
  featuredPhrases,
}: {
  hubs: PhraseHub[];
  featuredPhrases: { phrase: PhraseRecord; audioSources: PhraseAudioSource[] }[];
}) {
  const showcaseHubs = ["restaurant", "cafe", "transit", "courtesy"]
    .map((category) => hubs.find((hub) => hub.category === category))
    .filter((hub): hub is PhraseHub => Boolean(hub));

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[linear-gradient(180deg,#F8FAFE_0%,#FFFFFF_34%,#F7F8FB_100%)] text-neutral-950">
        <section className="border-b border-black/8 pt-28 lg:pt-32">
          <SectionShell className="pb-16 sm:pb-20">
            <div className="grid gap-10 lg:grid-cols-[1.02fr,0.98fr] lg:items-center">
              <div className="max-w-3xl">
                <p className="inline-flex rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-neutral-600 shadow-sm">
                  Audio-first Korean phrase library
                </p>
                <h1 className="mt-6 max-w-[12ch] font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
                  Hear Korean phrases before you need them
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
                  Start with a sound, then follow the phrase into useful Korean
                  for greetings, food, transit, shopping, hotels, and everyday
                  moments.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(160deg,rgba(18,24,30,0.98),rgba(32,58,105,0.92)_52%,rgba(139,86,77,0.9))] p-4 shadow-[0_30px_80px_rgba(15,23,42,0.24)] sm:p-5">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,180,101,0.18),transparent_30%)]" />
                <div className="relative mb-4 flex items-center justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/58">
                      Quick play
                    </p>
                    <p className="mt-1 font-heading text-xl font-semibold">
                      Tap, hear, study
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12">
                    <Headphones className="h-5 w-5 text-white/78" />
                  </span>
                </div>
                <div className="relative grid gap-3">
                  {featuredPhrases.map((item) => (
                    <HeroPhraseCard
                      key={item.phrase.slug}
                      phrase={item.phrase}
                      audioSources={item.audioSources}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionShell>
        </section>

        <section className="py-20 sm:py-24">
          <SectionShell>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Browse by situation
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Pick a learning set
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
                  These are some of the most studied phrase groups from a
                  larger practical Korean library in Jjin.
                </p>
              </div>
              <Headphones className="hidden h-10 w-10 text-[#2253D9] sm:block" />
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {hubs.map((hub) => {
                const Icon = getCategoryIcon(hub.category);

                return (
                  <Link
                    key={hub.slug}
                    href={hub.path}
                    className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]"
                  >
                    <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2253D9]">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-2xl font-semibold">
                      {hub.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-neutral-600">
                      {hub.description}
                    </p>
                    </div>
                    <span className="mt-6 inline-flex items-center justify-end gap-2 text-sm font-semibold text-[#2253D9]">
                      Explore set
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </SectionShell>
        </section>

        {showcaseHubs.map((hub) => (
          <section
            key={hub.slug}
            className="relative lg:h-dvh overflow-hidden border-t border-black/8 py-20 sm:py-24"
          >
            <Image
              src={categoryBackgrounds[hub.category] ?? "/marketing/hero/jjin-hero-full-sky.webp"}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-24"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-white/0" />
            <SectionShell className="relative">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                    Continue studying
                  </p>
                  <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                    Start with these {hub.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-800">
                    {hub.description}
                  </p>
                </div>
                <Link
                  href={hub.path}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-blue-800"
                >
                  Browse all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {hub.phrases.slice(0, 4).map((phrase) => (
                  <PhrasePreviewCard key={phrase.slug} phrase={phrase} />
                ))}
              </div>
            </SectionShell>
          </section>
        ))}

        <section className="py-20 sm:py-24">
          <SectionShell>
            <div className="grid gap-8 rounded-[2rem] border border-black/10 bg-[linear-gradient(135deg,#FFFFFF,#EEF4FF_58%,#FFF5EA)] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] md:grid-cols-[1fr,auto] md:items-center sm:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Practice in Jjin
                </p>
                <h2 className="mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Keep Korean audio, Hangul, and meaning together
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
                  Use the phrase library as a starting point, then review the
                  same patterns in short audio-first study loops inside the app.
                </p>
              </div>
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
                aria-label="Download Jjin on the App Store"
              >
                <Image
                  src={appStoreBadgeSrc}
                  alt="Download on the App Store"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </SectionShell>
        </section>
      </main>
      <Footer />
    </>
  );
}
