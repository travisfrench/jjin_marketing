import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const seedPath = path.join(
  process.cwd(),
  "data",
  "hangul-basics",
  "hangul_basics_seed.csv",
);
const dataRoot = path.join(process.cwd(), "data", "hangul-basics");
const manifestPath = path.join(dataRoot, "manifest.json");
const objectPrefix = "hangul-basics";

const args = new Set(process.argv.slice(2));
const execute = args.has("--execute");
const force = args.has("--force") || args.has("--execute");
const manifestOnly = args.has("--manifest-only");
const audioOnly = args.has("--audio-only");
const sourceRootArg = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--source-root="));
const audioRoot = sourceRootArg
  ? sourceRootArg.replace("--source-root=", "")
  : path.join(dataRoot, "audio");

if (manifestOnly && audioOnly) {
  throw new Error("Use either --manifest-only or --audio-only, not both.");
}

const choseongIndex = {
  ㄱ: 0,
  ㄴ: 2,
  ㄷ: 3,
  ㄹ: 5,
  ㅁ: 6,
  ㅂ: 7,
  ㅅ: 9,
  ㅇ: 11,
  ㅈ: 12,
  ㅊ: 14,
  ㅋ: 15,
  ㅌ: 16,
  ㅍ: 17,
  ㅎ: 18,
};

const jungseongIndex = {
  ㅏ: 0,
  ㅐ: 1,
  ㅑ: 2,
  ㅓ: 4,
  ㅔ: 5,
  ㅕ: 6,
  ㅗ: 8,
  ㅛ: 12,
  ㅜ: 13,
  ㅠ: 17,
  ㅡ: 18,
  ㅣ: 20,
};

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed
      .slice(separatorIndex + 1)
      .replace(/^['"]|['"]$/g, "");

    process.env[key] ??= value;
  }
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") index += 1;
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some(Boolean)) rows.push(row);

  const [headers, ...body] = rows;
  return body.map((values) =>
    headers.reduce((record, header, index) => {
      record[header] = values[index] ?? "";
      return record;
    }, {}),
  );
}

function bool(value) {
  return value.trim().toLowerCase() === "true";
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function sortSymbols(left, right) {
  const sortDelta = left.sortOrder - right.sortOrder;
  return sortDelta === 0
    ? left.symbol.localeCompare(right.symbol, "ko")
    : sortDelta;
}

function composeHangulSyllable(consonant, vowel) {
  const choseong = choseongIndex[consonant];
  const jungseong = jungseongIndex[vowel];

  if (choseong === undefined) {
    throw new Error(`Unsupported Hangul Basics consonant: ${consonant}`);
  }
  if (jungseong === undefined) {
    throw new Error(`Unsupported Hangul Basics vowel: ${vowel}`);
  }

  const codepoint = 0xac00 + ((choseong * 21 + jungseong) * 28);
  return String.fromCodePoint(codepoint);
}

function slugFor(consonant, vowel) {
  return `c${consonant.codePointAt(0).toString(16)}-v${vowel
    .codePointAt(0)
    .toString(16)}`;
}

function contentTypeFor(filePath) {
  if (filePath.endsWith(".json")) return "application/json";
  if (filePath.endsWith(".wav")) return "audio/wav";
  return "application/octet-stream";
}

function loadSymbols() {
  const rows = parseCsv(fs.readFileSync(seedPath, "utf8"));
  const symbols = rows
    .filter((row) => bool(row.is_published ?? "false"))
    .map((row) => ({
      kind: row.kind.trim().toLowerCase(),
      symbol: row.symbol.trim(),
      romanization: row.romanization.trim(),
      sortOrder: Number.parseInt(row.sort_order, 10),
      isPublished: true,
    }));

  const consonants = symbols
    .filter((row) => row.kind === "consonant")
    .sort(sortSymbols);
  const vowels = symbols.filter((row) => row.kind === "vowel").sort(sortSymbols);

  if (!consonants.length) {
    throw new Error("Seed CSV does not contain any published consonants.");
  }
  if (!vowels.length) {
    throw new Error("Seed CSV does not contain any published vowels.");
  }

  return { consonants, vowels };
}

function buildManifest() {
  const { consonants, vowels } = loadSymbols();
  const items = [];

  for (const consonant of consonants) {
    for (const vowel of vowels) {
      const slug = slugFor(consonant.symbol, vowel.symbol);
      items.push({
        id: slug,
        slug,
        consonant: consonant.symbol,
        vowel: vowel.symbol,
        syllable: composeHangulSyllable(consonant.symbol, vowel.symbol),
        audioPath: `${objectPrefix}/audio/${slug}/ko_normal.wav`,
      });
    }
  }

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    consonants: consonants.map(({ symbol, romanization, sortOrder, isPublished }) => ({
      symbol,
      romanization,
      sortOrder,
      isPublished,
    })),
    vowels: vowels.map(({ symbol, romanization, sortOrder, isPublished }) => ({
      symbol,
      romanization,
      sortOrder,
      isPublished,
    })),
    items,
  };
}

readEnvFile(path.join(process.cwd(), ".env.local"));

const bucket =
  process.env.SUPABASE_HANGUL_BASICS_BUCKET ??
  process.env.NEXT_PUBLIC_SUPABASE_MARKETING_ASSETS_BUCKET ??
  "jjin-marketing-assets";
const manifest = buildManifest();
const missing = [];
const uploadItems = [
  ...(audioOnly
    ? []
    : [
        {
          objectKey: `${objectPrefix}/manifest.json`,
          localPath: manifestPath,
          size: Buffer.byteLength(JSON.stringify(manifest)),
        },
      ]),
];

if (!manifestOnly) {
  for (const item of manifest.items) {
    const localPath = path.join(audioRoot, item.slug, "ko_normal.wav");
    if (!fs.existsSync(localPath)) {
      missing.push(localPath);
      continue;
    }

    uploadItems.push({
      objectKey: item.audioPath,
      localPath,
      size: fs.statSync(localPath).size,
    });
  }
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const totalBytes = uploadItems.reduce((sum, item) => sum + item.size, 0);

console.log(`Seed CSV: ${seedPath}`);
console.log(`Audio root: ${audioRoot}`);
console.log(`Bucket: ${bucket}`);
console.log(`Mode: ${execute ? "upload" : "dry-run"}`);
console.log(
  `Scope: ${manifestOnly ? "manifest only" : audioOnly ? "audio only" : "manifest and audio"}`,
);
console.log(`Manifest: ${manifest.items.length} syllables`);
console.log(`Files to upload: ${uploadItems.length}`);
console.log(`Missing audio files: ${missing.length}`);
console.log(`Total upload size: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);

if (missing.length) {
  console.error("\nMissing Hangul Basics audio files");
  for (const filePath of missing.slice(0, 30)) {
    console.error(`- ${filePath}`);
  }
  if (missing.length > 30) {
    console.error(`- ... ${missing.length - 30} more`);
  }
  process.exit(1);
}

console.log("\nSample upload keys");
for (const item of uploadItems.slice(0, 12)) {
  console.log(`- ${item.localPath} -> ${bucket}/${item.objectKey}`);
}

if (!execute) {
  console.log("\nDry run only. Add --execute to upload.");
  process.exit(0);
}

const supabase = createClient(
  requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

let uploaded = 0;
let failed = 0;

for (const item of uploadItems) {
  const file = fs.readFileSync(item.localPath);
  const { error } = await supabase.storage.from(bucket).upload(item.objectKey, file, {
    contentType: contentTypeFor(item.localPath),
    cacheControl: item.objectKey.endsWith(".json") ? "300" : "31536000",
    upsert: force,
  });

  if (error) {
    failed += 1;
    console.error(`Failed: ${item.objectKey} (${error.message})`);
  } else {
    uploaded += 1;
    console.log(`Uploaded: ${item.objectKey}`);
  }
}

console.log(`\nDone. Uploaded: ${uploaded}. Failed: ${failed}.`);

if (failed > 0) {
  process.exitCode = 1;
}
