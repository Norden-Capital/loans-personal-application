import type { APIRoute } from "astro";

import { sendToLms, visitorHost } from "@/lib/lmsProxy";

export const prerender = false;

/** Step 1. The LMS saves the person as abandoned and returns a token for step 2. */
export const POST: APIRoute = (context) =>
  sendToLms(context, "/api/public/applications", ["stepToken"], 15_000, (body) => ({
    ...body,
    host: visitorHost(context),
    userAgent: context.request.headers.get("user-agent")?.slice(0, 400) ?? "",
  }));
