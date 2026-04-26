import { getAllPhrases, getPhrasePath } from "@/lib/phrases/phrase-data";
import { isRoutablePhrase } from "@/lib/phrases/phrase-normalize";
import type { PhraseRecord } from "@/lib/phrases/types";

export function getRelatedPhrases(phrase: PhraseRecord, limit = 6) {
  const allPhrases = getAllPhrases();
  const bySlug = new Map(allPhrases.map((item) => [item.slug, item]));
  const explicit = phrase.relatedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is PhraseRecord => Boolean(item))
    .filter((item) => item.slug !== phrase.slug && isRoutablePhrase(item));

  const fallback = allPhrases
    .filter((item) => item.category === phrase.category)
    .filter((item) => item.slug !== phrase.slug && isRoutablePhrase(item))
    .sort((a, b) => b.seoPriority - a.seoPriority || a.sortOrder - b.sortOrder);

  const merged = [...explicit, ...fallback];
  const seen = new Set<string>();

  return merged
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    })
    .slice(0, limit)
    .map((item) => ({
      ...item,
      path: getPhrasePath(item),
    }));
}
