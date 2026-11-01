import type { APIContext } from "astro";

const MAX_BODY_LENGTH = 32_000;

const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

/** The address the visitor sees. Vercel sets the first header itself, so it can't be faked. */
export function visitorHost({ request }: APIContext): string {
  return request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
}

/** Only this website's own pages may send here. */
function fromOurPage(context: APIContext): boolean {
  try {
    return new URL(context.request.headers.get("origin") ?? "").host === visitorHost(context);
  } catch {
    return false;
  }
}

/**
 * Passes one step on to the LMS. The shared secret stays here on the server, and
 * the browser only gets back the fields named in `keep`.
 *
 * @param change fills in what the browser can't be trusted to say, or returns null to refuse
 */
export async function sendToLms(
  context: APIContext,
  path: string,
  keep: string[],
  timeoutMs: number,
  change: (body: Record<string, unknown>) => Promise<Record<string, unknown> | null> = async (body) => body,
): Promise<Response> {
  if (!fromOurPage(context)) return reply(403, {});

  const text = await context.request.text();
  if (text.length > MAX_BODY_LENGTH) return reply(413, {});
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return reply(400, {});
  }

  const changed = await change(body);
  if (!changed) return reply(422, {});

  const { LMS_URL, PROXY_SECRET } = process.env;
  if (!LMS_URL || !PROXY_SECRET) {
    console.error("LMS_URL or PROXY_SECRET is not set");
    return reply(503, {});
  }

  try {
    const answer = await fetch(`${LMS_URL}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-proxy-secret": PROXY_SECRET,
        "x-client-ip": context.clientAddress,
      },
      body: JSON.stringify(changed),
      signal: AbortSignal.timeout(timeoutMs),
    });
    const data = await answer.json().catch(() => ({}));
    // Wrong answers explain themselves; any other failure says nothing about the server.
    const names = answer.ok ? keep : answer.status === 400 ? ["message", "fieldErrors"] : [];
    return reply(answer.status, Object.fromEntries(names.map((name) => [name, data[name]])));
  } catch (error) {
    // Only the kind of failure: the answers themselves stay out of the logs.
    console.error("Could not reach the LMS:", error instanceof Error ? error.name : "unknown");
    return reply(502, {});
  }
}
