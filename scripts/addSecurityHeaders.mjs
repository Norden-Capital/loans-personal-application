// Runs after `astro build`. The Vercel adapter writes its own routing file, and
// Vercel then skips any headers in vercel.json, so they are added to that file here.
import { readFileSync, writeFileSync } from "node:fs";

const file = new URL("../.vercel/output/config.json", import.meta.url);
const config = JSON.parse(readFileSync(file, "utf-8"));

config.routes.unshift({
  src: "^/(.*)$",
  headers: {
    // An apply form should never appear in search results.
    "x-robots-tag": "noindex, nofollow",
    "x-content-type-options": "nosniff",
    // Stops other sites from showing the form inside their own page.
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin",
  },
  continue: true,
});

writeFileSync(file, JSON.stringify(config, null, 2));
