# Phrase Library

The phrase pages are generated from `data/phrases/phrases.seed.csv`.

## Updating Phrases

Add or edit rows in `data/phrases/phrases.seed.csv`, then run:

```bash
npm run validate:phrases
npm run typecheck
npm run build
```

Important routing fields:

- `slug`: stable app/content identifier.
- `page_slug`: URL segment under `/phrases`.
- `canonical_path`: canonical URL, usually `/phrases/{page_slug}`.
- `is_published`: controls whether the page can render.
- `pseo_page_enabled`: controls whether the pSEO page exists.
- `indexable`: controls page metadata robots.
- `sitemap_include`: controls sitemap inclusion.
- `rollout_batch`: use `hold_noindex` for pages that should stay out of sitemap.

## Adding Audio

The default provider is local public audio. Put files under `public/` using the
same key stored in the CSV:

```txt
public/phrases/{slug}/ko_normal.wav
public/phrases/{slug}/ko_slow.wav
```

CSV fields:

- `normal_audio_asset_key`: normal-speed Korean audio.
- `slow_audio_asset_key`: slow Korean audio.
- `normal_timing_asset_key`: future timing data.

If audio is missing, the page still renders and hides the unavailable controls.

For protected Supabase audio, keep the CSV asset keys unchanged and set:

```bash
PHRASE_AUDIO_PROVIDER=supabase
SUPABASE_PHRASE_AUDIO_BUCKET=phrases
SUPABASE_SERVICE_ROLE_KEY=...
PHRASE_AUDIO_SIGNED_URL_TTL=60
```

The route at `app/api/phrase-audio/[slug]/route.ts` creates a short-lived
signed URL for the object key stored in `normal_audio_asset_key` or
`slow_audio_asset_key`.

To bulk upload only the Korean normal and slow WAV files referenced by the CSV:

```bash
npm run upload:phrase-audio
npm run upload:phrase-audio -- --execute
```

The first command is a dry run. The upload script skips `drill.wav`,
`en_normal.wav`, timing JSON files, and any audio that is not referenced by
`data/phrases/phrases.seed.csv`.

If you need to overwrite existing objects:

```bash
npm run upload:phrase-audio -- --execute --force
```

To upload only timing JSON files:

```bash
npm run upload:phrase-timings
npm run upload:phrase-timings -- --execute
```

To retry a specific set of object keys:

```bash
npm run upload:phrase-audio -- --execute --only=phrases/example/ko_normal.wav,phrases/example/ko_slow.wav
```

## SEO Rules

Titles, descriptions, H1s, canonicals, and robots directives are generated from
helpers in `lib/phrases/phrase-seo.ts`. The CSV `seo_title` and
`meta_description` fields are retained as seed/reference data, not final copy.

Sitemap entries come from `app/sitemap.ts`. Phrase pages are included only when
they are published, pSEO-enabled, indexable, sitemap-enabled, and not in
`hold_noindex`.
