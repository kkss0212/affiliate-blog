# Project decisions log

Captures the business/architecture decisions made for this project, so a new
session can pick up context without re-deriving it. Append new decisions
rather than rewriting history; update the "current state" sections in place.

## Concept

**Site name: Japan Unpacked.** An English-language blog with three sections:
**Prefectures** (profiles of Japan's prefectures and municipalities through
data and history, aimed at readers planning a visit to Japan or already
there, as well as readers abroad who want Japanese regional goods shipped
to them directly), **Music**, and **Manga** (guides to Japanese music and
manga, added specifically because they open Amazon Music Unlimited and
Kindle Unlimited as monetization — see "Monetization"). All three sections
live on one site/domain rather than separate projects, since that means one
Amazon Associates application covers all of them and articles from any
section count toward the 10-published-article threshold (see "Open / not
yet decided"). The content format (data + history deep-dives, artist/series
guides) suits affiliate tracks with no shipping friction: tour/activity
bookings and subscription referrals carry zero delivery risk; shippable
products are split across two retailers so international readers who never
set foot in Japan can still buy (see "Monetization").

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
- **Subscriptions (Music/Manga sections): Amazon Music Unlimited and Kindle
  Unlimited "member referral" programs.** Both are built directly into
  Amazon Associates Central under the same Amazon Associates account
  already planned — no separate signup, no new tax question. Flat referral
  fee per new/eligible sign-up (Amazon Music Unlimited ≈¥1,000, Kindle
  Unlimited ≈¥500 as of the 2026-08-28 check; reconfirm current rates in
  Associates Central before publishing, since Amazon changes these).
  Individual Kindle volumes/CDs can also be linked as ordinary Amazon
  products (`retailer: "amazon"`) alongside the subscription referral.
  Considered and excluded: **Spotify and LINE MUSIC** — both were
  previously available via A8.net's app-only ASP but that's discontinued,
  and neither has a public listing on A8.net or Moshimo Affiliate as of
  this check. No legitimate Japan-domestic route to monetize them exists
  right now; revisit if that changes. (Apple Music/Spotify/Amazon Music's
  *global* affiliate programs run through US-based networks like
  Partnerize/FlexOffers — using those would reopen the W-8BEN question,
  same reasoning as the Bokksu/TokyoTreat decision above, so they're not
  used even though Amazon Music's global program exists.)
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
  Collections** for structured content (schema in `src/content.config.ts`).
  Three collections: `prefectures` (population, area, history, products,
  experiences), and `music`/`manga` (shared `cultureGuide` schema: title,
  highlights, `products` + `subscriptions`). Chosen for SEO performance
  (minimal JS, fast builds) and because this data maps cleanly onto typed
  collection schemas instead of a general-purpose CMS. Pages live under
  `src/pages/{prefectures,music,manga}/`.
- **Tailwind CSS v4** (`@tailwindcss/vite`) for styling.
- **Hosting: GitHub Pages** via `.github/workflows/deploy.yml`, deploying on
  push to `main`. Chosen as the default because it requires no new external
  account — consistent with the "don't add new automation/accounts beyond
  what's officially needed" principle from life-story-bot. Switching to
  Vercel/Netlify later is a config change, not a rewrite, if a custom
  domain or ISR/edge features are needed.
- Domain: not yet decided. `astro.config.mjs` currently points at the
  GitHub Pages project URL (`https://kkss0212.github.io/japan-unpacked`)
  with `base: "/japan-unpacked"` — update `SITE_URL`/`BASE_PATH` there (and
  `public/robots.txt`'s sitemap line) once a custom domain is chosen.
- The GitHub repo itself was renamed from `affiliate-blog` to
  `japan-unpacked` because the word "affiliate" showing up directly in the
  public URL felt too on-the-nose. Same reasoning would apply to any future
  repo/URL naming — avoid words that broadcast the monetization mechanism.

## Editorial/publishing gate

- Content lives as Markdown files under `src/content/{prefectures,music,manga}/`,
  each with a `draft: true/false` flag. Production builds (`import.meta.env.PROD`)
  filter out drafts, so a page only goes live once someone flips `draft` to
  `false` — this is the manual confirmation gate (same principle as
  life-story-bot's "a human confirms before anything publishes").
- All affiliate URLs in committed example content use obvious placeholders
  (`EXAMPLE`, `YOUR-ASSOCIATE-ID`, `YOUR-AFFILIATE-ID`). Real tagged links
  should only be filled in once the corresponding ASP account is approved.

## Open / not yet decided

- Custom domain and final hosting choice.
- Which prefectures/municipalities/music topics/manga series to launch
  with, and the actual research + fact-checking pass for each (`kyoto.md`,
  `city-pop.md`, and `one-piece.md` in the repo are structural examples
  only, not verified publishable content).
- ASP account applications: see `docs/asp-checklist.md` for step-by-step
  procedures. Rakuten Affiliate/Travel, Viator, Klook/GetYourGuide (via
  Travelpayouts, to avoid Awin's small refundable deposit), and Japan Trend
  Shop have no content-count requirement and can be applied for any time.
  **Amazon Associates requires at least 10 published (`draft: false`)
  articles first**, counted across all three sections (prefectures + music
  + manga) since they'll all be covered by the same Associates account —
  as of 2026-08-28 there are 0 (all three example files are still drafts).
  The user explicitly asked to be told once that threshold is hit: whenever
  a session brings the published count to 10+, prompt them to start the
  Amazon Associates application (which also unlocks the Amazon Music
  Unlimited / Kindle Unlimited referral links).
- Whether to add TokyoTreat/Sakuraco once their affiliate payout tax
  treatment (W-9 vs. W-8BEN at signup) is confirmed.
- Instagram/X account setup and posting cadence.
