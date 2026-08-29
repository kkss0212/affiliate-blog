// Google Analytics 4 Measurement ID (format: "G-XXXXXXXXXX").
// Not a secret — GA4 IDs are always visible in page source. Leave empty
// until a GA4 property exists; the Analytics component renders nothing
// (no script, no consent banner) while this is blank. See DECISIONS.md
// "Analytics & CVR" for the setup steps and what this can/can't measure.
export const GA_MEASUREMENT_ID = "G-ZF4DS1T7V5";

// Japan-wide totals, used only for "share of Japan" comparison bars on
// prefecture/municipality pages (src/components/ShareBar.astro). Both are
// well-established public figures — 2020 census total population, and
// Japan's total land area — not tied to any one prefecture's data year.
export const JAPAN_TOTAL_POPULATION = 126146099;
export const JAPAN_TOTAL_POPULATION_YEAR = 2020;
export const JAPAN_TOTAL_AREA_KM2 = 377975;

// Google AdSense publisher ID (format: "ca-pub-XXXXXXXXXXXXXXXX").
// Not a secret — publisher IDs are always visible in page source. Leave
// empty until an AdSense account is approved; AdSlot.astro renders nothing
// while this is blank, same graceful-degradation pattern as GA_MEASUREMENT_ID
// above. Once set, also fill in public/ads.txt with the real publisher ID —
// see that file's placeholder comment. See DECISIONS.md "Display ads
// (AdSense)" for the full setup checklist.
export const ADSENSE_CLIENT_ID = "";
