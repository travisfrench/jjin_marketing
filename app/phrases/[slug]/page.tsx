import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PhrasePageTemplate } from "@/components/phrases/phrase-page-template";
import { getPhraseAudioSources } from "@/lib/phrases/phrase-audio";
import {
  getPhraseByRouteSlug,
  getRoutablePhrases,
} from "@/lib/phrases/phrase-data";
import { phraseRouteSlug } from "@/lib/phrases/phrase-normalize";
import { getRelatedPhrases } from "@/lib/phrases/phrase-related";
import { buildPhraseMetadata } from "@/lib/phrases/phrase-seo";
import { getFeaturedPhraseHubs } from "@/lib/phrases/phrase-hubs";

type PhrasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRoutablePhrases().map((phrase) => ({
    slug: phraseRouteSlug(phrase),
  }));
}

export async function generateMetadata({
  params,
}: PhrasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const phrase = getPhraseByRouteSlug(slug);

  if (!phrase) {
    return {};
  }

  return buildPhraseMetadata(phrase);
}

export default async function PhrasePage({ params }: PhrasePageProps) {
  const { slug } = await params;
  const phrase = getPhraseByRouteSlug(slug);

  if (!phrase || !phrase.isPublished || !phrase.pseoPageEnabled) {
    notFound();
  }

  return (
    <PhrasePageTemplate
      phrase={phrase}
      relatedPhrases={getRelatedPhrases(phrase)}
      audioSources={getPhraseAudioSources(phrase)}
      hubs={getFeaturedPhraseHubs()}
    />
  );
}
