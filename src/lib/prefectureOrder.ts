// Canonical north-to-south ordering, matching the official JIS X 0401
// prefecture code sequence — which happens to already group cleanly by
// region in geographic order, so it doubles as both.
export const REGION_ORDER = [
  "Hokkaido",
  "Tohoku",
  "Kanto",
  "Chubu",
  "Kansai",
  "Chugoku",
  "Shikoku",
  "Kyushu",
  "Okinawa",
] as const;

// Prefecture slugs (matching each content file's id / @svg-maps/japan
// location id) in JIS code order, grouped by region for readability here.
export const PREFECTURE_ORDER: string[] = [
  "hokkaido",
  "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima",
  "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa",
  "niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano", "gifu", "shizuoka", "aichi",
  "mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama",
  "tottori", "shimane", "okayama", "hiroshima", "yamaguchi",
  "tokushima", "kagawa", "ehime", "kochi",
  "fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima",
  "okinawa",
];

export function prefectureOrderIndex(slug: string): number {
  const index = PREFECTURE_ORDER.indexOf(slug);
  return index === -1 ? PREFECTURE_ORDER.length : index;
}
