import type { Lang } from "@/lib/i18n";

/** EN and FR with their flags. The picked one is white; the other is faded. */
export function LanguageSwitch({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className="lang" role="group" aria-label="Language">
      <button type="button" aria-label="English" aria-pressed={lang === "en"} onClick={() => onChange("en")}>
        <span className="flag">
          <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <clipPath id="ukT">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#ukT)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </svg>
        </span>
        EN
      </button>
      <button type="button" aria-label="Français" aria-pressed={lang === "fr"} onClick={() => onChange("fr")}>
        <span className="flag">
          <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="1" height="2" fill="#002654" />
            <rect x="1" width="1" height="2" fill="#fff" />
            <rect x="2" width="1" height="2" fill="#CE1126" />
          </svg>
        </span>
        FR
      </button>
    </div>
  );
}
