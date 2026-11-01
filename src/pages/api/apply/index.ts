import type { APIRoute } from "astro";

import { sendToLms, visitorHost } from "@/lib/lmsProxy";
import { passesSpamCheck } from "@/lib/spamCheck";

export const prerender = false;

/**
 * Step 1. The LMS saves the person as abandoned and returns a token for step 2. Only
 * this step needs the spam check: step 2 can't happen without that token.
 */
export const POST: APIRoute = (context) =>
  sendToLms(context, "/api/public/applications", ["stepToken"], 15_000, async ({ spamCheck, ...body }) => {
    if (!(await passesSpamCheck(spamCheck, context.clientAddress))) return null;
    return {
      ...body,
      host: visitorHost(context),
      userAgent: context.request.headers.get("user-agent")?.slice(0, 400) ?? "",
    };
  });
