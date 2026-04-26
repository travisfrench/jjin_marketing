import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getPhraseBySlug } from "@/lib/phrases/phrase-data";
import { getPhraseTimingAssetKey } from "@/lib/phrases/phrase-timings";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PhraseAudioVariant } from "@/lib/phrases/types";

type PhraseTimingsRouteProps = {
  params: Promise<{ slug: string }>;
};

const localAudioPublicPrefix = process.env.PHRASE_LOCAL_AUDIO_PUBLIC_PREFIX ?? "";
const phraseAudioBucket = process.env.SUPABASE_PHRASE_AUDIO_BUCKET ?? "phrases";

function assetKeyToPublicFile(assetKey: string) {
  const publicPath = [localAudioPublicPrefix, assetKey]
    .filter(Boolean)
    .join("/")
    .replace(/^\/+/, "");

  return path.join(process.cwd(), "public", publicPath);
}

function jsonResponse(data: unknown) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "private, max-age=300",
      "X-Robots-Tag": "noindex",
    },
  });
}

export async function GET(request: Request, { params }: PhraseTimingsRouteProps) {
  const { slug } = await params;
  const phrase = getPhraseBySlug(slug);
  const variant = new URL(request.url).searchParams.get("variant") as
    | PhraseAudioVariant
    | null;
  const resolvedVariant = variant === "slow" ? "slow" : "normal";

  if (!phrase || !phrase.isPublished || !phrase.pseoPageEnabled) {
    return NextResponse.json({ error: "Phrase not found" }, { status: 404 });
  }

  const assetKey = getPhraseTimingAssetKey(phrase, resolvedVariant);

  if (!assetKey) {
    return NextResponse.json({ error: "Timing not found" }, { status: 404 });
  }

  if (
    process.env.PHRASE_AUDIO_PROVIDER === "supabase" ||
    process.env.PHRASE_AUDIO_PROVIDER === "protected-route"
  ) {
    try {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase.storage
        .from(phraseAudioBucket)
        .download(assetKey);

      if (error || !data) {
        return NextResponse.json({ error: "Timing not found" }, { status: 404 });
      }

      return jsonResponse(JSON.parse(await data.text()));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Timing provider is not configured";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  try {
    const file = await fs.readFile(assetKeyToPublicFile(assetKey), "utf8");
    return jsonResponse(JSON.parse(file));
  } catch {
    return NextResponse.json({ error: "Timing not found" }, { status: 404 });
  }
}
