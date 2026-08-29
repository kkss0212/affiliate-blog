// Draft caption text for the 4-image carousel post. English, matching the
// site's own audience/voice — this is a starting draft, not a finished
// caption; read it before posting and adjust tone/hashtags per platform.

function slugToHashtag(name) {
  return "#" + name.replace(/[^A-Za-z0-9]/g, "");
}

export function buildCaption(place, kindLabel, url) {
  const highlights = (place.highlights ?? []).slice(0, 2);
  const highlightLines = highlights.map((h) => `✨ ${h}`).join("\n");

  const hashtags = [
    "#Japan",
    "#JapanTravel",
    "#VisitJapan",
    "#JapanUnpacked",
    slugToHashtag(place.name),
    kindLabel === "Prefecture" ? "#JapanPrefectures" : "#JapanCities",
  ].join(" ");

  return [
    `Today: ${place.name} 🇯🇵${place.nameJa ? ` (${place.nameJa})` : ""}`,
    "",
    place.tagline ?? "",
    "",
    highlightLines,
    "",
    "Full guide — history, data, food, and things to do — link in bio.",
    url,
    "",
    hashtags,
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");
}
