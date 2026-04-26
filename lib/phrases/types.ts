export type PhraseDifficulty = "easy" | "moderate" | "difficult" | "expert" | string;

export type PhraseAudioVariant = "normal" | "slow";

export type PhraseAudioSource = {
  variant: PhraseAudioVariant;
  label: string;
  src: string;
  assetKey?: string;
};

export type PhraseTimingSyllable = {
  text: string;
  startMs: number;
  endMs: number;
};

export type PhraseTimingData = {
  phraseSlug: string;
  variant: string;
  text: string;
  durationMs: number;
  syllables?: PhraseTimingSyllable[];
};

export type PhraseRecord = {
  slug: string;
  category: string;
  koreanText: string;
  englishText: string;
  romanization: string;
  difficulty: PhraseDifficulty;
  accessTier: string;
  usageNote?: string;
  relatedSlugs: string[];
  sortOrder: number;
  isPublished: boolean;
  usagePack?: string;
  pseoPageEnabled: boolean;
  indexable: boolean;
  robotsDirective: string;
  sitemapInclude: boolean;
  rolloutBatch: string;
  seoPriority: number;
  indexReasonCodes: string[];
  pageType: string;
  pageTemplateKey: string;
  intentBucket: string;
  audienceSegment: string;
  useCasePrimary: string;
  keywordOpportunity: string;
  primaryQuery: string;
  audioQuery: string;
  pronunciationQuery: string;
  seoTitle?: string;
  metaDescription?: string;
  h1TemplateKey?: string;
  pageSlug: string;
  canonicalPath: string;
  parentHubSlug: string;
  parentHubPath: string;
  breadcrumbLabel: string;
  appDeepLink?: string;
  normalAudioAssetKey?: string;
  slowAudioAssetKey?: string;
  normalTimingAssetKey?: string;
  renderComponents: string[];
  ctaKey: string;
  ctaLabelKey: string;
  relatedLinkStrategy: string;
  duplicateEnglishGroup?: string;
  canonicalVariantStrategy?: string;
  noindexReason?: string;
  qaFlags?: string;
};

export type PhraseHub = {
  slug: string;
  path: string;
  category: string;
  title: string;
  description: string;
  phrases: PhraseRecord[];
  indexablePhrases: PhraseRecord[];
  totalPhraseCount: number;
  previewPhraseCount: number;
};
