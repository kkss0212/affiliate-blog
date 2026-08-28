import { getCollection, getEntry } from "astro:content";

export const RANKING_METRICS = [
  { key: "population", label: "Population", unit: "" },
  { key: "foreignVisitorsAnnual", label: "Foreign Visitors (annual)", unit: "" },
  { key: "areaKm2", label: "Area", unit: "km²" },
  { key: "populationDensity", label: "Population Density", unit: "/km²" },
  { key: "natureScore", label: "Nature Score", unit: "/10" },
  { key: "subcultureScore", label: "Subculture Score", unit: "/10" },
] as const;

export interface RankingEntry {
  name: string;
  url: string;
  scope: "prefecture" | "municipality";
  parentName: string | null;
  metrics: Record<string, number | null>;
}

// Shared by /rankings/ (full, scope-toggle + single list) and the
// homepage's inline prefecture/municipality preview — both need the same
// underlying entries, just laid out differently.
export async function getRankingEntries(base: string): Promise<RankingEntry[]> {
  const prefectures = await getCollection("prefectures", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const municipalities = await getCollection("municipalities", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const prefectureEntries: RankingEntry[] = prefectures.map((prefecture) => ({
    name: prefecture.data.name,
    url: `${base}prefectures/${prefecture.id}/`,
    scope: "prefecture",
    parentName: null,
    metrics: {
      population: prefecture.data.population,
      foreignVisitorsAnnual: prefecture.data.foreignVisitorsAnnual ?? null,
      areaKm2: prefecture.data.areaKm2,
      populationDensity: prefecture.data.population / prefecture.data.areaKm2,
      natureScore: prefecture.data.natureScore ?? null,
      subcultureScore: prefecture.data.subcultureScore ?? null,
    },
  }));

  const municipalityEntries: RankingEntry[] = await Promise.all(
    municipalities.map(async (municipality) => {
      const prefecture = await getEntry(municipality.data.prefecture);
      return {
        name: municipality.data.name,
        url: `${base}prefectures/${prefecture.id}/${municipality.id}/`,
        scope: "municipality" as const,
        parentName: prefecture.data.name,
        metrics: {
          population: municipality.data.population,
          foreignVisitorsAnnual: municipality.data.foreignVisitorsAnnual ?? null,
          areaKm2: municipality.data.areaKm2,
          populationDensity: municipality.data.population / municipality.data.areaKm2,
          natureScore: municipality.data.natureScore ?? null,
          subcultureScore: municipality.data.subcultureScore ?? null,
        },
      };
    }),
  );

  return [...prefectureEntries, ...municipalityEntries];
}
