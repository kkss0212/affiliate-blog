// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// TODO: replace with the final custom domain once one is chosen.
// Until then this defaults to the GitHub Pages project URL, which requires
// `base` to be set to the repo name (see .github/workflows/deploy.yml).
const SITE_URL = "https://kkss0212.github.io";
// Trailing slash matters: import.meta.env.BASE_URL echoes this string
// verbatim, and every internal link in this codebase does `${base}foo/`
// string concatenation — without the trailing slash here, that produced
// broken hrefs like "/japan-unpackedmusic/" (missing separator) across
// every page, not just one link.
const BASE_PATH = "/japan-unpacked/";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
