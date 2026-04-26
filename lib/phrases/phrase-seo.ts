import type { Metadata } from "next";
import { absoluteUrl, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getCategoryDescription, getCategoryLabel } from "@/lib/phrases/phrase-hubs";
import type { PhraseRecord } from "@/lib/phrases/types";

function cleanEnglish(value: string) {
  return value.replace(/\s*\/\s*/g, " or ").trim();
}

function capitalizeFirst(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`;
}

function isQuestion(value: string) {
  return value.trim().endsWith("?");
}

export function buildPhraseTitle(phrase: PhraseRecord) {
  const english = capitalizeFirst(cleanEnglish(phrase.englishText));
  const romanization = capitalizeFirst(phrase.romanization);

  if (phrase.pageTemplateKey.includes("question") || isQuestion(english)) {
    return `Hear "${english}" in Korean`;
  }

  if (phrase.pageTemplateKey.includes("request")) {
    return `How to Say "${english}" in Korean With Audio`;
  }

  if (phrase.intentBucket.includes("travel")) {
    return `Hear "${english}" in Korean Before Your Korea Trip`;
  }

  if (phrase.pageTemplateKey.includes("meaning")) {
    return `${romanization} Meaning and Korean Audio`;
  }

  return `Hear "${english}" in Korean | ${romanization}`;
}

export function buildPhraseH1(phrase: PhraseRecord) {
  return buildPhraseTitle(phrase);
}

export function buildPhraseDescription(phrase: PhraseRecord) {
  return `Hear ${phrase.koreanText} (${phrase.romanization}) spoken clearly and how to say "${phrase.englishText}" in Korean. Listen, repeat, and learn with Jjin.`;
}

export function phraseNoIndex(phrase: PhraseRecord) {
  return !phrase.indexable || phrase.robotsDirective.toLowerCase().includes("noindex");
}

export function buildPhraseMetadata(phrase: PhraseRecord): Metadata {
  return createMetadata({
    title: buildPhraseTitle(phrase),
    description: buildPhraseDescription(phrase),
    path: phrase.canonicalPath,
    noIndex: phraseNoIndex(phrase),
  });
}

export function buildPhrasePageSchema(phrase: PhraseRecord) {
  const pageUrl = absoluteUrl(phrase.canonicalPath);
  const webpageId = `${pageUrl}#webpage`;
  const learningResourceId = `${pageUrl}#learning-resource`;
  const definedTermId = `${pageUrl}#defined-term`;
  const organizationId = absoluteUrl("/#organization");
  const websiteId = absoluteUrl("/#website");
  const applicationId = absoluteUrl("/#software-application");
  const phraseLibraryId = absoluteUrl("/korean-phrases#defined-term-set");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: pageUrl,
        name: buildPhraseTitle(phrase),
        description: buildPhraseDescription(phrase),
        inLanguage: siteConfig.language,
        isPartOf: {
          "@id": websiteId,
        },
        publisher: {
          "@id": organizationId,
        },
        mainEntity: {
          "@id": learningResourceId,
        },
      },
      {
        "@type": "LearningResource",
        "@id": learningResourceId,
        name: buildPhraseH1(phrase),
        description: buildPhraseDescription(phrase),
        url: pageUrl,
        inLanguage: ["en-US", "ko-KR"],
        educationalLevel: phrase.difficulty,
        learningResourceType: "Phrase practice",
        teaches: [phrase.koreanText, phrase.englishText, phrase.romanization],
        about: {
          "@id": definedTermId,
        },
        provider: {
          "@id": organizationId,
        },
        isPartOf: {
          "@id": applicationId,
        },
      },
      {
        "@type": "DefinedTerm",
        "@id": definedTermId,
        name: phrase.koreanText,
        alternateName: phrase.romanization,
        description: `${phrase.koreanText} means "${phrase.englishText}" in English.`,
        termCode: phrase.slug,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          "@id": phraseLibraryId,
          name: "Jjin Korean Phrase Library",
          url: absoluteUrl("/korean-phrases"),
        },
      },
    ],
  };
}

export function buildHubMetadata(category: string): Metadata {
  return createMetadata({
    title: `${getCategoryLabel(category)} With Audio | Jjin`,
    description: getCategoryDescription(category),
    path: `/korean-phrases/${category}`,
  });
}

export function buildPhraseIndexMetadata(): Metadata {
  return createMetadata({
    title: "Korean Phrase Library With Audio | Jjin",
    description:
      "Browse Korean phrases by category, hear how they sound, and practice useful Korean for travel, food, transit, courtesy, and daily life.",
    path: "/korean-phrases",
  });
}
