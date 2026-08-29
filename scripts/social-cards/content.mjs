// Minimal frontmatter reader for src/content/{prefectures,municipalities}
// markdown files — avoids pulling in Astro's content-collection runtime
// (which expects a full Astro build context) for what's just "read some
// YAML frontmatter from a folder of .md files."
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import yaml from "yaml";

const CONTENT_ROOT = path.resolve(import.meta.dirname, "../../src/content");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  return yaml.parse(match[1]);
}

function loadCollection(name) {
  const dir = path.join(CONTENT_ROOT, name);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const id = f.replace(/\.md$/, "");
      const raw = readFileSync(path.join(dir, f), "utf-8");
      const data = parseFrontmatter(raw);
      return data ? { id, collection: name, data } : null;
    })
    .filter(Boolean)
    .filter((entry) => entry.data.draft !== true)
    .sort((a, b) => a.id.localeCompare(b.id));
}

// Returns every published prefecture + municipality, each tagged with its
// collection so a same-named slug in both (e.g. "kyoto" the prefecture vs.
// "kyoto" the city) never gets silently conflated.
export function loadFeaturablePlaces() {
  return [...loadCollection("prefectures"), ...loadCollection("municipalities")];
}

export function buildPlaceUrl(entry, siteUrl, basePath) {
  if (entry.collection === "prefectures") {
    return `${siteUrl}${basePath}prefectures/${entry.id}/`;
  }
  // municipality data.prefecture is a content reference: { collection, id }
  const prefectureId = entry.data.prefecture?.id ?? entry.data.prefecture;
  return `${siteUrl}${basePath}prefectures/${prefectureId}/${entry.id}/`;
}

export const KIND_LABEL = {
  prefectures: "Prefecture",
  municipalities: "Municipality",
};
