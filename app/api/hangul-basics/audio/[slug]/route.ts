import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type HangulBasicsAudioRouteProps = {
  params: Promise<{ slug: string }>;
};

const hangulBasicsBucket = process.env.SUPABASE_HANGUL_BASICS_BUCKET ?? "hangul-basics";
const slugPattern = /^c[0-9a-f]+-v[0-9a-f]+$/;

export async function GET(_request: Request, { params }: HangulBasicsAudioRouteProps) {
  const { slug } = await params;

  if (!slugPattern.test(slug)) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const objectKey = `hangul-basics/audio/${slug}/ko_normal.wav`;
    const { data, error } = await supabase.storage
      .from(hangulBasicsBucket)
      .download(objectKey);

    if (error || !data) {
      return NextResponse.json({ error: "Audio not found" }, { status: 404 });
    }

    return new Response(data, {
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "private, max-age=300",
        "Content-Disposition": `inline; filename="${slug}.wav"`,
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Audio provider is not configured";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
