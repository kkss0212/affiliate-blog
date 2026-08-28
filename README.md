# affiliate-blog

English-language guides to Japan's prefectures and municipalities, told
through data and history, funneling readers toward tour/activity bookings
(Klook, Viator, GetYourGuide, Rakuten Travel) and Amazon.co.jp products via
Amazon Associates.

See [`DECISIONS.md`](./DECISIONS.md) for the business/architecture decisions
behind this project and what's still open, and
[`docs/asp-checklist.md`](./docs/asp-checklist.md) for step-by-step ASP
application procedures.

## Stack

- [Astro](https://astro.build) + TypeScript, static output
- Content Collections for structured per-prefecture data
  (`src/content.config.ts`, entries in `src/content/prefectures/*.md`)
- Tailwind CSS v4
- Deploys to GitHub Pages on push to `main` (`.github/workflows/deploy.yml`)

## Development

```bash
npm install
npm run dev       # local dev server, includes draft entries
npm run build     # type-checks, then builds a production bundle to dist/
                   # (excludes entries with draft: true)
npm run preview   # serve the production build locally
```

## Adding a prefecture

Add a Markdown file under `src/content/prefectures/`. See `kyoto.md` for the
full schema (population/area stats, highlights, products, experiences) —
that file is a structural example only, not fact-checked publishable
content. Keep `draft: true` until the content and affiliate links have been
reviewed; only flip it to `false` when it's ready to go live.
