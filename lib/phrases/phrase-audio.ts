import fs from "node:fs";
import path from "node:path";
import type { PhraseAudioSource, PhraseAudioVariant, PhraseRecord } from "@/lib/phrases/types";

type AudioProvider = "local" | "protected-route" | "supabase";

const audioProvider = (process.env.PHRASE_AUDIO_PROVIDER ?? "local") as AudioProvider;
const localAudioPublicPrefix = process.env.PHRASE_LOCAL_AUDIO_PUBLIC_PREFIX ?? "";

const legacyAudioBySlug: Partial<Record<string, string>> = {
  annyeonghaseyo: "/marketing/audio/hello.wav",
  gamsahamnida: "/marketing/audio/thank-you.wav",
  "pojanghae-juseyo": "/marketing/audio/pojanghae-juseyo.wav",
  "eodieseo-tayo": "/marketing/audio/eodieseo-tayo.wav",
  "chekeu-in": "/marketing/audio/chekeu-in.wav",
  sillyehamnida: "/marketing/audio/sillyehamnida.wav",
  yeyak: "/marketing/audio/reservation.wav",
};

function publicFileExists(publicPath: string) {
  const normalized = publicPath.replace(/^\/+/, "");
  return fs.existsSync(path.join(process.cwd(), "public", normalized));
}

function assetKeyToPublicPath(assetKey: string) {
  return `/${[localAudioPublicPrefix, assetKey]
    .filter(Boolean)
    .join("/")
    .replace(/^\/+/, "")}`;
}

export function getPhraseAudioUrl(
  phrase: PhraseRecord,
  variant: PhraseAudioVariant,
) {
  const assetKey =
    variant === "normal" ? phrase.normalAudioAssetKey : phrase.slowAudioAssetKey;

  if (!assetKey) return null;

  if (audioProvider === "protected-route" || audioProvider === "supabase") {
    return `/api/phrase-audio/${phrase.slug}?variant=${variant}`;
  }

  const assetPath = assetKeyToPublicPath(assetKey);
  if (publicFileExists(assetPath)) return assetPath;

  if (variant === "normal") {
    const legacyPath = legacyAudioBySlug[phrase.slug];
    if (legacyPath && publicFileExists(legacyPath)) return legacyPath;
  }

  return null;
}

export function getPhraseAudioSources(phrase: PhraseRecord): PhraseAudioSource[] {
  const normalSrc = getPhraseAudioUrl(phrase, "normal");
  const slowSrc = getPhraseAudioUrl(phrase, "slow");
  const sources: PhraseAudioSource[] = [];

  if (normalSrc) {
    sources.push({
      variant: "normal",
      label: "Normal",
      src: normalSrc,
      assetKey: phrase.normalAudioAssetKey,
    });
  }

  if (slowSrc) {
    sources.push({
      variant: "slow",
      label: "Slow",
      src: slowSrc,
      assetKey: phrase.slowAudioAssetKey,
    });
  }

  return sources;
}
