import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const hangulBasicsBucket = process.env.SUPABASE_HANGUL_BASICS_BUCKET ?? "hangul-basics";
const manifestObjectKey = "hangul-basics/manifest.json";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.storage
      .from(hangulBasicsBucket)
      .download(manifestObjectKey);

    if (!error && data) {
      return new Response(await data.text(), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "private, max-age=300",
          "X-Robots-Tag": "noindex",
        },
      });
    }
  } catch {
    // Fall back to the checked-in manifest for local development.
  }

  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "data", "hangul-basics", "manifest.json"),
      "utf8",
    );

    return new Response(file, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "private, max-age=300",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Hangul Basics manifest not found" },
      { status: 404 },
    );
  }
}
