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

export const collections = { prefectures };
