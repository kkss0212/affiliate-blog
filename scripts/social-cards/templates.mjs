// HTML templates for the 4 social-card images (Instagram/X). Each function
// returns a standalone HTML string (no external CSS/JS files) so Playwright
// can render it directly via page.setContent() with no dev server needed.
//
// Visual system intentionally mirrors src/styles/global.css's color tokens
// so cards read as "the same brand" as the site. Fonts use system serif/
// sans stacks rather than the site's actual Google Fonts (Fraunces/Inter)
// — Playwright's browser network access inside this environment isn't
// guaranteed, and a missing web font silently falls back anyway, so a
// deliberate system-font fallback keeps output consistent. Swap in real
// @font-face embeds (base64) later if exact typography match matters.

const COLORS = {
  paper: "#faf8f6",
  ink: "#1c1917",
  inkSoft: "#57534e",
  inkFaint: "#a8a29e",
  line: "#e7e2dc",
  accent: "#a3412c",
  accentSoft: "#f5e7e1",
  accentHover: "#832f1f",
};

const DISPLAY_FONT = "'Iowan Old Style', 'Palatino Linotype', Georgia, 'Times New Roman', serif";
const SANS_FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const CARD_SIZE = 1080;

// All frontmatter text (name, tagline, highlights, ...) is trusted content
// this project's own authors wrote — not user input — but escaping is
// cheap insurance against an "&"/"<" in a highlight breaking the markup.
function esc(str) {
  return String(str ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
}

function baseStyle() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: ${CARD_SIZE}px;
      height: ${CARD_SIZE}px;
      overflow: hidden;
      font-family: ${SANS_FONT};
      background: ${COLORS.paper};
      color: ${COLORS.ink};
    }
    .display { font-family: ${DISPLAY_FONT}; }
    .brand {
      position: absolute;
      bottom: 32px;
      right: 40px;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .brand-light { color: rgba(255,255,255,0.92); }
    .brand-dark { color: ${COLORS.accent}; }
  `;
}

function wrap(bodyHtml, extraStyle = "") {
  return `<!doctype html><html><head><meta charset="utf-8" /><style>${baseStyle()}${extraStyle}</style></head><body>${bodyHtml}</body></html>`;
}

// Card 1: cover — hero image + place name, the "today: Kyoto" opener.
export function buildCoverHtml(place, seriesLabel) {
  const heroUrl = place.heroImage?.url ?? "";
  const body = `
    <div style="position:relative;width:${CARD_SIZE}px;height:${CARD_SIZE}px;background:linear-gradient(135deg, ${COLORS.ink}, ${COLORS.accentHover});">
      ${
        heroUrl
          ? `<img src="${heroUrl}" onerror="this.style.display='none'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />`
          : ""
      }
      <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.15));"></div>
      <div style="position:absolute;top:56px;left:56px;">
        <span style="display:inline-block;padding:8px 18px;border-radius:999px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.3);color:#fff;font-size:20px;letter-spacing:0.14em;text-transform:uppercase;">
          ${esc(seriesLabel)}
        </span>
      </div>
      <div style="position:absolute;left:56px;right:56px;bottom:140px;">
        <h1 class="display" style="color:#fff;font-size:88px;font-weight:700;line-height:1.02;">
          ${esc(place.name)}
        </h1>
        ${place.nameJa ? `<p style="margin-top:10px;color:rgba(255,255,255,0.7);font-size:34px;">${esc(place.nameJa)}</p>` : ""}
        ${place.tagline ? `<p style="margin-top:22px;color:rgba(255,255,255,0.92);font-size:30px;line-height:1.4;max-width:900px;">${esc(place.tagline)}</p>` : ""}
      </div>
      <div class="brand brand-light">Japan Unpacked</div>
    </div>
  `;
  return wrap(body);
}

// Card 2: at-a-glance stats — mirrors StatCard.astro's visual language.
export function buildStatsHtml(place) {
  const nf = new Intl.NumberFormat("en-US");
  const stats = [];
  if (place.population) {
    stats.push({ label: `Population (${place.populationSourceYear ?? "2020"} census)`, value: nf.format(place.population) });
  }
  if (place.areaKm2) {
    stats.push({ label: "Area", value: `${nf.format(Math.round(place.areaKm2))} km²` });
  }
  if (place.natureScore) {
    stats.push({ label: "Nature score", value: `${place.natureScore} / 10` });
  }
  if (place.subcultureScore) {
    stats.push({ label: "Subculture score", value: `${place.subcultureScore} / 10` });
  }

  const cardsHtml = stats
    .slice(0, 4)
    .map(
      (s) => `
      <div style="background:${COLORS.paper};border:1px solid ${COLORS.line};border-radius:20px;padding:40px;">
        <p style="color:${COLORS.inkFaint};font-size:24px;text-transform:uppercase;letter-spacing:0.08em;">${esc(s.label)}</p>
        <p class="display" style="margin-top:14px;color:${COLORS.ink};font-size:64px;font-weight:700;">${esc(s.value)}</p>
      </div>`,
    )
    .join("");

  const body = `
    <div style="position:relative;width:${CARD_SIZE}px;height:${CARD_SIZE}px;background:#fff;padding:80px;display:flex;flex-direction:column;justify-content:center;">
      <p style="color:${COLORS.accent};font-size:26px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">At a glance</p>
      <h2 class="display" style="margin-top:10px;color:${COLORS.ink};font-size:72px;font-weight:700;">${esc(place.name)}</h2>
      <div style="margin-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:28px;">
        ${cardsHtml}
      </div>
      <div class="brand brand-dark">Japan Unpacked</div>
    </div>
  `;
  return wrap(body);
}

// Card 3: one highlight fact, big pull-quote treatment.
export function buildHighlightHtml(place, highlight) {
  const body = `
    <div style="position:relative;width:${CARD_SIZE}px;height:${CARD_SIZE}px;background:${COLORS.accent};padding:80px;display:flex;flex-direction:column;justify-content:center;">
      <p style="color:rgba(255,255,255,0.75);font-size:110px;line-height:0.5;font-family:${DISPLAY_FONT};">&ldquo;</p>
      <p class="display" style="margin-top:24px;color:#fff;font-size:52px;font-weight:600;line-height:1.28;">
        ${esc(highlight)}
      </p>
      <p style="margin-top:40px;color:rgba(255,255,255,0.8);font-size:26px;text-transform:uppercase;letter-spacing:0.08em;">
        ${esc(place.name)}${place.nameJa ? " · " + esc(place.nameJa) : ""}
      </p>
      <div class="brand brand-light">Japan Unpacked</div>
    </div>
  `;
  return wrap(body);
}

// Card 4: CTA — send the swipe-up/link-in-bio reader to the full guide.
export function buildCtaHtml(place, url, hashtags) {
  const body = `
    <div style="position:relative;width:${CARD_SIZE}px;height:${CARD_SIZE}px;background:${COLORS.paper};padding:88px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;border:28px solid ${COLORS.accent};">
      <p style="color:${COLORS.accent};font-size:28px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Read the full guide</p>
      <h2 class="display" style="margin-top:20px;color:${COLORS.ink};font-size:84px;font-weight:700;line-height:1.08;">
        ${esc(place.name)},<br />unpacked
      </h2>
      <p style="margin-top:36px;color:${COLORS.inkSoft};font-size:34px;line-height:1.4;">
        History, data, food, and things to do — link in bio.
      </p>
      <div style="margin-top:56px;background:${COLORS.ink};color:#fff;padding:22px 32px;border-radius:14px;font-size:28px;word-break:break-all;">
        ${esc(url)}
      </div>
      <p style="margin-top:44px;color:${COLORS.inkFaint};font-size:28px;">
        ${esc(hashtags.join(" "))}
      </p>
      <div style="position:absolute;bottom:56px;right:64px;color:${COLORS.accent};font-size:22px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
        Save this post →
      </div>
    </div>
  `;
  return wrap(body);
}

export const CARD_DIMENSIONS = { width: CARD_SIZE, height: CARD_SIZE };
