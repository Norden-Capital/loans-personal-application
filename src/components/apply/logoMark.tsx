import { ImageIcon } from "lucide-react";

import { cn } from "cn";

/** The brand's logo square. Shows a placeholder icon until the brand has a logo. */
export function LogoMark({ logo, small }: { logo?: string | null; small?: boolean }) {
  return (
    <div className={cn("logo", small && "logo-small")} role="img" aria-label="Logo">
      {logo ? <img src={logo} alt="" /> : <ImageIcon aria-hidden />}
    </div>
  );
}
