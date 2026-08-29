// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// TODO: replace with a custom domain if one is ever chosen.
// The repo was renamed to kkss0212.github.io (2026-08-29), making this a
// GitHub Pages *user* site served at the bare root — no repo-name path
// segment needed or wanted in `base` anymore.
const SITE_URL = "https://kkss0212.github.io";
// Trailing slash matters: import.meta.env.BASE_URL echoes this string
// verbatim, and every internal link in this codebase does `${base}foo/`
// string concatenation — without the trailing slash here, links would be
// missing their separator (e.g. "music/" instead of "/music/").
const BASE_PATH = "/";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
