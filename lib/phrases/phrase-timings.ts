import type { PhraseAudioVariant, PhraseRecord } from "@/lib/phrases/types";

export function getPhraseTimingAssetKey(
  phrase: PhraseRecord,
  variant: PhraseAudioVariant,
) {
  if (variant === "normal") {
    return (
      phrase.normalTimingAssetKey ??
      phrase.normalAudioAssetKey?.replace(/\.wav$/i, ".timings.json")
    );
  }

  return phrase.slowAudioAssetKey?.replace(/\.wav$/i, ".timings.json");
}

export function getPhraseTimingUrl(
  phrase: PhraseRecord,
  variant: PhraseAudioVariant,
) {
  const assetKey = getPhraseTimingAssetKey(phrase, variant);
  if (!assetKey) return null;

  return `/api/phrase-timings/${phrase.slug}?variant=${variant}`;
}
