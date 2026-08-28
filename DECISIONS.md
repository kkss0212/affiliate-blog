# Project decisions log

Captures the business/architecture decisions made for this project, so a new
session can pick up context without re-deriving it. Append new decisions
rather than rewriting history; update the "current state" sections in place.

## Concept

**Site name: Japan Unpacked.** An English-language blog with four sections:
**Prefectures** and **Municipalities** (profiles of Japan's 47 prefectures
and, at finer grain, individual cities/wards/towns/villages within them,
through data and history — aimed at readers planning a visit to Japan or
already there, as well as readers abroad who want Japanese regional goods
shipped to them directly), **Music**, and **Manga** (guides to Japanese
music and manga, added specifically because they open Amazon Music
Unlimited and Kindle Unlimited as monetization — see "Monetization").
Municipalities are a separate content collection from prefectures (schema
in `src/content.config.ts`), each pointing back at its parent prefecture
via a typed `reference()`, rather than being folded into the prefecture
entry itself — a municipality profile (e.g. Uji within Kyoto Prefecture)
goes into more local detail than its prefecture-level parent, with its own
history, products, and experiences. All four sections live on one
site/domain rather than separate projects, since that means one Amazon
Associates application covers all of them and articles from any section
count toward the 10-published-article threshold (see "Open / not yet
decided"). The content format (data + history deep-dives, artist/series
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
- **Experiences/tours: Viator, GetYourGuide, Rakuten Travel.** These book
  online with no cross-border shipping at all, so they carry zero
  delivery-eligibility risk. This is the primary monetization track;
  products are secondary and support it.
  - **Klook and the original Travelpayouts plan were dropped 2026-08-28.**
    Travelpayouts' new-publisher onboarding now forces installation of
    "Travelpayouts Drive" (a script that auto-scans page content and
    inserts affiliate links/offers) before granting access to the normal
    Programs list / Link Generator — confirmed stuck on this even after
    logout/login. Auto-inserted links bypass this project's core
    "nothing publishes without human review" gate, so it was rejected
    rather than worked around. GetYourGuide moved to **Awin** instead:
    Awin's ~$1-5 signup deposit (refunded on first payout) was the
    original reason Travelpayouts was preferred, but Awin is a UK/German
    company (not US), so it doesn't reopen the W-8BEN question — the
    deposit turned out to be a non-issue. Klook itself has no
    Travelpayouts-free direct signup investigated yet; non-US
    alternatives exist (Involve Asia, vCommission) but weren't pursued to
    keep scope down — Viator + GetYourGuide(Awin) + Rakuten Travel is
    treated as sufficient experience-booking coverage for now. Revisit
    Klook later if desired; avoid FlexOffers/DCMnetwork for it without
    first confirming they're not US-incorporated (same W-8BEN check as
    everything else in this list).
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
  Four collections: `prefectures` and `municipalities` (shared `placeFields`
  schema: population, area, history, products, experiences — municipalities
  add a `prefecture: reference("prefectures")` link back to their parent
  and drop the prefecture-only `region`/`capital` fields), and `music`/
  `manga` (shared `cultureGuide` schema: title, highlights, `products` +
  `subscriptions`). Chosen for SEO performance (minimal JS, fast builds)
  and because this data maps cleanly onto typed collection schemas instead
  of a general-purpose CMS. Pages live under
  `src/pages/{prefectures,municipalities,music,manga}/`.
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

## Analytics, CVR, and traffic security

- **Google Analytics 4** (`src/components/Analytics.astro`, ID in
  `src/consts.ts`), chosen because it's free, official, and gives both
  traffic volume and the ability to track custom events. It only loads
  after a visitor accepts a cookie-consent banner (`localStorage`-backed;
  see `src/pages/privacy.astro`) — the site targets an international
  English-reading audience that may include EU visitors, and GDPR applies
  based on visitor location, not operator location, so opt-in-before-load
  was the safer default. IP addresses are anonymized. `GA_MEASUREMENT_ID`
  is blank until a GA4 property exists; the component renders nothing
  (no script, no banner) while blank, same placeholder pattern as the
  custom-domain TODOs elsewhere in this file.
- **Setup TODO**: create a free GA4 property at analytics.google.com, copy
  its Measurement ID (`G-XXXXXXXXXX`), paste it into `GA_MEASUREMENT_ID` in
  `src/consts.ts`.
- **Affiliate-click tracking**: every affiliate `<a>` already carries
  `rel="sponsored"` plus `data-affiliate-kind` / `data-affiliate-channel` /
  `data-affiliate-name` attributes (added to Product/Experience/
  SubscriptionCard). The Analytics component listens for clicks on any
  `a[rel~="sponsored"]` and fires a GA4 `affiliate_click` event with that
  context — this is the closest free proxy to a conversion signal.
- **What this can't measure — read before trying to compute "the" CVR**:
  GA4 cannot see whether a clicked affiliate link actually turned into a
  purchase or booking, because that transaction happens on Amazon's/
  Rakuten's/Klook's own site, outside this site's control. A real
  visit-to-purchase CVR has to be assembled by hand: GA4 gives the
  denominator (sessions) and the affiliate-click numerator (intent), while
  each ASP's own dashboard (Associates Central, Rakuten Affiliate reports,
  Viator/Travelpayouts/Japan Trend Shop dashboards) gives the actual
  conversion counts, per channel, that GA4 can't see. There is no single
  free tool that unifies this across five different ASPs — expect to pull
  numbers from each dashboard periodically and reconcile manually.
- **Security / suspicious-traffic detection**: scoped to what's realistic
  for a GitHub Pages site with no custom domain yet. GA4's free Realtime
  view and automatic Insights/anomaly detection are the practical starting
  point for spotting an unusual traffic spike. Real bot mitigation / a WAF
  requires fronting the site with a CDN like Cloudflare, which in turn
  requires owning a custom domain (Cloudflare can't proxy a `github.io`
  subdomain) — revisit once the "custom domain" open item above is
  decided. In the meantime, GitHub Pages itself sits behind GitHub's own
  infrastructure, which already absorbs basic volumetric abuse; this is
  not equivalent to an active WAF but isn't undefended either.
- A privacy policy page (`/privacy/`) was added alongside this, describing
  what's collected and why in plain language — it is a reasonable starting
  point, not a substitute for an actual legal/compliance review once the
  site has real traffic and revenue.

## Site structure: prefecture → municipality hierarchy, and Rankings

- Municipality URLs are nested under their parent prefecture
  (`/prefectures/<prefecture>/<municipality>/`, via
  `src/pages/prefectures/[prefecture]/[municipality].astro`) rather than
  living at a flat `/municipalities/<slug>/`. A flat list stops being
  findable once there are meaningfully many municipalities (Japan has
  ~1,700), so the hierarchy needed to be real, not just visual. Each
  prefecture page lists its own municipalities (queried by matching the
  municipality's `prefecture` reference); `/municipalities/` remains as a
  browse-all page, grouped by prefecture.
- **Rankings** (`src/pages/rankings.astro`): a Top-10 list over
  prefectures and/or municipalities, with a scope dropdown (All/
  Prefectures/Municipalities) and a metric dropdown (Population, Foreign
  Visitors, Area, Population Density, Nature Score, Subculture Score).
  Population density is computed at build time (`population / areaKm2`);
  the other metrics are optional schema fields
  (`foreignVisitorsAnnual`/`natureScore`/`subcultureScore` on
  `placeFields`) that an entry can simply omit — the ranking skips it for
  that metric rather than treating a missing value as zero. Implemented
  as a single static page: all place data is serialized to JSON at build
  time and a small client-side script re-sorts/re-renders on dropdown
  change, so this needed no server and no new dependency.
  - `natureScore` and `subcultureScore` are inherently subjective
    (1–10 self-assigned scale) — there's no authoritative public dataset
    for "how subculture is this city." Treat them as editorial judgment
    calls, not sourced statistics, and say so if this ever gets audited.
  - `foreignVisitorsAnnual` should be sourced per-place from JNTO
    (Japan National Tourism Organization) or local prefecture/city tourism
    statistics where available; the example values in `kyoto.md`/`uji.md`
    are illustrative placeholders, not verified figures.
  - Only two example entries exist right now, so the "Top 10" is
    functionally a "Top 2" until more prefectures/municipalities are
    published — the mechanism is what's being built ahead of the content.
  - The homepage also embeds a live two-column preview (Prefectures /
    Municipalities, one shared metric dropdown, Top 10 each) — see
    `src/lib/rankings.ts`, which both `rankings.astro` and `index.astro`
    pull from so the entry/metric logic isn't duplicated.
- **Latest Updates** (homepage, `src/lib/recent.ts`): a "recent releases"
  -style feed — up to 5 most-recently-`updatedDate` entries across all
  four collections (prefectures, municipalities, music, manga), each shown
  as a category pill + title + date, linking to the entry. Positioned
  below Rankings on the homepage (2026-08-28: moved down from between the
  3-card grid and Rankings, per user direction).

## Prefecture page format (2026-08-28)

Fixed the section order/content for all 47 prefecture pages
(`src/pages/prefectures/[slug].astro`), based on the user's spec, so every
prefecture article follows the same shape:

1. **Hero**: name, one-line `tagline`, a schematic "you are here" map
   (`src/components/JapanMap.astro`), optional `heroImage`.
2. **At a glance**: region, capital, population(+year)/trend, area,
   population density (computed, `population / areaKm2`), the existing
   `natureScore`/`subcultureScore` context, plus two new lighter/subjective
   fields — `prefecturalCharacter` (県民性, framed as "often described as,"
   not fact) and `comparedTo` (a Europe/US analog with a stated reason —
   e.g. Kyoto ↔ Florence).
3. **History** (free-form Markdown body, `<Content />`): editorial
   convention (not schema-enforced) is to spend real space on relations
   with the West — since that's what an English-reading, non-Japan-expert
   audience finds most orienting — and on which prefectures/cities this
   one is historically friendly or rivalrous with. See `kyoto.md` for the
   pattern (a "Kyoto and the wider world" + "Neighbors" subsection pair).
4. **Where to go** (`touristSpots[]`): name + description + optional
   `image` (url/alt/credit).
5. **Book an experience** / **Local specialties** / **Made or set in
   {prefecture}**: existing `experiences[]` and `products[]` fields.
   `product.category` (`local-specialty` / `company` / `manga` / `other`)
   is new — it's what lets the page auto-split products into "Local
   specialties" (deliberately weighted away from food, since that's the
   Amazon-affiliate-eligible track — see AmazonGlobal note above),
   "Companies from {prefecture}" (a famous local company's actual
   product — e.g. Nintendo for Kyoto), and "Manga set here" (an Amazon
   link to the manga itself, not a cross-link to the `manga` collection,
   since the `manga` collection is an editorial guide, not "which
   volume is set in this prefecture").
- **Images**: `heroImage`/`touristSpots[].image` are
  `{ url, alt, credit }`. Sourcing plan is Wikimedia Commons via its
  `Special:FilePath/<filename>` redirect (works without needing the
  internal upload-hash path). `WebFetch` to commons.wikimedia.org is
  blocked by this environment's egress proxy, so author/license on the
  `credit` line could only be confirmed for entries where a `WebSearch`
  result snippet happened to state the license outright (2 of 4 spots in
  `kyoto.md`); the other spots were left without an image entirely rather
  than fabricate a credit. **Always re-confirm the exact license/author
  on the Commons file page before flipping an entry with images to
  `draft: false`.**
- `kyoto.md` was rewritten as the first full example of this format —
  real (not placeholder) historical content and figures researched
  in-session — and published (`draft: false`, 2026-08-28) at the user's
  explicit direction ("not promoted yet, so fine to publish and fix
  later"). It's article 1 of the 10 needed for Amazon Associates. Facts
  weren't checked against primary sources in-session; re-verify
  population/area against e-Stat and sanity-check the subjective bits
  (`prefecturalCharacter`, `comparedTo`) when convenient.
- `JapanMap.astro` is a schematic, not-to-scale illustration (a handful of
  thick rounded strokes standing in for Hokkaido/Honshu/Shikoku/Kyushu,
  plus three dots for Okinawa), not a real coastline — hand-authoring an
  accurate coastline path wasn't worth the risk of it looking subtly
  wrong. The red marker position is a genuine linear projection of each
  entry's `lat`/`lng` (a representative point — the capital city for a
  prefecture), so different prefectures/municipalities do land in
  visibly different, roughly-correct places relative to each other.

## Visual design pass (2026-08-28)

Per explicit feedback that the site read as "too plain" for a page people
are meant to actually spend time on — added a real visual layer rather
than text-on-white-cards:

- **Icons**: `@lucide/astro` (the actively maintained package; the older
  `lucide-astro` is deprecated and was swapped out). Every stat, section
  heading, homepage card, and affiliate card (Product/Experience/
  Subscription/Disclosure) now carries an icon in a small accent-tinted
  circle badge — a repeated visual unit instead of one-off decoration.
- **`StatCard.astro`**: icon + label + value tile, used for the
  prefecture page's "at a glance" facts. Learned the hard way that a
  5-column grid truncates real values (e.g. "4,612 km²" → "4,612...") —
  fixed by dropping to 3 columns max and letting values wrap instead of
  truncating.
- **`ScoreMeter.astro`**: renders `natureScore`/`subcultureScore` (1–10)
  as a filled bar with the raw number alongside it, kessan-shiryou/KPI-tile
  style — previously computed but never actually shown on the prefecture
  page itself, only used for Rankings.
- **`ShareBar.astro`**: a genuinely new data point, not just a restyle —
  "this prefecture is X% of Japan's population/land area," computed
  against `JAPAN_TOTAL_POPULATION`/`JAPAN_TOTAL_AREA_KM2` (src/consts.ts,
  2020 census total / total land area — both stable, well-known
  figures). The bar gets a small minimum width purely so tiny shares
  stay visible on-screen; the printed percentage is always the real
  number, never inflated by that minimum.
- **Hero banner**: prefecture pages now use a full-bleed image/gradient
  banner (breaks out of the `max-w-4xl` content column via
  `left-1/2 w-screen -translate-x-1/2`, a standard escape-the-container
  technique), with the "at a glance" stat panel rendered as a white card
  that overlaps the bottom of the hero. `BaseLayout`'s content column
  widened from `max-w-3xl` to `max-w-4xl` site-wide to give the stat
  grid/tourist-spot grid more room to breathe.
- **Tourist spot cards without a sourced photo** now render an
  accent-gradient placeholder with a camera icon instead of blank white
  space — this was actually a visible bug in the first version of
  `kyoto.md` (2 of 4 spots had no `image`, per the "don't fabricate a
  license credit" call in "Prefecture page format" above) before the
  fallback existed.
- **Rankings**: rank badges are now circular and gold/silver/bronze for
  the top 3 (both the homepage widget and `/rankings/`), instead of a
  bare number.
- This pass touched the prefecture template, the three affiliate card
  components, `AffiliateDisclosure`, and the homepage — i.e. the whole
  site's visual language, not just one page, per the user's "全体的に"
  feedback. Municipality pages (`[prefecture]/[municipality].astro`)
  still use the older plain `dl`-table layout and haven't been brought
  up to the new visual system yet — worth doing once the prefecture
  format itself is confirmed stable.

## Editorial/publishing gate

- Content lives as Markdown files under
  `src/content/{prefectures,municipalities,music,manga}/`,
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
  with, and the actual research + fact-checking pass for each. `uji.md`,
  `city-pop.md`, and `one-piece.md` are still structural examples only.
  `kyoto.md` was rewritten and published 2026-08-28 as the first real
  article in the new prefecture format (see "Prefecture page format"
  above) — content, not just structure. Facts still want a fact-check
  pass against primary sources when convenient (see that section). Its
  two tourist spots that were missing photos (Fushimi Inari, Gion) got
  Commons images added the same day, so all four of Kyoto's spots now
  have a sourced image.
  **All remaining 46 prefectures were then drafted and published on
  2026-08-28**, region by region (batch 1: Tokyo/Osaka/Hokkaido/Okinawa/
  Fukuoka; then one commit per region — Tohoku, Kanto, Chubu, Kansai,
  Chugoku, Shikoku, Kyushu — 47/47 total), per the user's explicit
  direction to keep publishing directly (`draft: false`) rather than
  holding batches for review, since the site isn't promoted yet ("公開
  してしまっていいよ...かなり良いから46都道府県も進行をお願い"). Each
  file carries the same moderate-to-high-confidence-but-unverified
  standard and frontmatter disclaimer as `kyoto.md` — this was written
  at speed across one long session from general knowledge, not
  researched prefecture-by-prefecture against primary sources, so a
  fact-check pass on population/area figures and the more specific
  historical claims is still open. None of the 46 have tourist-spot
  photos yet (only Kyoto's 4 do) — the camera-icon fallback carries them
  for now; photo-sourcing is a natural next batched pass, one prefecture
  or a handful at a time, using the same Wikimedia Commons
  `Special:FilePath` approach documented above. Two prefectures
  (Hiroshima, Nagasaki) deliberately omit the `comparedTo` field given
  the weight of the atomic bombing history each carries — see their own
  frontmatter comments before changing that. A recurring narrative
  thread ties several Kyushu/Shikoku/Chugoku prefectures together
  (Kochi's Sakamoto Ryoma brokering the Satsuma-Choshu alliance between
  Kagoshima and Yamaguchi, Kumamoto Castle's siege in the resulting 1877
  Satsuma Rebellion) — worth keeping in mind if any of those five are
  revised independently, since the cross-references would need updating
  together.
- ASP account applications: see `docs/asp-checklist.md` for step-by-step
  procedures. Rakuten Affiliate/Travel, Viator, Klook/GetYourGuide (via
  Travelpayouts, to avoid Awin's small refundable deposit), and Japan Trend
  Shop have no content-count requirement and can be applied for any time.
  **Amazon Associates requires at least 10 published (`draft: false`)
  articles first**, counted across all four sections (prefectures +
  municipalities + music + manga) since they'll all be covered by the same
  Associates account. **As of 2026-08-28 this threshold is met**: all 47
  prefectures are published (`draft: false`); municipalities/music/manga
  are still draft placeholders. Per the user's standing request, they were
  told to start the Amazon Associates application once this happened (see
  `docs/asp-checklist.md`'s Amazon Associates section for next steps and
  the caveat about unverified facts in the rushed 47-prefecture batch).
  Approval also unlocks the Amazon Music Unlimited / Kindle Unlimited
  referral links.
- GA4 property created and `GA_MEASUREMENT_ID` (`G-ZF4DS1T7V5`) set in
  `src/consts.ts` as of 2026-08-28 — analytics + consent banner are live.
  Still open: bump data retention to 14 months in GA4 Admin → Data
  Settings (see "Analytics, CVR, and traffic security" above), and start
  actually reconciling GA4 numbers against each ASP's dashboard once
  there's real traffic and at least one ASP is approved.
- Whether to add TokyoTreat/Sakuraco once their affiliate payout tax
  treatment (W-9 vs. W-8BEN at signup) is confirmed.
- Instagram/X account setup and posting cadence.
