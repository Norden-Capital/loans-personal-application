import { useRef } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Say } from "@/components/apply/pieces";
import { LEGAL_DETAILS, LEGAL_TEXT, fillLegal, type Block } from "@/lib/legal";

export type LegalDoc = "terms" | "privacy";

const TITLES: Record<LegalDoc, string> = {
  terms: "Terms and Conditions",
  privacy: "Privacy Policy",
};

/** One block of the text. {privacyLink} in the Terms becomes a link that opens the Privacy Policy here. */
function LegalBlock({ block, fill, onOpen }: { block: Block; fill: (text: string) => string; onOpen: (doc: LegalDoc) => void }) {
  if ("h" in block) return <h4 className="legal-sub">{fill(block.h)}</h4>;
  if ("list" in block)
    return (
      <ul className="legal-list">
        {block.list.map((item) => (
          <li key={item}>{fill(item)}</li>
        ))}
      </ul>
    );
  if ("lines" in block)
    return (
      <p className="legal-lines">
        {block.lines.map((line) => (
          <span key={line}>{fill(line)}</span>
        ))}
      </p>
    );
  const [before, after] = block.p.split("{privacyLink}");
  return (
    <p>
      {fill(before)}
      {after !== undefined ? (
        <>
          <button type="button" className="legal-link" onClick={() => onOpen("privacy")}>
            Privacy Policy
          </button>
          {fill(after)}
        </>
      ) : null}
    </p>
  );
}

/**
 * Terms or Privacy, read without leaving the form. Filled in for the brand the form is on.
 * The text is English only for now. "trap-focus": the keyboard stays in the sheet, but the
 * page keeps its scrollbar (no white strip).
 */
export function LegalSheet({
  doc,
  onClose,
  onOpen,
  say,
  brand,
  site,
}: {
  doc: LegalDoc | null;
  onClose: () => void;
  /** Switch to the other document. */
  onOpen: (doc: LegalDoc) => void;
  say: Say;
  brand: string;
  /** The brand's website, like needaloantoday.ca. */
  site: string;
}) {
  const fill = (text: string) => fillLegal(text, brand, site);
  // Focus starts on the text, so it opens at the top (not scrolled down to the first link).
  const body = useRef<HTMLDivElement>(null);
  return (
    <Sheet modal="trap-focus" open={doc !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="legal-sheet" initialFocus={body}>
        {doc ? (
          <>
            <SheetHeader className="legal-head">
              <SheetTitle className="legal-title">{say(TITLES[doc])}</SheetTitle>
              <SheetDescription>
                {say("Last updated:")} {LEGAL_DETAILS.updated}
              </SheetDescription>
            </SheetHeader>
            {/* key: a new document starts at the top. */}
            <div className="legal-body" key={doc} ref={body} tabIndex={-1}>
              {LEGAL_TEXT[doc].map((section) => (
                <section key={section.title}>
                  <h3 className="legal-section">{section.title}</h3>
                  {section.blocks.map((block, index) => (
                    <LegalBlock key={index} block={block} fill={fill} onOpen={onOpen} />
                  ))}
                </section>
              ))}
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
