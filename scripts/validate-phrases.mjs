import fs from "node:fs";
import path from "node:path";

const seedPath = path.join(process.cwd(), "data", "phrases", "phrases.seed.csv");

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

function list(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function localAudioExists(assetKey) {
  if (!assetKey) return false;
  return fs.existsSync(path.join(process.cwd(), "public", assetKey));
}

const rows = parseCsv(fs.readFileSync(seedPath, "utf8"));
const errors = [];
const warnings = [];
const slugSet = new Set(rows.map((row) => row.slug).filter(Boolean));
const pageSlugCounts = new Map();

for (const row of rows) {
  pageSlugCounts.set(row.page_slug, (pageSlugCounts.get(row.page_slug) ?? 0) + 1);
}

for (const row of rows) {
  const label = row.slug || "(missing slug)";
  const published = bool(row.is_published);
  const pseoEnabled = bool(row.pseo_page_enabled);
  const indexable = bool(row.indexable);
  const sitemapInclude = bool(row.sitemap_include);
  const robotsDirective = row.robots_directive.toLowerCase();

  if (!row.slug) errors.push(`${label}: missing slug`);
  if (!row.page_slug) errors.push(`${label}: missing page_slug`);
  if (!row.korean_text) errors.push(`${label}: missing korean_text`);
  if (!row.english_text) errors.push(`${label}: missing english_text`);

  for (const relatedSlug of list(row.related_slugs)) {
    if (!slugSet.has(relatedSlug)) {
      warnings.push(`${label}: related_slug does not resolve: ${relatedSlug}`);
    }
    if (relatedSlug === row.slug) {
      warnings.push(`${label}: related_slug points to itself`);
    }
  }

  if (indexable) {
    for (const field of [
      "page_template_key",
      "canonical_path",
      "parent_hub_slug",
      "parent_hub_path",
      "primary_query",
    ]) {
      if (!row[field]) errors.push(`${label}: indexable row missing ${field}`);
    }
  }

  if (indexable && robotsDirective.includes("noindex")) {
    errors.push(`${label}: indexable=true but robots_directive contains noindex`);
  }

  if (!indexable && sitemapInclude) {
    errors.push(`${label}: noindex row has sitemap_include=true`);
  }

  if (sitemapInclude && row.rollout_batch === "hold_noindex") {
    errors.push(`${label}: hold_noindex row has sitemap_include=true`);
  }

  if (published && pseoEnabled && indexable && !sitemapInclude) {
    warnings.push(`${label}: indexable page is not included in sitemap`);
  }

  if (row.normal_audio_asset_key && !localAudioExists(row.normal_audio_asset_key)) {
    warnings.push(`${label}: local normal audio missing: ${row.normal_audio_asset_key}`);
  }

  if (row.slow_audio_asset_key && !localAudioExists(row.slow_audio_asset_key)) {
    warnings.push(`${label}: local slow audio missing: ${row.slow_audio_asset_key}`);
  }
}

for (const [pageSlug, count] of pageSlugCounts.entries()) {
  if (pageSlug && count > 1) {
    errors.push(`duplicate page_slug: ${pageSlug} (${count} rows)`);
  }
}

console.log(`Phrase rows: ${rows.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length) {
  console.error("\nErrors");
  for (const error of errors) console.error(`- ${error}`);
}

if (warnings.length) {
  console.warn("\nWarnings");
  for (const warning of warnings.slice(0, 80)) console.warn(`- ${warning}`);
  if (warnings.length > 80) {
    console.warn(`- ... ${warnings.length - 80} more warnings`);
  }
}

if (errors.length) {
  process.exitCode = 1;
}
