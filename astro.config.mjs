// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// TODO: replace with the final custom domain once one is chosen.
// Until then this defaults to the GitHub Pages project URL, which requires
// `base` to be set to the repo name (see .github/workflows/deploy.yml).
const SITE_URL = "https://kkss0212.github.io";
const BASE_PATH = "/affiliate-blog";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
