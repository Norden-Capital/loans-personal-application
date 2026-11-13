import { tracking } from "@/lib/tracking";

/** The browser's own date, like "2026-11-13". */
const today = () => new Date().toLocaleDateString("en-CA");

/** The random number this browser keeps, so a refresh the same day is counted once. */
function visitorIdOf(): string {
  try {
    const kept = localStorage.getItem("visitorId") ?? "";
    if (/^[A-Za-z0-9-]{8,64}$/.test(kept)) return kept;
    const fresh = crypto.randomUUID();
    localStorage.setItem("visitorId", fresh);
    return fresh;
  } catch {
    // Storage blocked: still counted, just not told apart from a refresh.
    return crypto.randomUUID();
  }
}

function send() {
  fetch("/api/visit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ visitorId: visitorIdOf(), source: tracking().source ?? null }),
    keepalive: true,
  }).catch(() => {});
}

/**
 * Tells the LMS someone opened the form, for the visitors count on Leads
 * Overview. The LMS counts each browser once a day. Nothing in it says who
 * the person is.
 *
 * Sent when the page opens, and again when the person comes back to it on a
 * new day without reloading (fixed 2026-11-13): phones keep a tab open for
 * days, and the Back button can show the page from memory. Before, those
 * return visits were never counted.
 *
 * Returns the cleanup, so it can be used straight in a React effect.
 */
export function countVisit() {
  let sentOn = today();
  send();

  const again = () => {
    if (document.visibilityState !== "visible" || today() === sentOn) return;
    sentOn = today();
    send();
  };
  // persisted: the page came back from the browser's memory (Back button).
  const shown = (event: PageTransitionEvent) => {
    if (event.persisted) {
      sentOn = today();
      send();
    }
  };

  document.addEventListener("visibilitychange", again);
  window.addEventListener("focus", again);
  window.addEventListener("pageshow", shown);
  return () => {
    document.removeEventListener("visibilitychange", again);
    window.removeEventListener("focus", again);
    window.removeEventListener("pageshow", shown);
  };
}
