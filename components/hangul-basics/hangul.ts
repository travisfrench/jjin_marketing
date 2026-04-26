import type {
  HangulBasicsItem,
  HangulBasicsManifest,
  HangulSymbolEntry,
} from "@/components/hangul-basics/types";

export const fallbackConsonants = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

export const fallbackVowels = [
  "ㅏ",
  "ㅓ",
  "ㅗ",
  "ㅜ",
  "ㅡ",
  "ㅣ",
  "ㅐ",
  "ㅔ",
  "ㅑ",
  "ㅕ",
  "ㅛ",
  "ㅠ",
];

const choseongIndex: Record<string, number> = {
  "ㄱ": 0,
  "ㄴ": 2,
  "ㄷ": 3,
  "ㄹ": 5,
  "ㅁ": 6,
  "ㅂ": 7,
  "ㅅ": 9,
  "ㅇ": 11,
  "ㅈ": 12,
  "ㅊ": 14,
  "ㅋ": 15,
  "ㅌ": 16,
  "ㅍ": 17,
  "ㅎ": 18,
};

const jungseongIndex: Record<string, number> = {
  "ㅏ": 0,
  "ㅐ": 1,
  "ㅑ": 2,
  "ㅓ": 4,
  "ㅔ": 5,
  "ㅕ": 6,
  "ㅗ": 8,
  "ㅛ": 12,
  "ㅜ": 13,
  "ㅠ": 17,
  "ㅡ": 18,
  "ㅣ": 20,
};

const hangulBaseCodepoint = 0xac00;
const jungseongCount = 21;
const jongseongCount = 28;
const manifestObjectPath = "hangul-basics/manifest.json";

export function composeHangulSyllable(consonant: string, vowel: string) {
  const choseong = choseongIndex[consonant];
  const jungseong = jungseongIndex[vowel];

  if (choseong === undefined || jungseong === undefined) {
    return `${consonant}${vowel}`;
  }

  return String.fromCodePoint(
    hangulBaseCodepoint + ((choseong * jungseongCount + jungseong) * jongseongCount),
  );
}

export function hangulSlug(consonant: string, vowel: string) {
  return `c${consonant.codePointAt(0)?.toString(16)}-v${vowel
    .codePointAt(0)
    ?.toString(16)}`;
}

export function getHangulBasicsManifestUrl() {
  return "/api/hangul-basics/manifest";
}

export function getHangulBasicsFallbackManifestUrl() {
  return `/${manifestObjectPath}`;
}

export function getHangulBasicsAudioUrl(audioPath: string) {
  const slugMatch = audioPath.match(/\/audio\/([^/]+)\/ko_normal\.wav$/);
  const slug = slugMatch?.[1];

  if (!slug) {
    return "";
  }

  return `/api/hangul-basics/audio/${encodeURIComponent(slug)}`;
}

export function publishedSymbols(entries: HangulSymbolEntry[], fallback: string[]) {
  const published = entries
    .filter((entry) => entry.isPublished)
    .sort((left, right) => {
      const sortDelta = left.sortOrder - right.sortOrder;
      return sortDelta === 0
        ? left.symbol.localeCompare(right.symbol, "ko")
        : sortDelta;
    });

  if (published.length > 0) {
    return published;
  }

  return fallback.map((symbol, index) => ({
    symbol,
    romanization: "",
    sortOrder: index,
    isPublished: true,
  }));
}

export function buildFallbackManifest(): HangulBasicsManifest {
  const consonants = publishedSymbols([], fallbackConsonants);
  const vowels = publishedSymbols([], fallbackVowels);
  const items: HangulBasicsItem[] = [];

  for (const consonant of consonants) {
    for (const vowel of vowels) {
      const slug = hangulSlug(consonant.symbol, vowel.symbol);
      items.push({
        id: slug,
        slug,
        consonant: consonant.symbol,
        vowel: vowel.symbol,
        syllable: composeHangulSyllable(consonant.symbol, vowel.symbol),
        audioPath: `hangul-basics/audio/${slug}/ko_normal.wav`,
      });
    }
  }

  return {
    version: 1,
    generatedAt: new Date(0).toISOString(),
    consonants,
    vowels,
    items,
  };
}
