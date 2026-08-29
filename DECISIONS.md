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

## Display ads (AdSense) — 2026-08-29

Pageview-based revenue (CPM/RPM), layered on top of the affiliate model
rather than replacing it — a request from the user to add a monetization
track that doesn't depend on a reader clicking through to book/buy.

- **Network: Google AdSense**, chosen because it has no official minimum-
  traffic requirement (unlike Mediavine/AdThrive, which gate on ~50k
  monthly sessions) — original content and policy compliance matter more
  for approval, and the site already has 67+ published articles. Apply
  now rather than waiting for traffic, since approval can take days to
  weeks regardless. Fallback/complementary networks if AdSense rejects or
  fill rate is thin at low traffic: Ezoic (accepts lower-traffic sites),
  Media.net (contextual, can run alongside AdSense).
- **What's built (code side, all inert until an account exists)**:
  - `ADSENSE_CLIENT_ID` in `src/consts.ts` — blank by default. Every piece
    below is a no-op while it's blank, exactly like `GA_MEASUREMENT_ID`
    was before the GA4 property existed.
  - `public/ads.txt` — placeholder with instructions; needs the real
    `pub-...` line once an AdSense account exists.
  - `src/components/AdSlot.astro` — one ad unit. Renders nothing while
    `ADSENSE_CLIENT_ID` is blank. When set, it only loads the AdSense
    library and pushes an ad *after* the visitor has already granted
    cookie consent via the existing banner (`ju-analytics-consent` ===
    `"granted"` in localStorage, the same flag `Analytics.astro` sets) —
    if they haven't answered yet on this pageview, the slot just stays
    empty until their next pageview. This keeps ad-serving consent-gated
    without standing up a full third-party CMP, but re-verify that's
    still sufficient before running meaningful EEA/UK traffic; Google's
    own EU User Consent Policy may require a certified CMP (e.g. Google's
    free Funding Choices, or Cookiebot) once volume is real.
  - Wired into templates with placement chosen to never sit adjacent to
    an affiliate CTA (ProductCard/ExperienceCard/SubscriptionCard),
    consistent with both AdSense policy (no incentivizing/accidental
    clicks) and not cannibalizing affiliate CTR:
    - `prefectures/[slug].astro` — after the History article, before
      "Where to go"; and after the product sections, before
      "Municipalities in X".
    - `prefectures/[prefecture]/[municipality].astro` — after History,
      before "Where to go"; and at the very end, after all product
      sections.
    - `music/[slug].astro` / `manga/[slug].astro` — one slot after the
      story/history article (these pages are shorter, so one slot each
      rather than two).
    - `index.astro` — one slot after Rankings, before Latest Updates (no
      affiliate CTAs on the homepage at all, so placement is unconstrained
      there).
    - All slot IDs are `"0000000000"`–`"0000000006"` placeholders — swap
      each for a real AdSense ad-unit ID once created (one real unit per
      slot is fine, or reuse a single auto-sized unit across all of them).
  - `Analytics.astro`'s consent-banner copy now conditionally mentions
    AdSense ("...and Google AdSense to show ads...") once
    `ADSENSE_CLIENT_ID` is set — silent about ads until then, so the
    banner never claims something not yet true.
  - `privacy.astro` has a new "Advertising" section covering AdSense,
    consent-gating, and links to Google's Ads Settings / aboutads.info
    opt-outs — live now regardless of whether ads are enabled yet, so the
    policy is ready the moment `ADSENSE_CLIENT_ID` is filled in.
- **What only the account owner can do**: create the AdSense account,
  verify the site (domain ownership), get approved, create real ad units,
  and fill in the real `pub-...`/slot IDs. Steps: (1) go to
  adsense.google.com and sign up with the site's URL, (2) add the
  site-verification snippet or use the "ads.txt" method (this project
  already has the placeholder file ready), (3) wait for review (content
  quality + policy compliance are the main gates, not traffic volume),
  (4) once approved, create ad units in the AdSense dashboard and note
  each unit's slot ID, (5) hand the publisher ID (`ca-pub-...`) and slot
  IDs back so `ADSENSE_CLIENT_ID`/the six `slot=` values and `ads.txt`
  can be filled in for real.
- **Revenue expectations**: CPM-based, so near-zero until there's
  meaningful traffic — travel/culture-blog RPM (revenue per 1,000
  pageviews) is typically in the low single-digit-dollars range. This is
  a passive layer that compounds with traffic growth, not a near-term
  income source; the acquisition-channel work below is what actually
  moves it.

## Traffic

- Primary channels: Instagram and X, plus organic SEO on the blog itself.
- No official API-based automation exists for Instagram/X *posting*
  bot-style at this stage of the project — following the same principle
  used on life-story-bot ("don't automate what isn't officially supported"),
  revisit this only if/when using each platform's official API.

### Social card pipeline (2026-08-29)

Built in response to the user's idea: a 4-image "info essence card"
carousel per post (cover / stats / highlight / CTA), one place featured
per post ("Today: Kyoto"), for Instagram and X.

- **What's built**: `scripts/social-cards/` — a standalone Node script
  (`npm run social-card`), no Astro build needed first. Reads frontmatter
  straight from `src/content/{prefectures,municipalities}`, renders 4 HTML
  card templates (`templates.mjs`) with Playwright at 1080×1080, and
  writes PNGs + a draft caption to `social-cards-output/<slug>/`
  (gitignored — regenerate any time). Visual design mirrors the site's own
  color tokens (`src/styles/global.css`) so cards read as the same brand.
  Auto-rotates through all 67 published places (`state.json` tracks what's
  already been featured this cycle) so running it daily naturally works
  through the whole catalog before repeating; `--slug=`/`--type=` picks a
  specific place instead (`--type` only needed when a slug exists in both
  collections, e.g. Kyoto). Full usage in `scripts/social-cards/README.md`.
- **Known gap, verify before relying on it**: card 1's hero-image
  background comes from the place's Wikimedia Commons URL. This sandbox's
  network policy blocks wikimedia.org, so every test render in-session
  fell back to the plain gradient (gracefully, via `onerror` — nothing
  breaks) rather than actually showing the photo. Confirm hero images load
  on a real machine/CI runner before treating the cover card as done.
- **Posting is manual for now, by design**: the script only produces
  files — it does not post anywhere. Posting to social media is a
  visible-to-others action; automating it needs the account owner to set
  up official API access first (X API v2 developer app + OAuth tokens;
  Instagram Graph API needs a Business/Creator account linked to a
  Facebook Page, plus Meta app review for some permissions) — same
  "don't automate what isn't officially supported" principle as above.
  Until that exists, the realistic flow is: run `npm run social-card`,
  review the 4 images + caption, upload manually (natively or via a
  scheduler like Buffer/Later, which only need normal account login, not
  API access). Revisit official-API automation once those accounts exist.
- **Daily notification via ntfy (2026-08-29 update)**: `--notify` (see
  `scripts/social-cards/ntfy.mjs`) pushes the run's output to
  [ntfy](https://ntfy.sh) as a set of notifications — one summary with a
  button to open the article, one plain-text message carrying the full
  caption (readable/copy-pasteable straight from the notification), and
  one attachment per card image (downloadable from the notification). Not
  end-to-end verified in-session — this sandbox's egress policy blocks
  ntfy.sh outright (confirmed via a plain `curl`), so this was built
  strictly against ntfy's documented HTTP publish API
  (https://docs.ntfy.sh/publish/) and needs a real first run to confirm
  formatting in an actual client; the code's error handling surfaced
  correctly when tested against the block (`403 Host not in allowlist`),
  which at least confirms the failure path isn't silent.
  `.github/workflows/social-card-daily.yml` runs this daily (23:00 UTC =
  08:00 JST) via GitHub Actions so it doesn't depend on a local machine or
  Claude Code session being alive — commits the rotation-state update back
  to the repo after each run. Needs one-time setup only the account owner
  can do: add repo secret `NTFY_TOPIC` (treat it like a password — anyone
  who knows it can read the notifications on the public ntfy.sh server;
  use a long random string, not something guessable), and set
  **Settings → Actions → General → Workflow permissions** to "Read and
  write permissions" so the workflow can push the state-file commit.
  X/Instagram captions are shared as one draft rather than written
  separately per platform, per explicit direction — differentiate later
  only if it turns out to matter.

### Other acquisition channels considered

- **Pinterest — recommended as a second image channel, low extra effort.**
  Pins have a much longer discovery lifespan than an X/IG post (weeks to
  months vs. hours) and Pinterest's own audience skews heavily toward
  travel planning, which matches this site's content almost exactly. The
  same 4 card images work as Pins with no new generation work — start by
  pinning the CTA/highlight cards (they read well as standalone images)
  linking straight to the article. No API needed to start; manual pinning
  or Pinterest's native scheduler both just need account login.
- **Reddit — organic only, not a posting-pipeline target.** Relevant
  communities exist (r/JapanTravel, r/newsokur, city/prefecture-specific
  subs) and can send real referral traffic, but only via genuine
  participation (answering questions, linking your own guide when it's
  actually the best answer) — treating it as a content-dump channel reads
  as spam fast and risks a site-wide domain ban from Reddit's spam
  filters. Not something to automate or batch; worth doing by hand
  occasionally if there's time, not a pipeline deliverable.
- **Google Discover / SEO** — already the primary channel via the site's
  own content (see top of "Traffic"); large hero images and clear,
  well-structured articles (both already true of every published page)
  are exactly what makes a site Discover-eligible. Nothing new needed
  here beyond what's already built — flagged only so it's not overlooked
  as "no channel besides social."
- **Newsletter/RSS** — considered, deprioritized. Real compounding value
  for a content site eventually, but needs an ESP account and ongoing
  writing effort disproportionate to the site's current size; revisit
  once there's enough traffic for signups to be worth collecting.

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

## Real Japan map + prefectures index reorganization (2026-08-28)

Per feedback that the hand-drawn schematic map looked like a doodle, and
that `/prefectures/` needed to be grouped/scannable by region:

- **`JapanMap.astro` now uses `@svg-maps/japan`** (npm, CC BY 4.0,
  https://github.com/VictorCazanave/svg-maps) instead of the old
  hand-drawn silhouette + lat/lng-projected dot. It's a real, accurate
  SVG with all 47 prefecture shapes as separate paths — and its location
  ids already match this project's content-collection slugs exactly
  (`"kyoto"`, `"hokkaido"`, etc.), so no mapping table was needed. The
  component now highlights the actual prefecture *shape* (`highlight`
  prop = prefecture id) rather than an approximate marker — strictly
  more accurate, and it looks like a real map. `lat`/`lng` on
  `placeFields` are now unused (kept as optional metadata — see the
  schema comment in `content.config.ts`).
- The component also supports an `interactive` mode (no `highlight`
  prop; every path gets a `data-prefecture` attribute) for the
  prefectures index page's hover-to-locate feature (see below).
- **`/prefectures/index.astro` is now grouped by region**, ordered
  Hokkaido → Tohoku → Kanto → Chubu → Kansai → Chugoku → Shikoku →
  Kyushu → Okinawa (`src/lib/prefectureOrder.ts`'s `REGION_ORDER`),
  with prefectures inside each region sorted by the standard JIS X 0401
  prefecture code order — which happens to already run north-to-south
  within each region, so one ordering table serves both jobs. Each
  region gets its own `<section>` with a jump-link nav at the top.
- **Hover-to-locate** (asked for as a "nice to have"): the index page
  renders one shared `<JapanMap interactive />` up top; a small inline
  script matches each prefecture link's `data-prefecture-link` to the
  map's `data-prefecture` path and toggles the highlight class on
  hover/focus (and clears it on blur/mouseleave) — verified via a
  Playwright DOM check, not just visually.

## Music/Manga expansion: affiliate audit, daily auto-publish, genre categories (2026-08-29)

User reported the Perfume music page appeared to be missing its affiliate
placements. Investigation found the built HTML actually rendered both the
"Listen" (Music Unlimited subscription card) and "Own it" (GAME album
product card) sections correctly — most likely a stale browser cache from
right after the repo rename (when the site genuinely was unstyled/broken
for a few minutes), not an actual bug. Verified with a structural audit
script checking every published article across all four collections
(prefectures/municipalities/music/manga) for at least one entry in each
relevant affiliate array (`products`/`experiences` for places,
`products`/`subscriptions` for music/manga) — **zero gaps found**. Note:
`experiences` (Viator/GetYourGuide/Rakuten Travel booking links) are still
`EXAMPLE` placeholders across the board — expected, not a bug, since those
ASPs aren't fully live yet (see the ASP checklist section above); only the
Amazon-based `products`/`subscriptions` arrays are real right now.

- **`city-pop.md` was a literal schema-demo placeholder** (`draft: true`,
  body text literally saying "draft guide goes here") despite already
  having real affiliate links from an earlier pass — rewritten into a
  real published article (City Pop the genre, framed around "Plastic
  Love"'s 2017-18 YouTube-algorithm viral revival) and flipped to
  `draft: false` directly, since it needed no new research.
- **8 new draft articles added** as a publish queue: manga —
  Dragon Ball (Toriyama, Aichi/Kiyosu), Naruto (Kishimoto, Okayama/Nagi —
  note his birthplace is Nagi, not "Nakasho," which doesn't check out
  against any source), Attack on Titan (Isayama, Oita — birthplace Oyama,
  now part of Hita City), Fullmetal Alchemist (Arakawa, Hokkaido — her
  birthplace is Makubetsu/Tokachi, **not** Tokoro/Kitami as originally
  assumed, a correction surfaced by research); music — Babymetal (Tokyo,
  agency-based — members are NOT from Tokyo individually, see the file's
  own header comment), Hatsune Miku/Vocaloid (Hokkaido/Sapporo — Crypton
  Future Media's HQ, a clean tie-in to the already-published Sapporo
  municipality page), Kyary Pamyu Pamyu (Tokyo/Nishitokyo), X Japan
  (Chiba — formed in Tateyama, a different city from the already-published
  Chiba City municipality page, so this links Chiba prefecture only, not
  that municipality). All researched via WebSearch to the same
  moderate-to-high-confidence-but-unverified standard as existing
  articles, each with a real Amazon.co.jp product ASIN and (for manga)
  real Kindle Unlimited + Prime Video referral links, or (for music) a
  Music Unlimited referral link. None of the four manga creators' actual
  hometowns are designated-city municipalities published on this site, so
  each links its prefecture page only — the specific town/city is still
  named in the article body.
- **`scripts/daily-publish.mjs`** (new): publishes the single oldest
  `draft: true` entry across `src/content/music/` + `src/content/manga/`
  (sorted by `collection/filename` for a stable order) by flipping
  `draft: true` → `false` and bumping `updatedDate` to today. No separate
  state file needed — unlike the social-card rotation, this queue is
  self-consuming: once an entry publishes it's no longer `draft: true`,
  so it naturally drops out of future runs. `--list` shows the current
  queue without changing anything; `--dry-run` shows what the next run
  would publish. Verified end-to-end with a throwaway dummy draft file
  before relying on it against real content.
- **`.github/workflows/daily-publish.yml`** (new): cron `0 22 * * *`
  (07:00 JST), offset an hour from `social-card-daily.yml`'s `23:00 UTC`
  run so the two don't compete for runner time. Runs the script, then
  `npm run build` as a safety check (fails the job before committing if
  the flip somehow broke schema validation), then commits+pushes with
  `[skip ci]`. `workflow_dispatch` also available for manual runs. Once
  the 8-article queue above is exhausted, the workflow just logs "nothing
  to publish" each day — add more `draft: true` files any time to keep it
  running; there's no need to touch the workflow itself.
- **Genre-grouped category pages** (`/music/` and `/manga/` index pages):
  mirrors `prefectures/index.astro`'s region-grouping pattern (anchor nav
  + `<section>` per group) using each entry's primary genre (`genres[0]`)
  as the grouping key, via a new shared helper
  (`src/lib/genreGroups.ts`). Unlike prefectures' fixed `REGION_ORDER`
  enum, genres are free-form per-entry strings, so the group list itself
  is derived from whatever's actually in the catalog at build time
  (sorted by entry count, most-populated genre first) rather than a
  static ordered list — no code changes needed as new genres get
  introduced by future articles. Anchor nav only renders once there's
  more than one group (skips the chrome entirely while the catalog is
  small). Verified via build output inspection (correct `<h2>` sections:
  "City Pop"/"Technopop" for music, "Shonen" for manga, before the new
  drafts publish and add more variety).

## Remaining tasks (read this first in a new session)

- **Amazon Associates activated (2026-08-29) — product ASIN pass complete
  (2026-08-29)**: user's Associate ID is `kaorusonoda-22`. All
  `tag=YOUR-ASSOCIATE-ID-22` placeholders were replaced with the real tag,
  and **every `products` entry with `retailer: "amazon"` now links a real,
  WebSearch-verified Amazon.co.jp ASIN** (`https://www.amazon.co.jp/dp/
  {ASIN}?tag=kaorusonoda-22`) — the `dp/EXAMPLE`/`dp/EXAMPLE{n}` placeholder
  pass is done, across all `company`, `manga`, and `local-specialty`
  products in prefectures, municipalities, music, and manga content (~99
  amazon-retailer entries total). PA-API was considered and ruled out — it
  requires 3 qualifying sales within 180 days to even get access (a
  chicken-and-egg problem with zero sales), so every ASIN was found
  manually: WebSearch the product on amazon.co.jp, confirm a real listing,
  extract the ASIN from the URL. Where a brand doesn't sell on Amazon.co.jp
  at all (Mikimoto pearls, Uniqlo, car brands, Aomori's diamond cut-glass,
  Kanazawa lacquerware), a real, purchasable analogous product was
  substituted per the user's explicit "handle by analogy" instruction
  (Akoya pearl set, Hanes Beefy-T, Tomica die-cast models, Tsugaru-nuri
  lacquerware, a gold-leaf Kutani-yaki sake cup) — each substitution has a
  one-line disclosure in its `description` explaining the swap, and (where
  the substitution changed the product category, not just the specific
  item) the `name` field was updated to match what's actually linked.
  Three ASINs are intentionally reused across a prefecture + its
  designated-city article that share the same company (Tomica Toyota
  Raize: Aichi/Nagoya; Yamaha FG830 guitar: Shizuoka/Hamamatsu; Tomica
  Mazda Roadster: Hiroshima pref/city) — not a bug. Remaining caveat: ASINs
  were extracted from WebSearch result snippets, not confirmed by loading
  each live Amazon page, so stock/listing status (especially for
  small-workshop craft items) should be spot-checked before/while
  publishing. Also still worth reconfirming AmazonGlobal international-
  shipping eligibility per item (pre-existing "Open" item below).
- **Amazon Music Unlimited / Kindle Unlimited / Prime Video referral
  programs (2026-08-29 — links live)**: user confirmed no pending-approval
  indicator was visible in Associates Central and supplied working
  referral URLs directly: Music Unlimited
  `https://www.amazon.co.jp/music/unlimited/?tag=kaorusonoda-22`, Prime
  Video `https://www.amazon.co.jp/gp/video/storefront?benefitId=default&tag=kaorusonoda-22`,
  Kindle Unlimited
  `https://www.amazon.co.jp/kindle-dbs/hz/signup?tag=kaorusonoda-22`.
  Applied so far: Kindle Unlimited link corrected in
  `src/content/manga/one-piece.md`; a new Prime Video `subscriptionOffer`
  added there too (schema's `service` enum extended with `"prime-video"`,
  `SubscriptionCard.astro` updated with a Clapperboard icon/label); Music
  Unlimited link corrected in `src/content/music/perfume.md`. **Not yet
  checked**: whether other music/manga articles have their own
  `subscriptionOffer` entries still needing the same URL corrections —
  sweep `src/content/music/*.md` and `src/content/manga/*.md` for any
  remaining placeholder subscription URLs. User floated possibly featuring
  Prime Video/Netflix more directly in article content — Netflix has no
  known legitimate Japan-domestic affiliate program (same conclusion as
  the existing Spotify/LINE Music note in `docs/asp-checklist.md`), worth
  surfacing if the user revisits this.
- **AdSense "specify a valid top-level domain" (2026-08-29 — fully
  resolved, code side)**: AdSense's "Add site" flow suggested the bare
  `http://kkss0212.github.io` root instead of the actual site URL
  `https://kkss0212.github.io/japan-unpacked/`, and that bare URL 404d
  because it was a GitHub Pages *project* page — nothing was served at the
  bare root. Of the three options previously laid out — (A) enter the full
  path URL directly, (B) stand up a `kkss0212.github.io` root-level Pages
  site, (C) buy a custom domain — user tried (A), it failed, then chose
  (B) and **renamed the GitHub repo to `kkss0212.github.io`** (confirmed
  working: `git ls-remote` on the old name, the new name, and the
  session's original `affiliate-blog` remote name all resolve to the same
  HEAD commit, so GitHub's redirect is active regardless of which name is
  used for git operations). Code side updated to match in the same
  session: `astro.config.mjs`'s `BASE_PATH` changed from `/japan-unpacked/`
  to `/` (`SITE_URL` unchanged, `https://kkss0212.github.io`);
  `scripts/social-cards/generate.mjs`'s matching `BASE_PATH` constant;
  `public/robots.txt`'s hardcoded `Sitemap:` line (was still pointing at
  the old project-page sitemap URL — build only regenerates
  `sitemap-index.xml` itself, not this static file); `README.md`'s "Live
  at" link; `docs/asp-checklist.md`'s shared site-URL line. Verified via a
  full rebuild (`rm -rf dist .astro && npm run build`) — confirmed zero
  remaining `/japan-unpacked` references anywhere under `dist/` — and a
  local `astro dev` + Playwright screenshot of both the homepage and a
  prefecture page, confirming CSS/asset links now resolve as root-relative
  (`/_astro/...`, `/prefectures/...`) instead of 404ing under the old
  project-page path (the direct cause of the broken/unstyled page the user
  saw right after the GitHub-side rename, before this session did the
  matching code update).
  **Still needs the user's action**: three already-submitted ASPs were
  registered with the old URL and likely need their site-URL setting
  updated to `https://kkss0212.github.io/` — Viator (submitted
  2026-08-28, in review), Amazon Associates (submitted 2026-08-28,
  approved), and possibly Rakuten Affiliate's media registration. See the
  "要対応"/"要確認" notes added at each ASP's section in
  `docs/asp-checklist.md` for exactly where to check in each dashboard.
- **AdSense account created, site-ownership verification pending
  (2026-08-29)**: user created an AdSense account (publisher ID
  `pub-7352447371048101`) and reached the "verify site ownership" step,
  which offered three methods (code snippet, ads.txt snippet, meta tag).
  **Chose ads.txt over the code-snippet method deliberately**: the
  code-snippet method requires an unconditional `<script>` tag in every
  page's `<head>`, which would load the AdSense library for every visitor
  regardless of cookie consent — directly conflicting with `AdSlot.astro`'s
  consent-gating design (see above). `public/ads.txt` was already
  scaffolded for exactly this purpose, so filled in the real line
  (`google.com, pub-7352447371048101, DIRECT, f08c47fec0942fa0`) and
  pushed it — no code/consent-gating changes needed, verification just
  reads the live `https://kkss0212.github.io/ads.txt`.
  **`ADSENSE_CLIENT_ID` in `src/consts.ts` deliberately left blank** —
  per its own comment, that's the switch that turns on actual ad
  rendering (`AdSlot.astro` starts emitting `<ins class="adsbygoogle">`
  units site-wide), and the account isn't approved yet. Flip it to
  `"ca-pub-7352447371048101"` once AdSense approval comes through, then
  create real ad units in the dashboard and swap the placeholder
  `"0000000000"` slot IDs at each `<AdSlot slot="...">` call site.
- **Fact-check pass — population/area (2026-08-29 update — done)**: every
  `population`/`areaKm2` figure across all 47 prefectures and all 20
  designated-city municipalities was individually cross-checked via
  WebSearch (query pattern: "<place> population 2020 census <figure>
  area km2 <figure>", asking the search to confirm or refute the site's
  own number rather than supply a fresh one — more reliable than an
  open query, which the very first check (Aomori) showed can return a
  hallucinated/summarized figure that doesn't match any real source).
  **Result: zero incorrect figures found** across all 67 articles. Every
  apparent mismatch traced back to search results citing a different
  reference date (a 2019, 2023, or 2025 estimate, or a source's own
  rounding) rather than an actual error in the site's 2020-census
  figures; two cases (Sapporo city population, Okinawa prefecture
  population) that looked like real discrepancies were confirmed
  correct as originally written once cross-checked against a second,
  more authoritative source (an official-domain PDF found via a
  Japanese-language query). Caveat: this environment's `WebFetch` tool
  is fully egress-blocked (confirmed blocked even for example.com, not
  just wikimedia.org/e-stat.go.jp specifically), so every check here
  relied on WebSearch's AI-summarized snippets rather than a raw fetch
  of e-Stat's actual tables — high confidence, but not a substitute for
  someone with real e-Stat access spot-checking a handful of pages
  directly if fully primary-source certainty matters.
- **Fact-check pass — historical claims, risk-prioritized spot-check
  (2026-08-29 update — done, not exhaustive)**: given the size of the
  corpus (67 articles) and the WebSearch-only constraint above, this
  was a targeted spot-check of the highest-risk claims rather than a
  line-by-line audit of every date/name/superlative in every article.
  Checked and confirmed accurate: Hiroshima's Aug 6, 1945 date and
  "~140,000 deaths by end of 1945" (matches the standard widely-cited
  estimate, including Hiroshima City's own official FAQ); Nagasaki's
  Aug 9, 1945 date and "~70,000 deaths by end of 1945" (same); the
  1995 Great Hanshin earthquake's Jan 17 date and "magnitude 6.9"
  (correct on the moment-magnitude scale commonly used internationally,
  vs. 7.3 on the JMA scale the Japanese press usually quotes — both are
  legitimate, no fix needed); the 1877 siege of Kumamoto Castle's
  50–54 day range (prefecture page's "53-day" and municipality page's
  "seven-week" both fall inside the range actual sources give); Sapporo
  hosting the first Winter Olympics held in Asia (1972, confirmed
  exactly); Yokohama's 1859 treaty-port opening; Kyoto's 17-component
  UNESCO "Historic Monuments of Ancient Kyoto" listing (confirmed
  exactly, including that Nijo Castle and the Kyoto Imperial Palace's
  neighborhood sites are among the 17); Sakai's "~90% of Japan's
  professional kitchen-knife market" (confirmed, one source even cites
  98%, so 90% is if anything conservative); Nagasaki/Dejima's "200+
  years" as Japan's sole Western trading window (1641–1854 or 1641–1859
  depending on the source — both exceed 200 years). **One inconsistency
  found and fixed**: `municipalities/kobe.md` said the 1995 earthquake
  "killed over 6,000 people" in two places (a highlight bullet and the
  body prose) while `prefectures/hyogo.md` and the confirmed official
  final toll (6,434, per Japan's National Police Agency as reported by
  multiple sources) both say "over 6,400" — tightened both places in
  kobe.md to match. **Not checked**: the great majority of the corpus's
  smaller factual claims (individual "founded in [year]," population-
  rank superlatives, named-individual biographical details) — this was
  a risk-weighted sample of the claims most likely to be wrong or most
  reputationally sensitive if wrong, not full coverage. If a completely
  clean bill of health is needed, budget for a genuine line-by-line pass
  or, better, access to a working WebFetch/browsing tool so sources can
  be read directly instead of through WebSearch's summaries. A tone
  re-read of Hiroshima/Nagasaki (checking for anything that reads as
  flippant given the subject, independent of factual accuracy) has not
  been done separately from this fact pass — still open if wanted.
- **Tourist-spot photos (2026-08-29 update — done)**: all 47 prefectures
  now have sourced `touristSpots` images, via WebSearch-verified
  Wikimedia Commons `Special:FilePath` URLs (same method as Kyoto; see
  "Prefecture page format" above). Two spots were deliberately left
  without an image because no suitable Commons photo exists: Shosenkyo
  Gorge (Yamanashi) and Nichinan Coast (Miyazaki) — both render the
  accent-gradient camera-icon fallback
  (`src/pages/prefectures/[slug].astro`), by design. For the two
  atomic-bombing memorial sites (Hiroshima's Peace Memorial Park,
  Nagasaki's Peace Park & Atomic Bomb Museum), a plain daytime
  documentary photo was chosen deliberately given the weight of what
  they cover. WebFetch/curl to wikimedia.org is blocked by this
  sandbox's egress proxy (confirmed via 403 on both
  commons.wikimedia.org and upload.wikimedia.org), so none of these
  ~185 images could be rendering-verified in-session — the user
  confirmed Kyoto's images render correctly in production, validating
  the method, but a fresh spot-check across a few more prefectures
  would still be worthwhile.
- **Municipality pages (2026-08-29 update — done)**: the template now
  matches the prefecture visual system (StatCard/ScoreMeter/ShareBar/
  hero banner/JapanMap, which highlights the parent prefecture's shape
  since municipalities aren't in the `@svg-maps/japan` dataset). All 20
  designated cities (政令指定都市 — Sapporo, Sendai, Saitama, Chiba,
  Yokohama, Kawasaki, Sagamihara, Niigata, Shizuoka, Hamamatsu, Nagoya,
  Kyoto, Osaka, Sakai, Kobe, Okayama, Hiroshima, Kitakyushu, Fukuoka,
  Kumamoto) are published (`draft: false`), each researched to the same
  standard as the prefecture articles and — where the city is also a
  prefecture capital already covered in depth at prefecture level (e.g.
  Kyoto, Osaka, Fukuoka, Kumamoto, Hiroshima) — deliberately angled at
  different, city-government/modern-identity material rather than
  repeating the prefecture page's history section. `uji.md` remains the
  only non-designated-city example, still `draft: true` as a schema
  demo. **Tourist-spot photos (2026-08-29 update — done)**: all 20
  designated cities now have sourced `touristSpots` images, using the
  same WebSearch/Wikimedia Commons `Special:FilePath` method as the 47
  prefectures — reusing the exact image block from the parent
  prefecture page wherever a municipality's spot is the same physical
  landmark (e.g. Sendai Castle, Nagoya Castle, Dotonbori, Kitano-cho,
  Kumamoto Castle), and freshly sourcing the rest. Three touristSpot
  entries were left without a confirmed image after repeated searches
  turned up nothing specific enough to trust: Chiba's "Chiba Shrine",
  Kitakyushu's "Space World Site & Kitakyushu Eco-Town", and Kumamoto's
  "Sakura no Baba Josaien" — each flagged in its file's frontmatter
  comment for a future pass. As with the prefecture-page images, none
  of these ~75 municipality images could be rendering-verified
  in-session (WebFetch/curl to wikimedia.org stays blocked by the
  sandbox's egress proxy), so a production spot-check is still
  worthwhile.
- **Music/manga content (2026-08-29 update — done)**: `cultureGuide` schema
  extended (`genres`, `composition`, `originPrefecture`/
  `originMunicipality` references, `popularityAbroad`, `forFansOf`), and
  both `music/[slug].astro`/`manga/[slug].astro` rebuilt to the same
  visual system as the place pages (hero, StatCard grid, genre-tag pills,
  ScoreMeter, a `forFansOf` card mirroring `comparedTo`). Two real
  articles published (`draft: false`): `perfume.md` (Hiroshima-formed
  technopop trio, linking to both the Hiroshima prefecture and city
  pages) and a rewritten `one-piece.md` (Eiichiro Oda, linking to
  Kumamoto). The old genre-overview placeholder `city-pop.md` is
  untouched, still `draft: true` — harmless, not linked anywhere in a
  prod build. Natural next step if more culture-guide entries are
  wanted: same pattern, one more artist/series at a time.
- **ASP follow-ups** (see `docs/asp-checklist.md` for full detail):
  Amazon Associates can be applied for now (threshold met, 47
  published articles); GetYourGuide via Awin hasn't been started;
  Japan Trend Shop's signup page was unreachable, retry later; Viator's
  review was pending as of 2026-08-28; Rakuten's generated links are
  ready to embed into real articles (now that real articles exist) but
  haven't been.
- **Custom domain** and final hosting choice — still open.

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
