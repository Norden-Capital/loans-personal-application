import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Say } from "@/components/apply/pieces";

export type LegalDoc = "terms" | "privacy";

const TITLES: Record<LegalDoc, string> = {
  terms: "Terms and Conditions",
  privacy: "Privacy Policy",
};

/** Terms or Privacy, read without leaving the form. The real text is not written yet.
 * "trap-focus": the keyboard stays in the sheet, but the page keeps its scrollbar (no white strip). */
export function LegalSheet({ doc, onClose, say }: { doc: LegalDoc | null; onClose: () => void; say: Say }) {
  return (
    <Sheet modal="trap-focus" open={doc !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="legal-sheet">
        {doc ? (
          <>
            <SheetHeader className="legal-head">
              <SheetTitle className="legal-title">{say(TITLES[doc])}</SheetTitle>
              <SheetDescription>{say("Last updated: soon")}</SheetDescription>
            </SheetHeader>
            <div className="legal-body">
              <p>{say("The text will go here.")}</p>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
