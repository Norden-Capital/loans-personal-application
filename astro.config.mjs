// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Pages are static by default, which keeps them fast. The server routes that
// talk to the LMS opt out with `export const prerender = false`.
export default defineConfig({
  site: "https://apply.needaloantoday.online",
  // Step 2 waits for LeadScout, so it needs longer than Vercel's default.
  adapter: vercel({ maxDuration: 60 }),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});