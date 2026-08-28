# Project decisions log

Captures the business/architecture decisions made for this project, so a new
session can pick up context without re-deriving it. Append new decisions
rather than rewriting history; update the "current state" sections in place.

## Concept

An English-language blog that profiles Japan's prefectures and municipalities
through data and history, aimed at readers planning a visit to Japan (or
already there) as well as readers abroad who want Japanese regional goods
shipped to them directly. The content format (data + history deep-dives)
suits two affiliate tracks: tour/activity bookings (no shipping involved at
all) and shippable products, split across two retailers so international
readers who never set foot in Japan can still buy (see "Monetization").

## Monetization

- **Products: Amazon Associates (Amazon.co.jp) + Japan Trend Shop.**
  Two retailers, chosen specifically so international shipping isn't
  limited to Amazon.co.jp's narrow AmazonGlobal eligibility:
  - **Amazon.co.jp**: only link products confirmed eligible for AmazonGlobal
    international shipping (~65 countries) — AmazonGlobal excludes most
    food, alcohol, and fresh/perishable items, which rules out a lot of
    regional specialty goods. Treat AmazonGlobal eligibility as a
    pre-publish checklist item, not an assumption (note added directly in
    `kyoto.md`'s example product).
  - **Japan Trend Shop** (operated by OctoTrade Co., Ltd., Tokyo — a Japan
    company, so this doesn't reopen the US-withholding question): ships
    worldwide at a flat rate, runs its own affiliate program (up to ~7%
    commission), and covers the gadgets/design-goods/local-craft category
    that AmazonGlobal often excludes.
  - Considered and deliberately excluded for now: **Bokksu** (US/New York
    company — would reopen the W-8BEN/US-withholding question this
    project is specifically avoiding). **TokyoTreat/Sakuraco** (Tokyo-based,
    so promising for food/snack-style regional specialties) were left out
    of the initial build only because their affiliate payouts run through
    US-based ad networks (FlexOffers/CJ/Refersion) whose actual tax
    treatment wasn't verified — reconsider them once someone checks at
    signup whether they issue a W-9 or W-8BEN request. **Rakuten
    Global Market** (Rakuten's own cross-border storefront) is not an
    option — Rakuten shut it down in 2020; individual Rakuten Ichiba shops
    occasionally offer their own international shipping, but that would
    need per-shop verification and isn't worth the operational overhead
    at this stage.
- **Experiences/tours: Klook, Viator, GetYourGuide, Rakuten Travel.** These
  book online with no cross-border shipping at all, so they carry zero
  delivery-eligibility risk. This is the primary monetization track;
  products are secondary and support it.
- Accounts for all of the above are not yet created. Amazon Associates in
  particular typically requires the site to already have real content before
  approval, and can close the account if it doesn't generate qualifying
  sales within its trial window (currently 180 days at signup — reconfirm
  the exact terms at signup time since ASP terms change).

## Traffic

- Primary channels: Instagram and X, plus organic SEO on the blog itself.
- No official API-based automation exists for Instagram/X *posting*
  bot-style at this stage of the project — following the same principle
  used on life-story-bot ("don't automate what isn't officially supported"),
  revisit this only if/when using each platform's official API.

## Tax & regulatory (Japan resident, English content, Japan-domestic ASPs)

- Japan taxes residents on worldwide income; the audience's language/country
  has no bearing on the filing obligation. Affiliate income is reported via
  確定申告 as 雑所得 (side income) or 事業所得 (business income) depending on
  scale — full amounts, including anything sitting unpaid in an ASP account,
  must be declared.
- Because every ASP in the current plan (Amazon Associates JP, Japan Trend
  Shop, Klook, Viator, GetYourGuide, Rakuten Travel) pays a Japan resident
  from a Japan-facing program, there is no US withholding tax exposure and
  no W-8BEN requirement. (This was the deciding factor versus using
  US-based ASPs like Amazon Associates US/ShareASale/CJ/Bokksu — see
  conversation history for that comparison; it does not need to be
  re-litigated. Any future addition to this ASP list should be checked
  against this constraint first.)
- Verify specifics with a licensed tax accountant (税理士) before filing;
  this log is not tax advice.
- Disclosure: every page with affiliate links needs a clear, nearby
  disclosure statement (implemented as `AffiliateDisclosure.astro`) to
  satisfy both the US FTC endorsement guidelines (English-reading audience)
  and Japan's stealth-marketing rules (景品表示法, since the operator is
  Japan-based).

## Tech stack

- **Astro** (static site generation) + **TypeScript** + **Content
  Collections** for structured per-prefecture data (schema in
  `src/content.config.ts`). Chosen for SEO performance (minimal JS,
  fast builds) and because the prefecture data model (population, area,
  history, products, experiences) maps cleanly onto a typed collection
  schema instead of a general-purpose CMS.
- **Tailwind CSS v4** (`@tailwindcss/vite`) for styling.
- **Hosting: GitHub Pages** via `.github/workflows/deploy.yml`, deploying on
  push to `main`. Chosen as the default because it requires no new external
  account — consistent with the "don't add new automation/accounts beyond
  what's officially needed" principle from life-story-bot. Switching to
  Vercel/Netlify later is a config change, not a rewrite, if a custom
  domain or ISR/edge features are needed.
- Domain: not yet decided. `astro.config.mjs` currently points at the
  GitHub Pages project URL (`https://kkss0212.github.io/affiliate-blog`)
  with `base: "/affiliate-blog"` — update `SITE_URL`/`BASE_PATH` there (and
  `public/robots.txt`'s sitemap line) once a custom domain is chosen.

## Editorial/publishing gate

- Content lives as Markdown files under `src/content/prefectures/`, each
  with a `draft: true/false` flag. Production builds (`import.meta.env.PROD`)
  filter out drafts, so a page only goes live once someone flips `draft` to
  `false` — this is the manual confirmation gate (same principle as
  life-story-bot's "a human confirms before anything publishes").
- All affiliate URLs in committed example content use obvious placeholders
  (`EXAMPLE`, `YOUR-ASSOCIATE-ID`, `YOUR-AFFILIATE-ID`). Real tagged links
  should only be filled in once the corresponding ASP account is approved.

## Open / not yet decided

- Custom domain and final hosting choice.
- Which prefectures/municipalities to launch with, and the actual
  historical/statistical research + fact-checking pass for each (the
  `kyoto.md` file in the repo is a structural example only, not verified
  publishable content).
- Amazon Associates JP / Japan Trend Shop / Klook / Viator / GetYourGuide /
  Rakuten Travel account applications — not yet started.
- Whether to add TokyoTreat/Sakuraco once their affiliate payout tax
  treatment (W-9 vs. W-8BEN at signup) is confirmed.
- Instagram/X account setup and posting cadence.
