import { getCollection, getEntry } from "astro:content";

export type RecentKind = "prefecture" | "municipality" | "music" | "manga";

export interface RecentEntry {
  title: string;
  url: string;
  kind: RecentKind;
  updatedDate: Date;
}

export const RECENT_KIND_LABEL: Record<RecentKind, string> = {
  prefecture: "Prefecture",
  municipality: "Municipality",
  music: "Music",
  manga: "Manga",
};

// Latest-updates feed (homepage "recent releases" widget): one unified,
// date-sorted list across all four content collections.
export async function getRecentEntries(base: string, limit = 5): Promise<RecentEntry[]> {
  const draftOk = (data: { draft: boolean }) => (import.meta.env.PROD ? data.draft !== true : true);

  const [prefectures, municipalities, music, manga] = await Promise.all([
    getCollection("prefectures", ({ data }) => draftOk(data)),
    getCollection("municipalities", ({ data }) => draftOk(data)),
    getCollection("music", ({ data }) => draftOk(data)),
    getCollection("manga", ({ data }) => draftOk(data)),
  ]);

  const prefectureEntries: RecentEntry[] = prefectures.map((prefecture) => ({
    title: prefecture.data.name,
    url: `${base}prefectures/${prefecture.id}/`,
    kind: "prefecture",
    updatedDate: prefecture.data.updatedDate,
  }));

  const municipalityEntries: RecentEntry[] = await Promise.all(
    municipalities.map(async (municipality) => {
      const prefecture = await getEntry(municipality.data.prefecture);
      return {
        title: municipality.data.name,
        url: `${base}prefectures/${prefecture.id}/${municipality.id}/`,
        kind: "municipality" as const,
        updatedDate: municipality.data.updatedDate,
      };
    }),
  );

  const musicEntries: RecentEntry[] = music.map((entry) => ({
    title: entry.data.title,
    url: `${base}music/${entry.id}/`,
    kind: "music",
    updatedDate: entry.data.updatedDate,
  }));

  const mangaEntries: RecentEntry[] = manga.map((entry) => ({
    title: entry.data.title,
    url: `${base}manga/${entry.id}/`,
    kind: "manga",
    updatedDate: entry.data.updatedDate,
  }));

  return [...prefectureEntries, ...municipalityEntries, ...musicEntries, ...mangaEntries]
    .sort((a, b) => b.updatedDate.getTime() - a.updatedDate.getTime())
    .slice(0, limit);
}
