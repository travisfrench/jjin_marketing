import type { CsvRow } from "@/lib/phrases/csv";
import type { PhraseRecord } from "@/lib/phrases/types";

function bool(value: string | undefined) {
  return value?.trim().toLowerCase() === "true";
}

function numberValue(value: string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function list(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function optional(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function normalizePhrase(row: CsvRow): PhraseRecord {
  const canonicalPath = row.canonical_path || `/phrases/${row.page_slug}`;

  return {
    slug: row.slug?.trim() ?? "",
    category: row.category?.trim() ?? "",
    koreanText: row.korean_text?.trim() ?? "",
    englishText: row.english_text?.trim() ?? "",
    romanization: row.romanization?.trim() ?? "",
    difficulty: row.difficulty?.trim() ?? "",
    accessTier: row.access_tier?.trim() ?? "",
    usageNote: optional(row.usage_note),
    relatedSlugs: list(row.related_slugs),
    sortOrder: numberValue(row.sort_order),
    isPublished: bool(row.is_published),
    usagePack: optional(row.usage_pack),
    pseoPageEnabled: bool(row.pseo_page_enabled),
    indexable: bool(row.indexable),
    robotsDirective: row.robots_directive?.trim() ?? "",
    sitemapInclude: bool(row.sitemap_include),
    rolloutBatch: row.rollout_batch?.trim() ?? "",
    seoPriority: numberValue(row.seo_priority),
    indexReasonCodes: list(row.index_reason_codes),
    pageType: row.page_type?.trim() ?? "",
    pageTemplateKey: row.page_template_key?.trim() ?? "",
    intentBucket: row.intent_bucket?.trim() ?? "",
    audienceSegment: row.audience_segment?.trim() ?? "",
    useCasePrimary: row.use_case_primary?.trim() ?? "",
    keywordOpportunity: row.keyword_opportunity?.trim() ?? "",
    primaryQuery: row.primary_query?.trim() ?? "",
    audioQuery: row.audio_query?.trim() ?? "",
    pronunciationQuery: row.pronunciation_query?.trim() ?? "",
    seoTitle: optional(row.seo_title),
    metaDescription: optional(row.meta_description),
    h1TemplateKey: optional(row.h1_template_key),
    pageSlug: row.page_slug?.trim() ?? "",
    canonicalPath,
    parentHubSlug: row.parent_hub_slug?.trim() ?? "",
    parentHubPath: row.parent_hub_path?.trim() ?? "",
    breadcrumbLabel: row.breadcrumb_label?.trim() ?? row.english_text?.trim() ?? "",
    appDeepLink: optional(row.app_deep_link),
    normalAudioAssetKey: optional(row.normal_audio_asset_key ?? row.audio_asset_key),
    slowAudioAssetKey: optional(row.slow_audio_asset_key),
    normalTimingAssetKey: optional(row.normal_timing_asset_key),
    renderComponents: list(row.render_components),
    ctaKey: row.cta_key?.trim() ?? "",
    ctaLabelKey: row.cta_label_key?.trim() ?? "",
    relatedLinkStrategy: row.related_link_strategy?.trim() ?? "",
    duplicateEnglishGroup: optional(row.duplicate_english_group),
    canonicalVariantStrategy: optional(row.canonical_variant_strategy),
    noindexReason: optional(row.noindex_reason),
    qaFlags: optional(row.qa_flags),
  };
}

export function phraseRouteSlug(phrase: PhraseRecord) {
  return phrase.canonicalPath.replace(/^\/phrases\//, "") || phrase.pageSlug;
}

export function isRoutablePhrase(phrase: PhraseRecord) {
  return phrase.isPublished && phrase.pseoPageEnabled && Boolean(phrase.pageSlug);
}

export function isSitemapPhrase(phrase: PhraseRecord) {
  return (
    isRoutablePhrase(phrase) &&
    phrase.indexable &&
    phrase.sitemapInclude &&
    !phrase.robotsDirective.toLowerCase().includes("noindex") &&
    phrase.rolloutBatch !== "hold_noindex"
  );
}
