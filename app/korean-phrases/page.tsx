import { PhraseIndexTemplate } from "@/components/phrases/phrase-index-template";
import { getFeaturedPhraseHubs } from "@/lib/phrases/phrase-hubs";
import { getPhraseBySlug } from "@/lib/phrases/phrase-data";
import { getPhraseAudioSources } from "@/lib/phrases/phrase-audio";
import { buildPhraseIndexMetadata } from "@/lib/phrases/phrase-seo";

export const metadata = buildPhraseIndexMetadata();

export default function KoreanPhrasesIndexPage() {
  const featuredSlugs = ["annyeonghaseyo", "gamsahamnida", "jinjja"];
  const featuredPhrases = featuredSlugs
    .map((slug) => {
      const phrase = getPhraseBySlug(slug);
      if (!phrase) return null;
      return {
        phrase,
        audioSources: getPhraseAudioSources(phrase),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <PhraseIndexTemplate
      hubs={getFeaturedPhraseHubs()}
      featuredPhrases={featuredPhrases}
    />
  );
}
