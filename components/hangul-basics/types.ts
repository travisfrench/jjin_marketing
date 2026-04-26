export type HangulLearningPath = "consonant" | "vowel";

export type HangulSymbolEntry = {
  symbol: string;
  romanization: string;
  sortOrder: number;
  isPublished: boolean;
};

export type HangulBasicsItem = {
  id: string;
  slug: string;
  consonant: string;
  vowel: string;
  syllable: string;
  audioPath: string;
};

export type HangulBasicsManifest = {
  version: 1;
  generatedAt: string;
  consonants: HangulSymbolEntry[];
  vowels: HangulSymbolEntry[];
  items: HangulBasicsItem[];
};
