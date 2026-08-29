# Japan Unpacked

English-language guides across four sections — Prefectures, Municipalities,
Music, and Manga — funneling readers toward tour/activity bookings (Klook,
Viator, GetYourGuide, Rakuten Travel), shippable products (Amazon
Associates, Japan Trend Shop), and subscription referrals (Amazon Music
Unlimited, Kindle Unlimited).

Live at <https://kkss0212.github.io/>.

See [`DECISIONS.md`](./DECISIONS.md) for the business/architecture decisions
behind this project and what's still open, and
[`docs/asp-checklist.md`](./docs/asp-checklist.md) for step-by-step ASP
application procedures.

## Stack

- [Astro](https://astro.build) + TypeScript, static output
- Content Collections for structured content (`src/content.config.ts`):
  `prefectures`, `municipalities`, `music`, `manga` — entries under
  `src/content/<collection>/*.md`
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

## Adding content

Add a Markdown file under `src/content/prefectures/`,
`src/content/municipalities/`, `src/content/music/`, or
`src/content/manga/`. See `kyoto.md`, `uji.md`, `city-pop.md`, and
`one-piece.md` for the schemas — those files are structural examples only,
not fact-checked publishable content. A municipality's `prefecture` field
must match an existing prefecture entry's filename (e.g. `kyoto`). Keep
`draft: true` until the content and affiliate links have been reviewed;
only flip it to `false` when it's ready to go live.
