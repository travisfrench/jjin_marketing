import fs from "node:fs";
import path from "node:path";
import { parseCsv } from "@/lib/phrases/csv";
import {
  isRoutablePhrase,
  isSitemapPhrase,
  normalizePhrase,
  phraseRouteSlug,
} from "@/lib/phrases/phrase-normalize";
import type { PhraseRecord } from "@/lib/phrases/types";

const PHRASE_SEED_PATH = path.join(
  process.cwd(),
  "data",
  "phrases",
  "phrases.seed.csv",
);

let phraseCache: PhraseRecord[] | undefined;

function sortPhrases(phrases: PhraseRecord[]) {
  return [...phrases].sort((a, b) => {
    if (b.seoPriority !== a.seoPriority) return b.seoPriority - a.seoPriority;
    return a.sortOrder - b.sortOrder;
  });
}

export function getAllPhrases() {
  if (!phraseCache) {
    const csv = fs.readFileSync(PHRASE_SEED_PATH, "utf8");
    phraseCache = parseCsv(csv).map(normalizePhrase);
  }

  return phraseCache;
}

export function getRoutablePhrases() {
  return sortPhrases(getAllPhrases().filter(isRoutablePhrase));
}

export function getSitemapPhrases() {
  return sortPhrases(getAllPhrases().filter(isSitemapPhrase));
}

export function getPhraseByRouteSlug(routeSlug: string) {
  return getAllPhrases().find((phrase) => phraseRouteSlug(phrase) === routeSlug);
}

export function getPhraseBySlug(slug: string) {
  return getAllPhrases().find((phrase) => phrase.slug === slug);
}

export function getPhrasePath(phrase: PhraseRecord) {
  return phrase.canonicalPath || `/phrases/${phraseRouteSlug(phrase)}`;
}

export function getCategoryPhrases(category: string) {
  return sortPhrases(
    getRoutablePhrases().filter((phrase) => phrase.category === category),
  );
}

export function getPhraseCategories() {
  return Array.from(new Set(getRoutablePhrases().map((phrase) => phrase.category)))
    .filter(Boolean)
    .sort();
}
