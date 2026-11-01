const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Asks Cloudflare if the browser's pass is real. No pass or a bad pass is refused.
 * If Cloudflare itself can't be reached, the person is let through: a bot can't cause
 * that, and an outage shouldn't lose real leads.
 */
export async function passesSpamCheck(pass: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  if (typeof pass !== "string" || !pass || pass.length > 2048) return false;

  try {
    const answer = await fetch(VERIFY_URL, {
      method: "POST",
      body: new URLSearchParams({ secret, response: pass, remoteip: ip }),
      signal: AbortSignal.timeout(5_000),
    });
    if (!answer.ok) throw new Error(`status ${answer.status}`);
    const { success } = await answer.json();
    return success === true;
  } catch (error) {
    console.error("Could not reach Cloudflare's spam check:", error instanceof Error ? error.message : "unknown");
    return true;
  }
}
