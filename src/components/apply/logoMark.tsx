import { ImageIcon } from "lucide-react";

import { cn } from "cn";

/**
 * The brand's logo. index.astro picks the brand before the page paints and sets its
 * logo as --brand-logo; global.css shows it here. The icon shows when a brand has no logo.
 */
export function LogoMark({ name, small }: { name?: string; small?: boolean }) {
  return (
    <div className={cn("logo", small && "logo-small")} role="img" aria-label={name || "Logo"}>
      <ImageIcon aria-hidden />
    </div>
  );
}
