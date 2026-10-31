// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// Pages are static by default, which keeps them fast. The server route that
// talks to the LMS will opt out with `export const prerender = false`.
export default defineConfig({
  site: "https://apply.needaloantoday.online",
  adapter: vercel(),
});
