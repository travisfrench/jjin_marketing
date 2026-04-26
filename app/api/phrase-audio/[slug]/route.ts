import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getPhraseBySlug } from "@/lib/phrases/phrase-data";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PhraseAudioVariant } from "@/lib/phrases/types";

type PhraseAudioRouteProps = {
  params: Promise<{ slug: string }>;
};

const localAudioPublicPrefix = process.env.PHRASE_LOCAL_AUDIO_PUBLIC_PREFIX ?? "";
const phraseAudioBucket = process.env.SUPABASE_PHRASE_AUDIO_BUCKET ?? "phrases";
const signedUrlTtlSeconds = Number(process.env.PHRASE_AUDIO_SIGNED_URL_TTL ?? 60);

function assetKeyToPublicFile(assetKey: string) {
  const publicPath = [localAudioPublicPrefix, assetKey]
    .filter(Boolean)
    .join("/")
    .replace(/^\/+/, "");

  return path.join(process.cwd(), "public", publicPath);
}

function contentTypeFor(filePath: string) {
  if (filePath.endsWith(".mp3")) return "audio/mpeg";
  if (filePath.endsWith(".m4a")) return "audio/mp4";
  if (filePath.endsWith(".ogg")) return "audio/ogg";
  return "audio/wav";
}

export async function GET(request: Request, { params }: PhraseAudioRouteProps) {
  const { slug } = await params;
  const phrase = getPhraseBySlug(slug);
  const variant = new URL(request.url).searchParams.get("variant") as
    | PhraseAudioVariant
    | null;

  if (!phrase || !phrase.isPublished || !phrase.pseoPageEnabled) {
    return NextResponse.json({ error: "Phrase not found" }, { status: 404 });
  }

  const assetKey =
    variant === "slow" ? phrase.slowAudioAssetKey : phrase.normalAudioAssetKey;

  if (!assetKey) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }

  if (
    process.env.PHRASE_AUDIO_PROVIDER === "supabase" ||
    process.env.PHRASE_AUDIO_PROVIDER === "protected-route"
  ) {
    try {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase.storage
        .from(phraseAudioBucket)
        .createSignedUrl(assetKey, signedUrlTtlSeconds);

      if (error || !data?.signedUrl) {
        return NextResponse.json({ error: "Audio not found" }, { status: 404 });
      }

      const response = NextResponse.redirect(data.signedUrl, 307);
      response.headers.set("Cache-Control", "private, no-store");
      response.headers.set("X-Robots-Tag", "noindex");
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Audio provider is not configured";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  try {
    const filePath = assetKeyToPublicFile(assetKey);
    const file = await fs.readFile(filePath);

    return new Response(file, {
      headers: {
        "Content-Type": contentTypeFor(filePath),
        "Cache-Control": "public, max-age=3600",
        "Content-Disposition": `inline; filename="${path.basename(filePath)}"`,
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }
}
