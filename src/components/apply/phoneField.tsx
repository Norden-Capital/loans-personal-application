import { useEffect, useRef } from "react";
import "intl-tel-input/build/css/intlTelInput.css";

import { Input } from "@/components/ui/input";
import type { PhoneState } from "@/lib/formRules";
import type { Lang } from "@/lib/i18n";

type Iti = {
  destroy(): void;
  getNumber(): string;
  setNumber(number: string): void;
  isValidNumber(): boolean | null;
  getSelectedCountryData(): { iso2?: string };
};

/** LeadScout only takes Canadian numbers. Its test number isn't real, so it's allowed by name. */
function readPhone(iti: Iti): PhoneState {
  const digits = iti.getNumber().replace(/\D/g, "");
  if (!digits) return { status: "empty", national: "" };
  const national = digits.slice(-10);
  if (digits === "15555555555") return { status: "ok", national };
  if (!iti.isValidNumber()) return { status: "invalid", national };
  return { status: iti.getSelectedCountryData().iso2 === "ca" ? "ok" : "foreign", national };
}

/**
 * The phone field with its flag. The flag library is large, so it loads after the
 * page shows. Until then this is an ordinary field that keeps what was typed.
 */
export function PhoneField({
  lang,
  say,
  invalid,
  onChange,
}: {
  lang: Lang;
  say: (text: string) => string;
  invalid: boolean;
  onChange: (phone: PhoneState) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const report = useRef(onChange);
  report.current = onChange;
  const country = useRef("ca");

  useEffect(() => {
    const element = input.current;
    if (!element) return;
    let iti: Iti | null = null;
    let cancelled = false;
    const update = () => {
      if (!iti) return;
      country.current = iti.getSelectedCountryData().iso2 || country.current;
      report.current(readPhone(iti));
    };
    // Someone may type "+1 514...": tidy it so the +1 doesn't show twice.
    const tidy = () => {
      if (iti && iti.getNumber()) iti.setNumber(iti.getNumber());
      update();
    };

    import("intl-tel-input/intlTelInputWithUtils").then(({ default: intlTelInput }) => {
      if (cancelled) return;
      const names = new Intl.DisplayNames([lang], { type: "region" });
      const i18n: Record<string, string> = {
        searchPlaceholder: say("Search"),
        zeroSearchResults: say("No results"),
        oneSearchResult: say("1 result"),
        multipleSearchResults: say("${count} results"),
        selectedCountryAriaLabel: say("Selected country"),
        noCountrySelected: say("No country selected"),
        countryListAriaLabel: say("List of countries"),
      };
      for (const c of intlTelInput.getCountryData()) i18n[c.iso2] = names.of(c.iso2.toUpperCase()) ?? c.name;

      // Starts on Canada; the flag then follows the number typed.
      iti = intlTelInput(element, {
        initialCountry: country.current as never,
        separateDialCode: true,
        autoPlaceholder: "off",
        countryOrder: ["ca", "us"] as never,
        i18n,
      }) as unknown as Iti;
      update();
    });

    element.addEventListener("input", update);
    element.addEventListener("countrychange", update);
    element.addEventListener("blur", tidy);
    return () => {
      cancelled = true;
      element.removeEventListener("input", update);
      element.removeEventListener("countrychange", update);
      element.removeEventListener("blur", tidy);
      iti?.destroy();
    };
    // Country names and search text follow the language, so it rebuilds on a switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <Input
      ref={input}
      id="phone"
      name="phone"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="000-000-0000"
      aria-invalid={invalid ? true : undefined}
      aria-describedby={invalid ? "phone-error" : undefined}
    />
  );
}
