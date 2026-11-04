/**
 * Every brand's look. The form reads the address it is opened on and applies the
 * brand whose domain matches, so adding a brand means adding one entry here.
 * The first entry is used on addresses that match none.
 *
 * Each theme value becomes a CSS variable: `primaryTint` is `--brand-primary-tint`.
 */
export type Theme = {
  /** "dark" also makes the browser's own parts (scrollbars, lists) dark. */
  scheme: "light" | "dark";
  /** The page behind the form. */
  background: string;
  /** Fields, cards and lists. */
  surface: string;
  /** Quiet areas: the language switch, a disabled button. */
  surfaceMuted: string;
  foreground: string;
  /** Longer text, like the consent paragraphs. */
  bodyText: string;
  /** Hints and placeholders. */
  muted: string;
  border: string;
  /** Borders on hover. */
  borderStrong: string;
  /** Lines between sections. */
  softLine: string;
  /** Buttons and picked choices. */
  primary: string;
  primaryHover: string;
  /** Text on a primary background. */
  primaryForeground: string;
  /** The soft ring around a field being typed in, and picked cards. */
  primaryTint: string;
  /** The colored word in the left panel's title. */
  titleAccent: string;
  /** The steps indicator. */
  step: string;
  stepForeground: string;
  danger: string;
  /** Borders of choices with an error. */
  dangerSoft: string;
  /** The "try later" icon. */
  warnBg: string;
  warnFg: string;
  /** Behind the left photo while it loads. */
  hero: string;
  /** Field and button corners: 999px is fully round. */
  fieldRadius: string;
  /** Must be a font this project loads (see global.css). */
  font: string;
  /** Titles. */
  headingFont: string;
};

export type Brand = {
  /** Short and stable: used in ?brand= for previews. */
  id: string;
  name: string;
  domains: string[];
  /** The logo's square icon, a path under public/, or null for a placeholder icon. */
  logo: string | null;
  /** The photo on the left panel (computers only), a path under public/. Tall, about 2:3. */
  photo: string;
  theme: Theme;
};

const LIGHT = {
  scheme: "light",
  background: "#f7f8fa",
  surface: "#ffffff",
  surfaceMuted: "#eef0f3",
  foreground: "#1f2937",
  bodyText: "#374151",
  muted: "#6b7280",
  border: "#e2e5ea",
  borderStrong: "#c7ccd4",
  softLine: "#eceef2",
  primaryForeground: "#ffffff",
  stepForeground: "#ffffff",
  danger: "#dc2626",
  dangerSoft: "#f3b4b4",
  warnBg: "#fdf3dc",
  warnFg: "#92610e",
  hero: "#1f2937",
} as const;

const SYSTEM_FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export const BRANDS: Brand[] = [
  {
    id: "needaloantoday",
    name: "NeedALoanToday",
    domains: ["needaloantoday.ca", "needaloantoday.online"],
    logo: "/brands/needaloantoday.svg",
    photo: "/brands/needaloantoday-photo.webp",
    theme: {
      ...LIGHT,
      background: "#f6f9f8",
      foreground: "#0f1720",
      primary: "#10b77f",
      primaryHover: "#0e9f6e",
      primaryTint: "#d5f5e9",
      titleAccent: "#10b77f",
      step: "#10b77f",
      fieldRadius: "10px",
      font: "'DM Sans Variable', sans-serif",
      headingFont: "'Space Grotesk Variable', sans-serif",
    },
  },
  {
    id: "365loan",
    name: "365loan",
    domains: ["365loan.ca", "365loan.online"],
    logo: "/brands/365loan.svg",
    photo: "/brands/365loan-photo.webp",
    theme: {
      ...LIGHT,
      background: "#f6f8f7",
      foreground: "#0d1422",
      primary: "#161d35",
      primaryHover: "#0d1422",
      primaryTint: "#e2f1e9",
      titleAccent: "#7fd1a3",
      step: "#2f8f5f",
      fieldRadius: "999px",
      font: "'Inter Variable', sans-serif",
      headingFont: "'Sora Variable', sans-serif",
    },
  },
  {
    id: "ask4loan",
    name: "Ask4Loan",
    domains: ["ask4loan.ca", "ask4loan.xyz"],
    logo: "/brands/ask4loan.svg",
    photo: "/brands/ask4loan-photo.webp",
    theme: {
      ...LIGHT,
      background: "#f8fafc",
      foreground: "#1f2937",
      muted: "#64748b",
      border: "#e2e8f0",
      borderStrong: "#94a3b8",
      softLine: "#f1f5f9",
      primary: "#10b981",
      primaryHover: "#059669",
      primaryTint: "#d1fae5",
      titleAccent: "#34d399",
      step: "#10b981",
      fieldRadius: "8px",
      font: SYSTEM_FONT,
      headingFont: SYSTEM_FONT,
    },
  },
  {
    id: "e-loan",
    name: "E-Loan",
    domains: ["e-loan.ca", "e-loan.online"],
    logo: "/brands/e-loan.svg",
    photo: "/brands/e-loan-photo.webp",
    theme: {
      ...LIGHT,
      background: "#fafafa",
      foreground: "#161616",
      bodyText: "#3a3a3a",
      muted: "#6b6b6b",
      border: "#e5e5e5",
      borderStrong: "#a3a3a3",
      softLine: "#ebebeb",
      surfaceMuted: "#f0f0f0",
      primary: "#161616",
      primaryHover: "#000000",
      primaryTint: "#f9fa58",
      titleAccent: "#f9fa58",
      step: "#161616",
      fieldRadius: "4px",
      font: "'Geist Variable', sans-serif",
      headingFont: "'Geist Variable', sans-serif",
    },
  },
  {
    id: "loanhero",
    name: "LoanHero",
    domains: ["loanhero.ca"],
    logo: "/brands/loanhero.svg",
    photo: "/brands/loanhero-photo.webp",
    theme: {
      ...LIGHT,
      background: "#f8f9fc",
      foreground: "#1f2937",
      muted: "#64748b",
      border: "#e2e8f0",
      borderStrong: "#94a3b8",
      softLine: "#eef2ff",
      primary: "#6366f1",
      primaryHover: "#4f46e5",
      primaryTint: "#e0e7ff",
      titleAccent: "#f97316",
      step: "#6366f1",
      fieldRadius: "14px",
      font: "'Poppins', sans-serif",
      headingFont: "'Space Grotesk Variable', sans-serif",
    },
  },
];

/** "primaryTint" -> "--brand-primary-tint". */
export function brandVar(key: string) {
  return "--brand-" + key.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
}

/**
 * The brand for an address. On addresses that belong to no brand (this computer, the
 * vercel.app preview), ?brand=<id> picks one, so a look can be checked before its domain is set up.
 * index.astro repeats this in its first script, which can't import it.
 */
export function brandForHost(host: string, search = ""): Brand {
  const name = host.toLowerCase();
  const byHost = BRANDS.find((brand) => brand.domains.some((domain) => name === domain || name.endsWith(`.${domain}`)));
  if (byHost) return byHost;
  const asked = new URLSearchParams(search).get("brand");
  return BRANDS.find((brand) => brand.id === asked) ?? BRANDS[0];
}
