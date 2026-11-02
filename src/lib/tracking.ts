const KEYS = ["source", "medium", "campaign", "content", "term"];
const STORE = "tracking";

/**
 * The link's utm_ tags, kept for this visit and then taken out of the address
 * bar — decided 2026-11-02, so the person sees a clean address. Kept per tab, so
 * a refresh or Previous still has them; a copied or bookmarked address does not.
 * Run before anything reads the tags.
 */
export function rememberTracking() {
  const url = new URL(location.href);
  const found: Record<string, string> = {};
  for (const key of KEYS) {
    const value = url.searchParams.get(`utm_${key}`);
    if (value) found[key] = value;
    url.searchParams.delete(`utm_${key}`);
  }
  if (Object.keys(found).length === 0) return;
  try {
    sessionStorage.setItem(STORE, JSON.stringify(found));
  } catch {
    // Storage blocked: leave the address as it is, so step 1 can still read it.
    return;
  }
  history.replaceState(history.state, "", url.pathname + url.search + url.hash);
}

/** The tags of this visit: source, medium, campaign, content, term. */
export function tracking(): Record<string, string> {
  const params = new URLSearchParams(location.search);
  const fromAddress = Object.fromEntries(
    KEYS.map((key) => [key, params.get(`utm_${key}`)]).filter(([, value]) => value),
  ) as Record<string, string>;
  if (Object.keys(fromAddress).length > 0) return fromAddress;
  try {
    const kept = JSON.parse(sessionStorage.getItem(STORE) ?? "{}");
    return kept && typeof kept === "object" ? kept : {};
  } catch {
    return {};
  }
}
