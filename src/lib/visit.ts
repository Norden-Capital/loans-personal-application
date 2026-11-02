/**
 * Tells the LMS someone opened the form, for the visitors count on Leads
 * Overview. The browser keeps a random number, so a refresh or a second visit
 * the same day is counted once. Nothing in it says who the person is.
 */
export function countVisit() {
  let visitorId = "";
  try {
    visitorId = localStorage.getItem("visitorId") ?? "";
    if (!/^[A-Za-z0-9-]{8,64}$/.test(visitorId)) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitorId", visitorId);
    }
  } catch {
    // Storage blocked: still counted, just not told apart from a refresh.
    visitorId = crypto.randomUUID();
  }
  const source = new URLSearchParams(location.search).get("utm_source");
  fetch("/api/visit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ visitorId, source }),
    keepalive: true,
  }).catch(() => {});
}
