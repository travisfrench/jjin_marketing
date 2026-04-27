import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/marketing/footer";
import { HangulHeroPlayableTile } from "@/components/hangul-basics/HangulHeroPlayableTile";
import { HangulBasicsSection } from "@/components/hangul-basics/HangulBasicsSection";
import { Navbar } from "@/components/marketing/navbar";
import { SectionShell } from "@/components/marketing/section-shell";
import { StudyCard } from "@/components/marketing/study-card";
import { JsonLd } from "@/components/seo/json-ld";
import {
  landingPageSummaries,
  type LandingFaq,
  type LandingFeature,
  type LandingPageContent,
  type LandingPhrase,
  type LandingScreenshot,
} from "@/lib/seo-page-content";
import { appStoreUrl } from "@/lib/site-config";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getPhraseAudioSources } from "@/lib/phrases/phrase-audio";
import { getPhraseBySlug, getPhrasePath } from "@/lib/phrases/phrase-data";
import { MdAirplaneTicket } from "react-icons/md";
import { FaEarListen, FaPersonWalkingLuggage, FaAnchorLock } from "react-icons/fa6";
import { TbAlphabetKorean, TbBowlChopsticks } from "react-icons/tb";
import { FaMugHot } from "react-icons/fa";
import { LuAudioLines } from "react-icons/lu";
import { TiArrowLoop } from "react-icons/ti";
import { LuSpeech } from "react-icons/lu";
import { PiUserSoundBold } from "react-icons/pi";
import { GiSoundWaves } from "react-icons/gi";
import { IoSubway } from "react-icons/io5";
import { RiEnglishInput } from "react-icons/ri";

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

type FeatureIconComponent = ComponentType<{ className?: string }>;

const featureIcons: Record<string, FeatureIconComponent> = {
  CheckCircle2,
  MdAirplaneTicket,
  FaEarListen,
  TbAlphabetKorean,
  FaMugHot,
  LuAudioLines,
  TiArrowLoop,
  FaPersonWalkingLuggage,
  LuSpeech,
  PiUserSoundBold,
  GiSoundWaves,
  FaAnchorLock,
  IoSubway,
  RiEnglishInput,
  TbBowlChopsticks,
};

function getFeatureIcon(icon?: string) {
  return icon ? featureIcons[icon] ?? CheckCircle2 : CheckCircle2;
}

function formatStepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function getLandingPhraseDetails(item: LandingPhrase) {
  const phrase = item.slug ? getPhraseBySlug(item.slug) : undefined;
  const audioSource = phrase ? getPhraseAudioSources(phrase)[0] : undefined;
  const phraseHref =
    phrase && phrase.isPublished && phrase.pseoPageEnabled
      ? getPhrasePath(phrase)
      : undefined;
  const categoryHref = phrase?.category
    ? `/korean-phrases/${phrase.category}`
    : undefined;

  return {
    label: item.label,
    phrase: phrase?.koreanText ?? item.phrase,
    romanization: phrase?.romanization ?? item.romanization,
    meaning: phrase?.englishText ?? item.meaning,
    audioSrc: audioSource?.src ?? item.audioSrc,
    phraseHref,
    categoryHref,
  };
}

function AudienceSpotlight({ items }: { items: LandingFeature[] }) {
  const [leadItem, ...supportingItems] = items;

  if (!leadItem) {
    return null;
  }

  const LeadIcon = getFeatureIcon(leadItem.icon);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.08fr,0.92fr]">
      <article className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-[linear-gradient(145deg,#F7FAFF_0%,#FFFFFF_50%,#FFF5EA_100%)] p-7 shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:p-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,83,217,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,170,92,0.14),transparent_26%)]" />
        <div className="relative max-w-xl">
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
            Perfect fit
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 text-[#2253D9] shadow-[0_14px_35px_rgba(34,83,217,0.15)]">
              <LeadIcon className="h-7 w-7" />
            </span>
            <span className="font-heading text-sm uppercase tracking-[0.32em] text-neutral-400">
              {formatStepNumber(0)}
            </span>
          </div>
          <h3 className="mt-8 max-w-[12ch] font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            {leadItem.title}
          </h3>
          <p className="mt-5 max-w-lg text-base leading-8 text-neutral-700 sm:text-lg">
            {leadItem.description}
          </p>
        </div>
      </article>

      <div className="grid gap-5">
        {supportingItems.map((item, index) => {
          const Icon = getFeatureIcon(item.icon);
          const stepNumber = formatStepNumber(index + 1);

          return (
            <article
              key={item.title}
              className="rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2253D9]">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-heading text-xs uppercase tracking-[0.3em] text-neutral-400">
                  {stepNumber}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-2xl font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-neutral-700">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FeatureBands({ items }: { items: LandingFeature[] }) {
  return (
    <div className="overflow-hidden rounded-[2.4rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,249,255,0.94))] shadow-[0_28px_80px_rgba(15,23,42,0.06)]">
      {items.map((item, index) => {
        const Icon = getFeatureIcon(item.icon);

        return (
          <article
            key={item.title}
            className={`grid gap-5 px-6 py-7 md:grid-cols-[auto,auto,1fr] md:items-center md:px-8 ${
              index === 0 ? "" : "border-t border-black/8"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2253D9] shadow-[0_12px_30px_rgba(34,83,217,0.12)]">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-heading text-2xl font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                {item.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ScreenshotShowcase({ screenshots }: { screenshots: LandingScreenshot[] }) {
  const [primaryShot, ...secondaryShots] = screenshots;

  if (!primaryShot) {
    return null;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.08fr,0.92fr]">
      <figure className="group overflow-hidden rounded-[2.4rem] border border-black/10 bg-white/85 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
        <div className="relative h-[30rem] overflow-hidden rounded-[1.8rem] bg-[#F5F7FB] sm:h-[36rem]">
          <Image
            src={primaryShot.src}
            alt={primaryShot.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.015]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white" />
        </div>
        <figcaption className="grid gap-4 px-2 pb-2 pt-5 sm:grid-cols-[auto,1fr] sm:items-start">
          <span className="inline-flex w-fit rounded-full border border-[#D7E2FF] bg-[#EEF4FF] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#2253D9]">
            Featured screen
          </span>
          <div>
            <p className="font-heading text-2xl font-semibold text-neutral-950">
              {primaryShot.title}
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-neutral-700">
              {primaryShot.description}
            </p>
          </div>
        </figcaption>
      </figure>

      <div className="grid gap-5">
        {secondaryShots.map((item, index) => (
          <figure
            key={item.title}
            className="grid gap-4 rounded-[2rem] border border-black/10 bg-white/80 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.06)] sm:grid-cols-[0.78fr,1fr] sm:items-center"
          >
            <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-[#F5F7FB] sm:h-full sm:min-h-[15rem]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 24vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <figcaption className="px-2 py-2">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                Screen {formatStepNumber(index + 1)}
              </p>
              <p className="mt-3 font-heading text-xl font-semibold text-neutral-950">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                {item.description}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function PhraseRows({ phrases }: { phrases: LandingPhrase[] }) {
  return (
    <div className="space-y-5">
      {phrases.map((item, index) => {
        const details = getLandingPhraseDetails(item);

        return (
          <figure
            key={`${item.label}-${item.phrase}`}
            className="rounded-[2.3rem] border border-black/10 bg-white/82 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.07)] sm:p-6"
          >
            <div className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr] lg:items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex flex-wrap items-center gap-3">
                  {details.categoryHref ? (
                    <Link
                      href={details.categoryHref}
                      className="inline-flex rounded-full border border-[#D7E2FF] bg-[#EEF4FF] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#2253D9] transition hover:border-[#2253D9]/40 hover:bg-[#E3ECFF]"
                    >
                      {details.label}
                    </Link>
                  ) : (
                    <span className="inline-flex rounded-full border border-[#D7E2FF] bg-[#EEF4FF] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#2253D9]">
                      {details.label}
                    </span>
                  )}
                  <span className="font-heading text-xs uppercase tracking-[0.32em] text-neutral-400">
                    {formatStepNumber(index)}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-neutral-950">
                  {details.meaning}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-neutral-700">
                  {item.note}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-black/8 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                      Phrase
                    </p>
                    <p className="mt-2 text-lg font-medium text-neutral-950">
                      {details.phrase}
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-black/8 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                      Romanization
                    </p>
                    <p className="mt-2 text-sm font-medium text-neutral-700">
                      {details.romanization}
                    </p>
                  </div>
                </div>
                {details.phraseHref ? (
                  <Link
                    href={details.phraseHref}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2253D9]"
                  >
                    Hear the full phrase
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <StudyCard
                  variant="hero"
                  label={details.label}
                  phrase={details.phrase}
                  romanization={details.romanization}
                  meaning={details.meaning}
                  audioSrc={details.audioSrc}
                  audioLabel={`Play ${details.label} phrase audio`}
                  labelHref={details.categoryHref}
                  phraseHref={details.phraseHref}
                  phraseCtaLabel="Open phrase page"
                  className="max-w-none border-[#D5DDEA] bg-[linear-gradient(160deg,rgba(18,24,30,0.96),rgba(7,9,13,0.94))] p-5"
                />
              </div>
            </div>
          </figure>
        );
      })}
    </div>
  );
}

function MethodTimeline({ items }: { items: LandingFeature[] }) {
  return (
    <div className="relative">
      <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-[linear-gradient(180deg,rgba(34,83,217,0),rgba(34,83,217,0.28),rgba(34,83,217,0))] md:block" />
      <div className="space-y-5">
        {items.map((item, index) => {
          const Icon = getFeatureIcon(item.icon);

          return (
            <article
              key={item.title}
              className="relative rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)] md:ml-14"
            >
              <div className="hidden md:absolute md:-left-14 md:top-6 md:flex md:h-10 md:w-10 md:items-center md:justify-center md:rounded-full md:border md:border-[#D7E2FF] md:bg-white md:font-heading md:text-sm md:font-semibold md:text-[#2253D9]">
                {index + 1}
              </div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E2FF] bg-white font-heading text-sm font-semibold text-[#2253D9] md:hidden">
                    {index + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2253D9]">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FaqList({ faqs }: { faqs: LandingFaq[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {faqs.map((item) => (
        <article
          key={item.question}
          className="rounded-[1.7rem] border border-black/10 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
        >
          <h3 className="font-heading text-xl font-semibold text-neutral-950">
            {item.question}
          </h3>
          <p className="mt-3 text-base leading-7 text-neutral-700">
            {item.answer}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ExploreLandingPagesSection({
  currentPath,
  title = "Explore practical ways to learn with Jjin",
  description = "These pages go deeper on the search intents the site is built to serve, from travel Korean to listening practice and Hangul support.",
}: {
  currentPath?: string;
  title?: string;
  description?: string;
}) {
  const items = landingPageSummaries.filter((page) => page.path !== currentPath);

  return (
    <section className="relative border-t border-black/8 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,83,217,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,174,90,0.08),transparent_34%)]" />
      <SectionShell>
        <div className="relative">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
              Explore the site
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {items.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="group grid gap-5 rounded-[2rem] border border-black/10 bg-white/80 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] sm:grid-cols-[0.95fr,1.05fr] sm:items-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-[1.55rem] bg-[#EFF3FA]">
                  <Image
                    src={page.heroImage}
                    alt={page.heroImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-2 py-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    {page.navLabel}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-neutral-950">
                    {page.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-700">
                    {page.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#2253D9]">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

export function FounderPerspectiveSection() {
  return (
    <section className="relative border-t border-black/8 py-24">
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-[#EEF3FB] shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[5/6]">
              <Image
                src="/marketing/about/subway-station-seoul.webp"
                alt="Family moment in Korea connected to the founder story behind Jjin"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
              Founder perspective
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Jjin is built from real Korean moments, not an imaginary curriculum
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700">
              Jjin started from a simple problem: broad language apps did
              not match the pressure of hearing Korean quickly and trying to
              respond with family, in public, or while moving through a day in
              Korea.
            </p>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              That is why Jjin is organized around useful phrase sets, listening
              support, and repeatable situations like cafes, transit, hotels,
              and everyday courtesy. The goal is practical confidence, not
              lesson volume for its own sake.
            </p>
            <div className="mt-8 rounded-[1.7rem] border border-black/10 bg-[linear-gradient(180deg,#FFFFFF,#F8FAFD)] p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Why that matters
              </p>
              <p className="mt-3 font-heading text-2xl font-semibold text-neutral-950">
                Practical Korean becomes easier to keep up with when the lessons
                mirror the situations that actually repeat.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2253D9]"
            >
              Read the founder story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

export function HomepageFaqSection() {
  const homeFaqs: LandingFaq[] = [
    {
      question: "Is Jjin good for beginner Korean learners?",
      answer:
        "Yes. Jjin is designed to feel approachable for beginners while staying focused on phrases that are genuinely useful in real life.",
    },
    {
      question: "Can I use Jjin to learn Korean for travel in Korea?",
      answer:
        "Yes. The app includes categories and phrases for transit, cafes, restaurants, hotels, and everyday courtesy that are especially useful before a trip.",
    },
    {
      question: "Does Jjin help with Korean listening practice?",
      answer:
        "Yes. Audio is part of the learning flow so learners can connect spoken Korean to Hangul and meaning instead of relying on reading alone.",
    },
    {
      question: "Does the app include Hangul support?",
      answer:
        "Yes. Jjin supports learners who want to get more comfortable reading Hangul while studying practical Korean phrases.",
    },
  ];

  return (
    <section className="relative border-t border-black/8 py-24">
      <SectionShell>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
            Questions people actually ask
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            A few things to know before you download
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg">
            These are the recurring questions behind searches for Korean
            learning apps, travel Korean tools, and listening-focused beginner
            study.
          </p>
        </div>

        <div className="mt-12">
          <FaqList faqs={homeFaqs} />
        </div>
      </SectionShell>
    </section>
  );
}

export function SeoLandingPageTemplate({ page }: { page: LandingPageContent }) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: page.linkLabel, path: page.path },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navbar />
      <main className="overflow-hidden bg-[linear-gradient(180deg,#F8FAFE_0%,#FFFFFF_24%,#F7F8FB_58%,#FFFFFF_100%)] text-neutral-950">
        <section className="relative overflow-hidden border-b border-black/8 pt-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,83,217,0.12),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,170,92,0.15),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)]" />
          <SectionShell className="relative pb-16 sm:pb-20">
            <div className="grid gap-14 lg:grid-cols-[0.96fr,1.04fr] lg:items-center">
              <div className="max-w-2xl">
                <p className="inline-flex rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-neutral-600 shadow-sm">
                  {page.heroEyebrow}
                </p>
                <h1 className="mt-6 max-w-[13ch] font-heading text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
                  {page.heroTitle}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-700">
                  {page.heroDescription}
                </p>

                <ul className="mt-8 space-y-3">
                  {page.heroHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-neutral-700 sm:text-base"
                    >
                      <Sparkles className="mt-0.5 h-4 w-4 text-[#2253D9]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap items-center gap-4">
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
              </div>

              <div className="grid gap-5 sm:grid-cols-[1.18fr,0.82fr] sm:items-stretch">
                <div className="relative overflow-hidden rounded-[2.4rem] border border-black/10 bg-white/60 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.1)]">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.8rem]">
                    <Image
                      src={page.heroImage}
                      alt={page.heroImageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 36vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="flex h-full min-h-0 flex-col gap-5">
                  <div className="min-h-0 flex-1 rounded-[2rem] border border-black/10 bg-white/82 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                    <div className="relative h-full min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-[#F1F4FA]">
                      <Image
                        src={page.heroScreen.src}
                        alt={page.heroScreen.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 18vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {page.slug === "learn-hangul" ? (
                    <HangulHeroPlayableTile />
                  ) : (
                    <div className="shrink-0 rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                      <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                        {page.heroScreen.title}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-neutral-700">
                        {page.heroScreen.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionShell>
        </section>

        {page.slug === "learn-hangul" && <HangulBasicsSection />}

        <section className="relative border-b border-black/8 py-24">
          <SectionShell>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                {page.audienceTitle}
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Clear fit matters more than broad coverage
              </h2>
            </div>
            <div className="mt-12">
              <AudienceSpotlight items={page.audience} />
            </div>
          </SectionShell>
        </section>

        <section className="relative border-b border-black/8 py-24">
          <SectionShell>
            <div className="grid gap-12 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  {page.featureTitle}
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                  A cleaner way to practice useful Korean
                </h2>
                <p className="mt-6 text-base leading-7 text-neutral-700 sm:text-lg">
                  Jjin stays focused on making phrases easier to hear, easier to
                  recognize, and easier to revisit when the same situations show
                  up again.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/korean-phrases"
                    className="inline-flex items-center gap-2 rounded-full border border-[#2253D9]/20 bg-[#EEF4FF] px-5 py-3 text-sm font-semibold text-[#2253D9] transition hover:border-[#2253D9]/40 hover:bg-[#E2EBFF]"
                  >
                    Try phrase examples
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {page.slug !== "learn-hangul" ? (
                    <Link
                      href="/learn-hangul"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-black/20 hover:bg-neutral-50"
                    >
                      See Hangul basics
                    </Link>
                  ) : null}
                </div>
              </div>
              <FeatureBands items={page.features} />
            </div>
          </SectionShell>
        </section>

        <section className="relative border-b border-black/8 py-24">
          <SectionShell>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                {page.screenshotsTitle}
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Jjin is focused on the essentials for immediate communication
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg">
                {page.screenshotsDescription}
              </p>
            </div>
            <div className="mt-12">
              <ScreenshotShowcase screenshots={page.screenshots} />
            </div>
          </SectionShell>
        </section>

        <section className="relative border-b border-black/8 py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,83,217,0.08),transparent_26%),radial-gradient(circle_at_100%_100%,rgba(255,170,92,0.08),transparent_26%)]" />
          <SectionShell>
            <div className="relative max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                {page.phraseTitle}
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Useful Korean feels easier to remember when the context is obvious
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg">
                {page.phraseDescription}
              </p>
            </div>
            <div className="relative mt-12">
              <PhraseRows phrases={page.phrases} />
            </div>
          </SectionShell>
        </section>

        <section className="relative border-b border-black/8 py-24">
          <SectionShell>
            <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  {page.methodTitle}
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                  A light structure that still builds momentum
                </h2>
                <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg">
                  {page.methodDescription}
                </p>
              </div>
              <MethodTimeline items={page.methodPoints} />
            </div>
          </SectionShell>
        </section>

        <section className="relative border-b border-black/8 py-24">
          <SectionShell>
            <div className="grid gap-10 lg:grid-cols-[1.02fr,0.98fr] lg:items-center">
              <div className="relative overflow-hidden rounded-[2.35rem] border border-black/10 bg-white/70 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.09)]">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.85rem]">
                  <Image
                    src={page.trustImage}
                    alt={page.trustImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  {page.trustEyebrow}
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                  {page.trustTitle}
                </h2>
                <p className="mt-6 text-lg leading-8 text-neutral-700">
                  {page.trustDescription}
                </p>
                <div className="mt-8 rounded-[1.8rem] border border-black/10 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <p className="text-sm leading-7 text-neutral-900">
                    “{page.trustQuote}”
                  </p>
                </div>
              </div>
            </div>
          </SectionShell>
        </section>

        <section className="relative border-b border-black/8 py-24">
          <SectionShell>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Frequently asked
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Straight answers before you try the app
              </h2>
            </div>
            <div className="mt-12">
              <FaqList faqs={page.faqs} />
            </div>
          </SectionShell>
        </section>

        <ExploreLandingPagesSection currentPath={page.path} />

        <section className="relative py-24">
          <SectionShell>
            <div className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-[linear-gradient(135deg,#F6F9FF,#FFFFFF_46%,#FFF5EA)] px-6 py-10 shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:px-10 sm:py-14">
              <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                    Ready when you are
                  </p>
                  <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                    Keep the study loop short. Keep the Korean useful.
                  </h2>
                  <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg">
                    Jjin is built for the learner who wants practical Korean,
                    more listening confidence, and phrase sets that actually
                    match real life in Korea.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 lg:items-end">
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
              </div>
            </div>
          </SectionShell>
        </section>
      </main>
      <Footer />
    </>
  );
}
