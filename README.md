# Felipe Figueiredo — personal website

An editorial portfolio built with Next.js, React, TypeScript and pnpm. English and Brazilian Portuguese pages are statically generated with localized document languages. The design uses Cormorant Garamond, Source Sans 3, cream, sage and forest green, with a separate dark palette.

## Run and check

```bash
pnpm install --frozen-lockfile
pnpm dev --hostname 0.0.0.0 --port 3000
```

For the verified production preview:

```bash
pnpm build
pnpm typecheck
pnpm test:e2e
pnpm start --hostname 0.0.0.0 --port 3001
```

Open `http://localhost:3001` on the machine running the server. Browser tests start their own production server on port 3100. Use `pnpm exec playwright install chromium` if Chromium is unavailable, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. No lint script is configured in this repository.

Optional rendered evidence:

```bash
PREVIEW_URL=http://127.0.0.1:3001 SCREENSHOT_DIR=/tmp/felipe-preview node scripts/inspect-site.mjs
```

## Update facts and research

- `lib/site.ts`: professional facts, experience, manuscript and conference output records, skills, download paths. `status: "published"` means visible on the website; scholarly progress is separately represented by `stage` or `format`.
- `lib/research.ts`: study relationships, selected cases and unified searchable records. Add a stable output `id` and `studyId`. Similar titles do not establish a shared study. Never infer presentation delivery from acceptance or publication from review.
- `lib/history.ts`: Portuguese experience translations. Keep the language pair aligned with the same source records.
- `lib/locale.ts`: shared route and status translations. Essential page compositions live in `components/pages`; both languages render the same templates. `app/(en)` and `app/(pt)` provide static document languages without changing established URLs.
- Counts come from records. A library record can be a study or an output; it is not necessarily a publication. Keep incomplete bylines absent rather than inventing them.
- Preserve exact citation titles and author order. Concise selected-case headings are summaries. Specific contributions require evidence beyond author position.

The source for the October update is the actual user-supplied `FelipeCVLatest.docx`, modified October 21, 2026. Earlier ongoing studies and general research experience are retained from the September source without inventing new stages. The single current [implementation record](docs/implementation-2026-10.md) contains reconciliation, review findings and verification limits. Historical September records remain historical.

## Replace the CV

1. Read the complete new source, including any tables/images, and reconcile `lib/site.ts` and translations.
2. Copy the original DOCX byte-for-byte to `public/cv/Felipe_de_Carvalho_Figueiredo_CV.docx`.
3. Set the fixed source/version date in `scripts/render-cv.py` and the CV page, then run:

```bash
python scripts/render-cv.py
```

The script requires python-docx, ReportLab and DejaVu fonts. It deliberately stops if a new source contains tables/images that the exporter does not support. Compare all extracted PDF text with the DOCX, inspect every PDF page, then update checksums in `docs/cv-assets.json`. Keep the two stable download URLs unchanged. Do not automatically advance a fact-check date. The HTML CV includes retained research history; the source downloads preserve the supplied document, including its selective scope.

## Writing and assets

The three existing article slugs live in `content/blog/*.md`. Preserve original `date`; use optional `updated` for substantive revisions. Required frontmatter is `title`, `summary` (30+ characters), and ISO `date`; `language` defaults to `en`, `status` defaults to `published`. Draft posts are omitted from routes and sitemap. Legacy `/notes` paths redirect permanently to `/blog` through `next.config.ts`.

The portrait is the existing real asset, displayed in a crop that excludes lower-chest credential wording. Clinia's workflow is explicitly illustrative and contains synthetic entries; it is not a running product screenshot. The prediction timing diagram is a synthetic teaching example, not a study result.

## Deployment boundary

Production publication is a separate release decision. The production host is `https://www.felipef.com`; Next redirects apex requests permanently and aligns canonical, sitemap, language and social URLs. Verify the host redirect at the actual deployment edge: a pre-existing hosting rule can run before Next.

For a hosted review build, set `SITE_NOINDEX=1` **during the build** (or use Vercel's `VERCEL_ENV=preview`). This configures noindex metadata, robots and response headers. Keep the production deployment indexable. A local loopback preview is not a deployed review site.
