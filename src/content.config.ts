import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const product = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  retailer: z.enum(["amazon", "japan-trend-shop"]),
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

const prefectures = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/prefectures" }),
  schema: z.object({
    name: z.string(),
    nameJa: z.string(),
    region: z.enum([
      "Hokkaido",
      "Tohoku",
      "Kanto",
      "Chubu",
      "Kansai",
      "Chugoku",
      "Shikoku",
      "Kyushu",
      "Okinawa",
    ]),
    capital: z.string(),
    population: z.number(),
    populationSourceYear: z.number(),
    areaKm2: z.number(),
    highlights: z.array(z.string()),
    products: z.array(product).default([]),
    experiences: z.array(experience).default([]),
    heroImageAlt: z.string().optional(),
    updatedDate: z.date(),
    draft: z.boolean().default(true),
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

export const collections = { prefectures, music, manga };
