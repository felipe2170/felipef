# Felipe de Carvalho Figueiredo — Personal Website

Next.js website optimized for academic/professional SEO and long-term update ease.

## Local development

```bash
npm install
npm run dev
```

## Replace placeholders

- **Portrait**: add image at `public/images/felipe-portrait.jpg` and update home placeholder text.
- **CV PDF**: replace `public/cv/Felipe_de_Carvalho_Figueiredo_CV.pdf`.
- **LinkedIn / Lattes**: edit links in `lib/site.ts`.
- **Project screenshots**: add files under `public/images/` and replace placeholder copy in `app/projects/page.tsx`.
- **Institutional logos/headshots**: place in `public/images/` and reference in page components.

## Content updates

- **Blog/News entries**: add markdown files to `content/posts/*.md` with frontmatter:
  - `title`
  - `date` (YYYY-MM-DD)
  - `excerpt`
- **CV sections**: update `app/cv/page.tsx`.
- **Research/publications**: update `app/research/page.tsx`.

## SEO files

- Metadata + OpenGraph/Twitter: `app/layout.tsx` and per-page metadata in each route.
- Sitemap: `app/sitemap.ts`
- Robots: `public/robots.txt`
