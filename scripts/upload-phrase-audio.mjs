import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const defaultSourceRoot =
  "/Users/travisfrench/Jinjja/speech-pipeline/output/phrases";
const seedPath = path.join(process.cwd(), "data", "phrases", "phrases.seed.csv");

const args = new Set(process.argv.slice(2));
const execute = args.has("--execute");
const force = args.has("--force");
const includeAudio = !args.has("--timings-only");
const includeTimings = args.has("--include-timings") || args.has("--timings-only");
const sourceRootArg = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--source-root="));
const onlyArg = process.argv.slice(2).find((arg) => arg.startsWith("--only="));
const sourceRoot = sourceRootArg
  ? sourceRootArg.replace("--source-root=", "")
  : defaultSourceRoot;
const onlyAssetKeys = new Set(
  onlyArg
    ? onlyArg
        .replace("--only=", "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [],
);

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

function contentTypeFor(filePath) {
  if (filePath.endsWith(".json")) return "application/json";
  if (filePath.endsWith(".mp3")) return "audio/mpeg";
  if (filePath.endsWith(".m4a")) return "audio/mp4";
  if (filePath.endsWith(".ogg")) return "audio/ogg";
  return "audio/wav";
}

readEnvFile(path.join(process.cwd(), ".env.local"));

const bucket = process.env.SUPABASE_PHRASE_AUDIO_BUCKET ?? "phrases";
const rows = parseCsv(fs.readFileSync(seedPath, "utf8"));
const uploadItems = [];
const missing = [];
const seen = new Set();

for (const row of rows) {
  if (!row.slug || !bool(row.is_published) || !bool(row.pseo_page_enabled)) {
    continue;
  }

  const candidates = [];

  if (includeAudio) {
    candidates.push(["normal", row.normal_audio_asset_key]);
    candidates.push(["slow", row.slow_audio_asset_key]);
  }

  if (includeTimings) {
    candidates.push([
      "normal-timing",
      row.normal_timing_asset_key ||
        row.normal_audio_asset_key?.replace(/\.wav$/i, ".timings.json"),
    ]);
    candidates.push([
      "slow-timing",
      row.slow_audio_asset_key?.replace(/\.wav$/i, ".timings.json"),
    ]);
  }

  for (const [variant, assetKey] of candidates) {
    if (!assetKey || seen.has(assetKey)) continue;
    if (onlyAssetKeys.size && !onlyAssetKeys.has(assetKey)) continue;
    seen.add(assetKey);

    const fileName = path.basename(assetKey);
    const localPath = path.join(sourceRoot, row.slug, fileName);

    if (!fs.existsSync(localPath)) {
      missing.push({ slug: row.slug, variant, assetKey, localPath });
      continue;
    }

    uploadItems.push({
      slug: row.slug,
      variant,
      assetKey,
      localPath,
      size: fs.statSync(localPath).size,
    });
  }
}

const totalBytes = uploadItems.reduce((sum, item) => sum + item.size, 0);

console.log(`Source root: ${sourceRoot}`);
console.log(`Bucket: ${bucket}`);
console.log(`Mode: ${execute ? "upload" : "dry-run"}`);
console.log(
  `File types: ${[
    includeAudio ? "audio" : null,
    includeTimings ? "timings" : null,
  ]
    .filter(Boolean)
    .join(", ")}`,
);
if (onlyAssetKeys.size) {
  console.log(`Filtered object keys: ${onlyAssetKeys.size}`);
}
console.log(`Files to upload: ${uploadItems.length}`);
console.log(`Missing local files: ${missing.length}`);
console.log(`Total upload size: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);

if (missing.length) {
  console.warn("\nMissing files");
  for (const item of missing.slice(0, 30)) {
    console.warn(`- ${item.slug} ${item.variant}: ${item.localPath}`);
  }
  if (missing.length > 30) {
    console.warn(`- ... ${missing.length - 30} more`);
  }
}

console.log("\nSample upload keys");
for (const item of uploadItems.slice(0, 12)) {
  console.log(`- ${item.localPath} -> ${bucket}/${item.assetKey}`);
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
  const { error } = await supabase.storage.from(bucket).upload(item.assetKey, file, {
    contentType: contentTypeFor(item.localPath),
    cacheControl: "31536000",
    upsert: force,
  });

  if (error) {
    failed += 1;
    console.error(`Failed: ${item.assetKey} (${error.message})`);
  } else {
    uploaded += 1;
    console.log(`Uploaded: ${item.assetKey}`);
  }
}

console.log(`\nDone. Uploaded: ${uploaded}. Failed: ${failed}.`);

if (failed > 0) {
  process.exitCode = 1;
}
