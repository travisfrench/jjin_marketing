import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { SectionShell } from "@/components/marketing/section-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { QuickPhrasePlayButton } from "@/components/phrases/quick-phrase-play-button";
import { PhraseStudyPreviewCard } from "@/components/phrases/phrase-study-preview-card";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getPhraseAudioSources } from "@/lib/phrases/phrase-audio";
import { getPhrasePath } from "@/lib/phrases/phrase-data";
import { getCategoryLabel } from "@/lib/phrases/phrase-hubs";
import { getPhraseTimingUrl } from "@/lib/phrases/phrase-timings";
import { buildPhraseH1, buildPhrasePageSchema } from "@/lib/phrases/phrase-seo";
import type { PhraseAudioSource, PhraseHub, PhraseRecord } from "@/lib/phrases/types";

type RelatedPhrase = PhraseRecord & { path: string };

type PhrasePageTemplateProps = {
  phrase: PhraseRecord;
  relatedPhrases: RelatedPhrase[];
  audioSources: PhraseAudioSource[];
  hubs: PhraseHub[];
};

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function RelatedPhraseCard({ phrase }: { phrase: RelatedPhrase }) {
  const [audioSource] = getPhraseAudioSources(phrase);

  return (
    <article className="relative group rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
          {formatLabel(phrase.category)}
        </p>
        <div className="absolute top-5 right-5">
        <QuickPhrasePlayButton
          src={audioSource?.src}
          label={`Play audio for ${phrase.englishText}`}
        />
        </div>

      </div>
      <p className="mt-4 text-md text-neutral-500">{phrase.romanization}</p>
      <p className="mt-1 font-korean text-2xl font-semibold text-neutral-950">
        {phrase.koreanText}
      </p>
      
      <p className="mt-2 text-base font-semibold text-neutral-900">
        {phrase.englishText}
      </p>
      <Link
        href={phrase.path}
        className="mt-2 inline-flex items-end w-full justify-end items-center gap-2 text-sm font-semibold text-[#2253D9]"
      >
        Study {phrase.romanization}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

function CategoryDiscoveryCard({ hub }: { hub: PhraseHub }) {
  return (
    <Link
      href={hub.path}
      className="group rounded-2xl border border-white/18 bg-white/90 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
        Learn by situation
      </p>
      <h3 className="mt-4 font-heading text-2xl font-semibold text-neutral-950">
        {hub.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        {hub.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2253D9]">
        Browse set
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function PhrasePageTemplate({
  phrase,
  relatedPhrases,
  audioSources,
  hubs,
}: PhrasePageTemplateProps) {
  const hubLabel = getCategoryLabel(phrase.category);
  const moreHubs = hubs
    .filter((hub) => hub.category !== phrase.category)
    .slice(0, 6);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Korean Phrases", path: "/korean-phrases" },
    { name: hubLabel, path: `/korean-phrases/${phrase.category}` },
    { name: phrase.breadcrumbLabel || phrase.englishText, path: getPhrasePath(phrase) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={buildPhrasePageSchema(phrase)} />
      <Navbar />
      <main className="overflow-hidden bg-[linear-gradient(180deg,#F8FAFE_0%,#FFFFFF_30%,#F6F8FC_64%,#FFFFFF_100%)] text-neutral-950">
        <section className="relative min-h-[92svh] overflow-hidden border-b border-black/8 pt-28">
          <Image
            src="/marketing/scenes/jjin-basics-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/95 via-white/60 to-white/50" />
          <SectionShell className="relative pb-16 pt-0 sm:pt-6 sm:pb-20">
            <div className="grid gap-10 lg:grid-cols-[0.98fr,1.02fr] lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex gap-2">
                  <Link
                    href={`/korean-phrases/${phrase.category}`}
                    className="inline-flex rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-neutral-600 shadow-sm"
                  >
                    {hubLabel}
                  </Link>
                  <span className="rounded-full border border-[#D7E2FF] bg-[#EEF4FF] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#2253D9]">
                    {formatLabel(phrase.difficulty)}
                  </span>
                </div>
                <h1 className="mt-6 max-w-[13ch] font-heading text-4xl font-semibold leading-[1.04] text-neutral-950 sm:text-6xl">
                  {buildPhraseH1(phrase)}
                </h1>
                <p className="mt-3 text-lg leading-8 text-neutral-700">
                  <span className="font-semibold text-neutral-950">
                    {phrase.koreanText}
                  </span>{" "}
                  means &quot;{phrase.englishText}&quot; in English. The romanization is{" "}
                  <span className="font-semibold text-neutral-950">
                    {phrase.romanization}
                  </span>
                  .
                </p>
                <p className="mt-5 text-base leading-7 text-neutral-700">
                  Listen for the sound of{" "}
                  <span className="font-semibold text-neutral-950">
                    {phrase.romanization}
                  </span>{" "}
                  while reading the Hangul. Jjin keeps the audio, Korean text,
                  romanization, and meaning together so the phrase is easier to
                  recognize again later.
                </p>

                <a
                  href="https://apps.apple.com/us/app/jjin-learn-korean/id6760714406"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex"
                  aria-label="Download Jjin on the App Store"
                >
                  <Image
                    src={appStoreBadgeSrc}
                    alt="Download on the App Store"
                    width={180}
                    height={60}
                    className="h-11 w-auto"
                  />
                </a>
              </div>

              <PhraseStudyPreviewCard
                category={formatLabel(phrase.category)}
                koreanText={phrase.koreanText}
                englishText={phrase.englishText}
                romanization={phrase.romanization}
                audioSources={audioSources}
                normalTimingUrl={getPhraseTimingUrl(phrase, "normal")}
                slowTimingUrl={getPhraseTimingUrl(phrase, "slow")}
              />
            </div>
          </SectionShell>
        </section>

        

        {relatedPhrases.length ? (
          <section className="border-b border-black/8 py-20 sm:py-24">
            <SectionShell>
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Related listening practice
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Keep your ear in the same situation
                </h2>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPhrases.map((related) => (
                  <RelatedPhraseCard key={related.slug} phrase={related} />
                ))}
              </div>
              <Link
                href={`/korean-phrases/${phrase.category}`}
                className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-[#2253D9]"
              >
                See more {hubLabel.toLowerCase()}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </SectionShell>
          </section>
        ) : null}

        {moreHubs.length ? (
          <section className="relative overflow-hidden border-b border-black/8 py-20 sm:py-24">
            <Image
              src="/marketing/scenes/jjin-kbbq-bg.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white-80 to-white/30" />
            <SectionShell className="relative">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  More ways to keep learning
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Jump into another Korean situation
                </h2>
              </div>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {moreHubs.map((hub) => (
                  <CategoryDiscoveryCard key={hub.slug} hub={hub} />
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
                  Practice in the app
                </p>
                <h2 className="mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
                  Use Jjin to review this phrase with audio and real context
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
                  Phrase pages are a preview. Jjin is built for short review
                  loops where Korean sound, Hangul, romanization, and meaning
                  stay together.
                </p>
              </div>
              <a
                href="https://apps.apple.com/us/app/jjin-learn-korean/id6760714406"
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
                aria-label="Practice this Korean phrase in Jjin"
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
