import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const product = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  retailer: z.enum(["amazon", "japan-trend-shop"]),
  // Groups products on a place page into "Local specialties" / "Featured
  // companies" / "Set here in manga" sections. Optional so music/manga
  // collection products (which don't use these sections) can omit it.
  category: z.enum(["local-specialty", "company", "manga", "other"]).optional(),
});

const experience = z.object({
  name: z.string(),
  description: z.string(),
  bookingUrl: z.string().url(),
  provider: z.enum(["klook", "viator", "getyourguide", "rakuten-travel"]),
});

// Amazon's own "member referral" programs (Amazon Music Unlimited, Kindle
// Unlimited) — flat fee per new sign-up, generated from Associates Central
// under the same Amazon Associates account. Not a product purchase link, so
// modeled separately from `product`.
const subscriptionOffer = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  service: z.enum(["amazon-music-unlimited", "kindle-unlimited"]),
});

// Shared shape for the culture-guide sections (music, manga): an article
// that recommends specific products (Amazon) alongside a subscription
// referral offer, same draft/publish gate as prefectures.
const cultureGuide = z.object({
  title: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  products: z.array(product).default([]),
  subscriptions: z.array(subscriptionOffer).default([]),
  updatedDate: z.date(),
  draft: z.boolean().default(true),
});

// Shared fields for anything with a location profile (population/area/
// history + the products/experiences affiliate tracks). Prefectures and
// municipalities both use this; municipalities add a `prefecture`
// reference and drop `region` (derived from the parent prefecture instead
// of duplicated).
const image = z.object({
  url: z.string().url(),
  alt: z.string(),
  // Attribution string (photographer/source + license), e.g. "Photo by
  // Jane Doe / Wikimedia Commons, CC BY-SA 4.0". Required in practice for
  // anything but a public-domain/self-shot photo — enforce at review time,
  // not in the schema, since some images genuinely need none.
  credit: z.string().optional(),
});

const touristSpot = z.object({
  name: z.string(),
  description: z.string(),
  image: image.optional(),
});

const placeFields = {
  name: z.string(),
  nameJa: z.string(),
  // One-line hook shown right under the name in the hero.
  tagline: z.string().optional(),
  heroImage: image.optional(),
  // Approximate coordinates (representative point — a prefecture's capital
  // city, or the municipality itself). Currently unused: JapanMap.astro
  // switched to highlighting the real prefecture shape from
  // @svg-maps/japan (keyed by the same slug as `id`) instead of
  // projecting a marker from lat/lng. Kept here as optional metadata in
  // case a future feature (e.g. pinpointing a municipality within its
  // prefecture) wants it.
  lat: z.number().optional(),
  lng: z.number().optional(),
  population: z.number(),
  populationSourceYear: z.number(),
  populationTrend: z.enum(["increasing", "decreasing", "stable"]).optional(),
  populationTrendNote: z.string().optional(),
  areaKm2: z.number(),
  // Optional ranking metrics (src/pages/rankings.astro). All optional
  // because they're harder to source than population/area and entries
  // shouldn't be blocked on having them — an entry missing a metric is
  // just skipped when ranking by that metric, not treated as zero.
  foreignVisitorsAnnual: z.number().optional(),
  natureScore: z.number().min(1).max(10).optional(),
  subcultureScore: z.number().min(1).max(10).optional(),
  // Light, clearly-subjective editorial color — frame as "often described
  // as," never as settled fact.
  prefecturalCharacter: z.string().optional(),
  comparedTo: z
    .object({
      place: z.string(),
      country: z.string(),
      reason: z.string(),
    })
    .optional(),
  highlights: z.array(z.string()),
  touristSpots: z.array(touristSpot).default([]),
  products: z.array(product).default([]),
  experiences: z.array(experience).default([]),
  updatedDate: z.date(),
  draft: z.boolean().default(true),
};

const region = z.enum([
  "Hokkaido",
  "Tohoku",
  "Kanto",
  "Chubu",
  "Kansai",
  "Chugoku",
  "Shikoku",
  "Kyushu",
  "Okinawa",
]);

const prefectures = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/prefectures" }),
  schema: z.object({
    ...placeFields,
    capital: z.string(),
    region,
  }),
});

const municipalities = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/municipalities" }),
  schema: z.object({
    ...placeFields,
    prefecture: reference("prefectures"),
    kind: z.enum(["city", "special-ward", "town", "village"]),
  }),
});

const music = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
  schema: cultureGuide,
});

const manga = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/manga" }),
  schema: cultureGuide,
});

export const collections = { prefectures, municipalities, music, manga };
