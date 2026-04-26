import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Headphones } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { QuickPhrasePlayButton } from "@/components/phrases/quick-phrase-play-button";
import { appStoreUrl } from "@/lib/site-config";
import { getPhraseAudioSources } from "@/lib/phrases/phrase-audio";
import { getPhrasePath } from "@/lib/phrases/phrase-data";
import type { PhraseHub, PhraseRecord } from "@/lib/phrases/types";

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

function PhraseListCard({ phrase }: { phrase: PhraseRecord }) {
  const [audioSource] = getPhraseAudioSources(phrase);

  return (
    <article className="relative group rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2253D9]">
            {phrase.difficulty}
          </span>
          <p className="mt-4 font-korean text-2xl font-semibold text-neutral-950">
            {phrase.koreanText}
          </p>
          <p className="mt-1 text-sm text-neutral-500">{phrase.romanization}</p>
        </div>
        <div className="absolute top-5 right-5">
          <QuickPhrasePlayButton
            src={audioSource?.src}
            label={`Play audio for ${phrase.englishText}`}
          />
        </div>
      </div>
      <p className="mt-4 min-h-14 text-lg font-semibold text-neutral-900">
        {phrase.englishText}
      </p>
      <div className="flex items-center justify-between gap-4">
        <Link
          href={getPhrasePath(phrase)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2253D9]"
        >
          Study
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function ExamplePhraseCard({ phrase }: { phrase?: PhraseRecord }) {
  if (!phrase) return null;

  const [audioSource] = getPhraseAudioSources(phrase);

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(160deg,rgba(18,24,30,0.98),rgba(32,58,105,0.92)_52%,rgba(139,86,77,0.9))] p-5 text-white shadow-[0_30px_80px_rgba(15,23,42,0.24)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,180,101,0.18),transparent_30%)]" />
      <div className="relative flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/58">
          Start here
        </p>
        <QuickPhrasePlayButton
          src={audioSource?.src}
          label={`Play audio for ${phrase.englishText}`}
          variant="dark"
        />
      </div>
      <p className="relative mt-8 font-korean text-5xl font-semibold leading-tight">
        {phrase.koreanText}
      </p>
      <p className="relative mt-3 text-sm text-white/62">{phrase.romanization}</p>
      <p className="relative mt-4 text-2xl font-semibold">{phrase.englishText}</p>
      <Link
        href={getPhrasePath(phrase)}
        className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
      >
        Study this phrase
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

function CategoryCard({ hub }: { hub: PhraseHub }) {
  return (
    <Link
      href={hub.path}
      className="group rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]"
    >
      <Compass className="h-6 w-6 text-[#2253D9]" />
      <h3 className="mt-5 font-heading text-2xl font-semibold text-neutral-950">
        {hub.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{hub.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2253D9]">
        Browse set
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function PhraseHubTemplate({
  hub,
  relatedHubs,
}: {
  hub: PhraseHub;
  relatedHubs: PhraseHub[];
}) {
  const primaryPhrases = hub.indexablePhrases.length >= 3 ? hub.indexablePhrases : hub.phrases;
  const [examplePhrase] = primaryPhrases;

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[linear-gradient(180deg,#F8FAFE_0%,#FFFFFF_36%,#F7F8FB_100%)] text-neutral-950">
        <section className="border-b border-black/8 pt-32">
          <SectionShell className="pb-16 sm:pb-20">
            <div className="grid gap-10 lg:grid-cols-[1fr,0.78fr] lg:items-center">
              <div className="max-w-3xl">
                <Link
                  href="/korean-phrases"
                  className="inline-flex rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-neutral-600 shadow-sm"
                >
                  Korean phrase library
                </Link>
                <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
                  {hub.title} With Audio
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
                  {hub.description}
                </p>
              </div>
              <ExamplePhraseCard phrase={examplePhrase} />
            </div>
          </SectionShell>
        </section>

        <section className="py-20 sm:py-24">
          <SectionShell>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Start listening
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Choose a phrase
                </h2>
              </div>
              <Headphones className="hidden h-10 w-10 text-[#2253D9] sm:block" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {primaryPhrases.map((phrase) => (
                <PhraseListCard key={phrase.slug} phrase={phrase} />
              ))}
            </div>
            <div className="mt-12 w-full justify-center flex flex-col gap-4 items-center">
              <div className="text-center">
                <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-3xl">
                  Experience more on the Jjin app
                </h3>
                <p className="max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
                  Additional phrases, Hangul basics, numbers, quizzes, and more to help 
                  you learn Korean.
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

        {relatedHubs.length ? (
          <section className="relative overflow-hidden border-t border-black/8 py-20 sm:py-24">
            <Image
              src="/marketing/hero/jjin-hero-full-sky.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-18"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,254,0.92),rgba(255,255,255,0.98))]" />
            <SectionShell className="relative">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Keep exploring
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Try another situation
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
                  Move between everyday categories the way real conversations
                  move between greetings, ordering, transit, and quick questions.
                </p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {relatedHubs.slice(0, 6).map((relatedHub) => (
                  <CategoryCard key={relatedHub.slug} hub={relatedHub} />
                ))}
              </div>
            </SectionShell>
          </section>
        ) : null}

        <section className="py-20 sm:py-24">
          <SectionShell>
            <div className="grid gap-8 rounded-[2rem] border border-black/10 bg-[linear-gradient(135deg,#FFFFFF,#EEF4FF_58%,#FFF5EA)] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] md:grid-cols-[1fr,auto] md:items-center sm:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Practice in Jjin
                </p>
                <h2 className="mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Turn phrase browsing into audio practice
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
                  Use these web previews to find the Korean you care about, then
                  keep reviewing with short listening-first loops in the app.
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
