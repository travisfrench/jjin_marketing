import {
  getAllPhrases,
  getCategoryPhrases,
  getPhraseCategories,
  getRoutablePhrases,
} from "@/lib/phrases/phrase-data";
import type { PhraseHub } from "@/lib/phrases/types";

const categoryLabels: Record<string, string> = {
  cafe: "Korean Cafe Phrases",
  courtesy: "Korean Courtesy Phrases",
  directions: "Korean Directions Phrases",
  emergency: "Korean Emergency Phrases",
  greeting: "Korean Greetings",
  hotel: "Korean Hotel Phrases",
  restaurant: "Korean Restaurant Phrases",
  shopping: "Korean Shopping Phrases",
  transit: "Korean Transit Phrases",
};

const categoryDescriptions: Record<string, string> = {
  cafe: "Hear Korean phrases for ordering coffee, asking for takeout, and handling cafe counters.",
  courtesy: "Practice polite Korean that helps first conversations feel smoother.",
  directions: "Hear useful Korean for asking where to go and understanding travel directions.",
  emergency: "Learn Korean words and phrases that can matter when you need help quickly.",
  greeting: "Start with high-frequency Korean greetings, replies, and everyday social phrases.",
  hotel: "Practice Korean for check-in, reservations, and hotel stay basics.",
  restaurant: "Hear Korean phrases for ordering, asking questions, and eating in restaurants.",
  shopping: "Practice Korean for prices, sizes, trying things on, and paying.",
  transit: "Hear Korean for subway, boarding, destinations, and getting around Korea.",
};

function titleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getCategoryLabel(category: string) {
  return categoryLabels[category] ?? `Korean ${titleCase(category)} Phrases`;
}

export function getCategoryDescription(category: string) {
  return (
    categoryDescriptions[category] ??
    `Hear useful Korean phrases for ${category.replaceAll("_", " ")} situations and practice them in Jjin.`
  );
}

export function getPhraseHubs(): PhraseHub[] {
  return getPhraseCategories().map((category) => {
    const phrases = getCategoryPhrases(category);
    const indexablePhrases = phrases.filter((phrase) => phrase.indexable);
    const totalPhraseCount = getAllPhrases().filter(
      (phrase) => phrase.category === category,
    ).length;

    return {
      slug: category,
      path: `/korean-phrases/${category}`,
      category,
      title: getCategoryLabel(category),
      description: getCategoryDescription(category),
      phrases,
      indexablePhrases,
      totalPhraseCount,
      previewPhraseCount: phrases.length,
    };
  });
}

export function getPhraseHub(category: string) {
  return getPhraseHubs().find((hub) => hub.category === category);
}

export function getFeaturedPhraseHubs() {
  return getPhraseHubs()
    .filter((hub) => hub.phrases.length > 0)
    .sort((a, b) => b.indexablePhrases.length - a.indexablePhrases.length);
}

export function getPhraseLibraryStats() {
  const phrases = getRoutablePhrases();
  const indexable = phrases.filter((phrase) => phrase.indexable);
  const allPhrases = getAllPhrases();

  return {
    phraseCount: phrases.length,
    featuredCount: indexable.length,
    categoryCount: getPhraseCategories().length,
    appPhraseCount: allPhrases.length,
  };
}
