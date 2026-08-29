#!/usr/bin/env node
// Generates the 4-image "info essence card" carousel (cover, stats,
// highlight, CTA) for one prefecture/municipality, plus a draft caption —
// ready for manual upload to Instagram/X. No posting happens here; see
// DECISIONS.md "Traffic — social card pipeline" for what's needed to wire
// up automated posting later.
//
// Usage:
//   node scripts/social-cards/generate.mjs                → next in rotation
//   node scripts/social-cards/generate.mjs --slug=kyoto    → specific slug
//   node scripts/social-cards/generate.mjs --slug=kyoto --type=municipality
//                                                           → disambiguate
//                                                             (prefectures
//                                                             and
//                                                             municipalities
//                                                             can share a
//                                                             slug, e.g.
//                                                             Kyoto)
//   node scripts/social-cards/generate.mjs --list          → show the next
//                                                             candidate
//                                                             without
//                                                             generating
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { loadFeaturablePlaces, buildPlaceUrl, KIND_LABEL } from "./content.mjs";
import { buildCoverHtml, buildStatsHtml, buildHighlightHtml, buildCtaHtml, CARD_DIMENSIONS } from "./templates.mjs";
import { buildCaption } from "./caption.mjs";

const SITE_URL = "https://kkss0212.github.io";
const BASE_PATH = "/japan-unpacked/";
const SERIES_LABEL = "Japan Unpacked";

const STATE_PATH = path.resolve(import.meta.dirname, "state.json");
const OUTPUT_ROOT = path.resolve(import.meta.dirname, "../../social-cards-output");

function parseArgs(argv) {
  const args = { list: false, slug: null, type: null };
  for (const arg of argv) {
    if (arg === "--list") args.list = true;
    else if (arg.startsWith("--slug=")) args.slug = arg.slice("--slug=".length);
    else if (arg.startsWith("--type=")) args.type = arg.slice("--type=".length);
  }
  return args;
}

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_PATH, "utf-8"));
  } catch {
    return { featured: [] };
  }
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n");
}

function pickNext(places, state) {
  const featuredKeys = new Set(state.featured);
  const key = (p) => `${p.collection}/${p.id}`;
  let next = places.find((p) => !featuredKeys.has(key(p)));
  if (!next) {
    // Full cycle complete — start over.
    state.featured = [];
    next = places[0];
  }
  return next;
}

function resolveEntry(places, slug, type) {
  const candidates = places.filter((p) => p.id === slug);
  if (candidates.length === 0) {
    throw new Error(`No published prefecture or municipality with slug "${slug}".`);
  }
  if (candidates.length === 1) return candidates[0];
  if (!type) {
    throw new Error(
      `"${slug}" matches both a prefecture and a municipality — pass --type=prefecture or --type=municipality to disambiguate.`,
    );
  }
  const wantedCollection = type === "prefecture" ? "prefectures" : "municipalities";
  const match = candidates.find((p) => p.collection === wantedCollection);
  if (!match) throw new Error(`"${slug}" has no ${type} entry.`);
  return match;
}

async function renderCard(browser, html, outPath) {
  const page = await browser.newPage({ viewport: CARD_DIMENSIONS });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.screenshot({ path: outPath });
  await page.close();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const places = loadFeaturablePlaces();
  const state = loadState();

  const entry = args.slug ? resolveEntry(places, args.slug, args.type) : pickNext(places, state);
  const kindLabel = KIND_LABEL[entry.collection];

  if (args.list) {
    console.log(`Next in rotation: ${entry.data.name} (${kindLabel}, slug: ${entry.id})`);
    console.log(`${state.featured.length} of ${places.length} places already featured this cycle.`);
    return;
  }

  const url = buildPlaceUrl(entry, SITE_URL, BASE_PATH);
  const highlight = entry.data.highlights?.[0] ?? entry.data.tagline ?? entry.data.name;

  const outDir = path.join(OUTPUT_ROOT, `${entry.collection}-${entry.id}`);
  mkdirSync(outDir, { recursive: true });

  console.log(`Generating cards for ${entry.data.name} (${kindLabel})...`);
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  try {
    await renderCard(browser, buildCoverHtml(entry.data, SERIES_LABEL), path.join(outDir, "01-cover.png"));
    await renderCard(browser, buildStatsHtml(entry.data), path.join(outDir, "02-stats.png"));
    await renderCard(browser, buildHighlightHtml(entry.data, highlight), path.join(outDir, "03-highlight.png"));
    await renderCard(browser, buildCtaHtml(entry.data, url, ["#Japan", "#JapanTravel", "#VisitJapan"]), path.join(outDir, "04-cta.png"));
  } finally {
    await browser.close();
  }

  const caption = buildCaption(entry.data, kindLabel, url);
  writeFileSync(path.join(outDir, "caption.txt"), caption + "\n");

  if (!args.slug) {
    state.featured.push(`${entry.collection}/${entry.id}`);
    saveState(state);
  }

  console.log(`Done: ${outDir}`);
  console.log(`  01-cover.png, 02-stats.png, 03-highlight.png, 04-cta.png, caption.txt`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
