import type { APIRoute } from "astro";

import { sendToLms, visitorHost } from "@/lib/lmsProxy";

export const prerender = false;

/** Someone opened the form. The LMS counts each browser once a day. */
export const POST: APIRoute = (context) =>
  sendToLms(context, "/api/public/visits", [], 5_000, (body) => ({
    visitorId: body.visitorId,
    source: body.source,
    host: visitorHost(context),
  }));
