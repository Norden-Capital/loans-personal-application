import { useEffect, useRef } from "react";

import type { Lang } from "@/lib/i18n";

type Turnstile = {
  render(box: HTMLElement, options: Record<string, unknown>): string;
  reset(widget: string): void;
  remove(widget: string): void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const WAIT_MS = 30_000;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.append(script);
  });
}

/**
 * Cloudflare's spam check. It runs quietly and only shows a box if it's unsure about
 * someone. Each pass works once, so a new one starts after every use.
 *
 * @returns the box to place on the page, and a way to get a pass (null if none came)
 */
export function useSpamCheck(lang: Lang) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const pass = useRef<string | null>(null);
  const waiting = useRef<(() => void) | null>(null);
  const blocked = useRef(false);

  useEffect(() => {
    let cancelled = false;
    pass.current = null;
    loadScript()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
          language: lang,
          appearance: "interaction-only",
          theme: "light",
          size: "flexible",
          "before-interactive-callback": () => box.current?.classList.add("showing"),
          "after-interactive-callback": () => box.current?.classList.remove("showing"),
          callback: (token: string) => {
            pass.current = token;
            waiting.current?.();
          },
          "expired-callback": () => {
            pass.current = null;
          },
        });
      })
      // Blocked by an ad blocker, for example: the form says so when Next is pressed.
      .catch(() => {
        blocked.current = true;
        waiting.current?.();
      });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [lang]);

  async function takePass(): Promise<string | null> {
    if (!pass.current && !blocked.current) {
      await new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, WAIT_MS);
        waiting.current = () => {
          clearTimeout(timer);
          resolve();
        };
      });
      waiting.current = null;
    }
    const token = pass.current;
    if (token && widget.current) {
      pass.current = null;
      window.turnstile?.reset(widget.current);
    }
    return token;
  }

  return { box, takePass };
}
