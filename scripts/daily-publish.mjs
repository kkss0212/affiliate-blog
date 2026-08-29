#!/usr/bin/env node
// Publishes the next queued draft article in src/content/music/ or
// src/content/manga/ — flips `draft: true` to `draft: false` and bumps
// `updatedDate` to today, one article per run. Designed to be run daily
// via .github/workflows/daily-publish.yml (cron), the same way
// scripts/social-cards/generate.mjs runs on its own schedule.
//
// No separate state file needed: `draft: true` IS the queue. Once an
// entry is flipped to `draft: false` it's published and won't be picked
// again, so the queue self-empties as drafts get written and consumed.
//
// Queue order: all draft:true entries across both collections, sorted by
// `collection/filename` so the order is stable and predictable — add new
// drafts any time, they'll publish in filename order once earlier ones
// in the queue are gone.
//
// Usage:
//   node scripts/daily-publish.mjs         → publish the next draft
//   node scripts/daily-publish.mjs --list  → show the current queue, no changes
//   node scripts/daily-publish.mjs --dry-run → show what would be published, no changes

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const COLLECTIONS = ["manga", "music"];

function loadDrafts() {
  const drafts = [];
  for (const collection of COLLECTIONS) {
    const dir = path.join(ROOT, "src/content", collection);
    const files = readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
    for (const file of files) {
      const filePath = path.join(dir, file);
      const text = readFileSync(filePath, "utf-8");
      const titleMatch = text.match(/^title:\s*"([^"]*)"/m);
      const draftMatch = text.match(/^draft:\s*(true|false)\s*$/m);
      if (draftMatch && draftMatch[1] === "true") {
        drafts.push({
          collection,
          file,
          filePath,
          title: titleMatch?.[1] ?? file,
        });
      }
    }
  }
  // Stable order: collection name, then filename.
  drafts.sort((a, b) => `${a.collection}/${a.file}`.localeCompare(`${b.collection}/${b.file}`));
  return drafts;
}

function publishNext(drafts, { dryRun = false } = {}) {
  if (drafts.length === 0) {
    console.log("No draft articles queued in src/content/music/ or src/content/manga/.");
    return null;
  }
  const next = drafts[0];
  const today = new Date().toISOString().slice(0, 10);

  if (dryRun) {
    console.log(`Would publish: ${next.collection}/${next.file} ("${next.title}")`);
    return next;
  }

  let text = readFileSync(next.filePath, "utf-8");
  text = text.replace(/^draft:\s*true\s*$/m, "draft: false");
  text = text.replace(/^updatedDate:\s*\d{4}-\d{2}-\d{2}\s*$/m, `updatedDate: ${today}`);
  writeFileSync(next.filePath, text);

  console.log(`Published: ${next.collection}/${next.file} ("${next.title}")`);
  return next;
}

const args = process.argv.slice(2);
const drafts = loadDrafts();

if (args.includes("--list")) {
  if (drafts.length === 0) {
    console.log("Queue is empty.");
  } else {
    console.log(`${drafts.length} draft(s) queued, in publish order:`);
    drafts.forEach((d, i) => console.log(`  ${i + 1}. ${d.collection}/${d.file} — "${d.title}"`));
  }
} else {
  publishNext(drafts, { dryRun: args.includes("--dry-run") });
}
