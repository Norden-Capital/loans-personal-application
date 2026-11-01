/**
 * Every brand's look. The form reads the address it is opened on and applies the
 * brand whose domain matches, so adding a brand means adding one entry here.
 * The first entry is used on addresses that match none, like localhost.
 */
export type Brand = {
  name: string;
  domains: string[];
  /** A path under public/, or null for the placeholder icon. */
  logo: string | null;
  theme: {
    /** Buttons and picked choices. */
    primary: string;
    primaryHover: string;
    /** The soft ring around a field being typed in. */
    primaryTint: string;
    /** The colored word in the left panel's title. */
    titleAccent: string;
    /** The steps indicator. */
    step: string;
    background: string;
    /** Field corners: 999px is fully round. */
    fieldRadius: string;
    /** Must be a font this project loads. */
    font: string;
  };
};

export const BRANDS: Brand[] = [
  {
    name: "NeedALoanToday",
    domains: ["needaloantoday.online"],
    logo: null, // Placeholder until the real logo arrives.
    theme: {
      primary: "#2a5244",
      primaryHover: "#1f3f34",
      primaryTint: "#e6eee8",
      titleAccent: "#9ee0c3",
      step: "#5b4633",
      background: "#f9f7f2",
      fieldRadius: "999px",
      font: "'Outfit Variable'",
    },
  },
];

export function brandForHost(host: string): Brand {
  const name = host.toLowerCase();
  return (
    BRANDS.find((brand) => brand.domains.some((domain) => name === domain || name.endsWith(`.${domain}`))) ??
    BRANDS[0]
  );
}
