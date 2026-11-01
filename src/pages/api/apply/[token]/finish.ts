import type { APIRoute } from "astro";

import { sendToLms } from "@/lib/lmsProxy";

export const prerender = false;

/** Tokens are made by the LMS from these characters only. */
const TOKEN = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * Step 2. The LMS sends the lead to LeadScout and says what to show next. It waits
 * up to 20 seconds per send, with one retry, so this waits longer than that.
 */
export const POST: APIRoute = (context) => {
  const token = context.params.token ?? "";
  if (!TOKEN.test(token)) return new Response("{}", { status: 404 });
  return sendToLms(context, `/api/public/applications/${token}/finish`, ["outcome", "redirectUrl"], 55_000);
};
