// Groups music/manga entries by their primary genre (genres[0]) for the
// index pages' region-style anchor navigation — mirrors how
// prefectures/index.astro groups by `region`, except genres are free-form
// per-entry strings rather than a fixed enum, so the group list itself is
// derived from whatever's actually in the catalog (sorted by entry count,
// most-populated genre first) instead of a static order list.
export function groupByPrimaryGenre<T extends { data: { genres: string[] } }>(entries: T[]) {
  const byGenre = new Map<string, T[]>();
  for (const entry of entries) {
    const primary = entry.data.genres[0] ?? "Other";
    if (!byGenre.has(primary)) byGenre.set(primary, []);
    byGenre.get(primary)!.push(entry);
  }
  return [...byGenre.entries()]
    .map(([genre, items]) => ({
      genre,
      slug: genre.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      entries: items,
    }))
    .sort((a, b) => b.entries.length - a.entries.length || a.genre.localeCompare(b.genre));
}
