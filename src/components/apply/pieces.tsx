import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { enCA, fr } from "react-day-picker/locale";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Option } from "@/lib/formRules";
import type { Lang } from "@/lib/i18n";

import { cn } from "cn";

export type Say = (text: string) => string;

/** A label, its control, and its error when there is one. */
export function Field({
  name,
  label,
  error,
  say,
  className,
  children,
  asGroup,
}: {
  name: string;
  label?: string;
  error?: string;
  say: Say;
  className?: string;
  children: React.ReactNode;
  /** For a row of buttons, which has no single control for a label to point at. */
  asGroup?: boolean;
}) {
  return (
    <div className={cn("field", error && "bad", className)} data-field={name}>
      {label ? (
        asGroup ? (
          <div className="lbl">{say(label)}</div>
        ) : (
          <label className="lbl" htmlFor={name}>
            {say(label)}
          </label>
        )
      ) : null}
      {children}
      {error ? <p className="err" id={`${name}-error`}>{say(error)}</p> : null}
    </div>
  );
}

export function TextInput({
  name,
  values,
  errors,
  set,
  say,
  placeholder,
  money,
  ...rest
}: {
  name: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  set: (name: string, value: string) => void;
  say: Say;
  placeholder?: string;
  money?: boolean;
} & Omit<React.ComponentProps<typeof Input>, "name" | "value" | "placeholder">) {
  const input = (
    <Input
      id={name}
      name={name}
      value={values[name] ?? ""}
      placeholder={placeholder ? say(placeholder) : undefined}
      aria-invalid={errors[name] ? true : undefined}
      aria-describedby={errors[name] ? `${name}-error` : undefined}
      onChange={(event) => set(name, event.target.value)}
      {...rest}
    />
  );
  return money ? <div className="money">{input}</div> : input;
}

/** A shadcn dropdown. The empty choice shows "Choose one". Not modal, so the page keeps its scrollbar. */
export function Choice({
  name,
  options,
  values,
  errors,
  set,
  say,
}: {
  name: string;
  options: Option[];
  values: Record<string, string>;
  errors: Record<string, string>;
  set: (name: string, value: string) => void;
  say: Say;
}) {
  const items = [{ value: null, label: say("Choose one") }, ...options.map((o) => ({ value: o.value, label: say(o.label) }))];
  return (
    <Select modal={false} items={items} value={values[name] || null} onValueChange={(value) => set(name, (value as string | null) ?? "")}>
      <SelectTrigger
        id={name}
        className="field-select"
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="field-select-list" alignItemWithTrigger={false}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {say(option.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Tap buttons for a quick answer: real radio buttons underneath, so the keyboard works. */
export function Chips({
  name,
  options,
  values,
  set,
  say,
  columns,
  label,
}: {
  name: string;
  options: Option[];
  values: Record<string, string>;
  set: (name: string, value: string) => void;
  say: Say;
  columns: 2 | 4;
  label: string;
}) {
  return (
    <div className={cn("chips", columns === 2 ? "c2" : "c4")} role="radiogroup" aria-label={say(label)}>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={values[name] === option.value}
            onChange={() => set(name, option.value)}
          />
          <span>
            {say(option.label)}
            {option.hint && say(option.hint) ? <small>{say(option.hint)}</small> : null}
          </span>
        </label>
      ))}
    </div>
  );
}

type PickerProps = {
  name: string;
  label: string;
  options: Option[];
  values: Record<string, string>;
  set: (name: string, value: string) => void;
  say: Say;
};

/** Yes / No as plain radio buttons, side by side. */
export function RadioRow({ name, label, options, values, set, say }: PickerProps) {
  return (
    <div className="radio-row" role="radiogroup" aria-label={say(label)}>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={values[name] === option.value}
            onChange={() => set(name, option.value)}
          />
          <span className="dot" aria-hidden />
          {say(option.label)}
        </label>
      ))}
    </div>
  );
}

/** Canadian score ranges; the bars show the level at a glance. */
const SCORE_INFO: Record<string, { range: string; level: number }> = {
  good: { range: "660 and up", level: 3 },
  fair: { range: "560 to 659", level: 2 },
  low: { range: "Under 560", level: 1 },
  unknown: { range: "That's OK", level: 0 },
};

/** Credit score as cards: a level meter, the name, and its score range. */
export function CreditScorePicker({ name, label, options, values, set, say }: PickerProps) {
  return (
    <div className="score-pick" role="radiogroup" aria-label={say(label)}>
      {options.map((option) => {
        const info = SCORE_INFO[option.value];
        return (
          <label key={option.value} data-level={info?.level ?? 0}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={values[name] === option.value}
              onChange={() => set(name, option.value)}
            />
            <span className="card">
              <span className="meter" aria-hidden>
                {info?.level ? [1, 2, 3].map((bar) => <i key={bar} className={bar <= info.level ? "on" : undefined} />) : "?"}
              </span>
              <span className="name">{say(option.label)}</span>
              <small>{info ? say(info.range) : null}</small>
            </span>
          </label>
        );
      })}
    </div>
  );
}

type FieldProps = {
  name: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  set: (name: string, value: string) => void;
  say: Say;
  lang: Lang;
};

/** Money: only digits are kept, shown as 3,200 (or 3 200 in French), after a $ box. */
export function MoneyInput({ name, values, errors, set, say, lang, placeholder }: FieldProps & { placeholder?: string }) {
  const digits = values[name] ?? "";
  const shown = digits ? Number(digits).toLocaleString(lang === "fr" ? "fr-CA" : "en-CA") : "";
  return (
    <div className={cn("money-box", errors[name] && "bad")}>
      <span className="cur" aria-hidden>$</span>
      <input
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={shown}
        placeholder={placeholder ? say(placeholder) : undefined}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        onChange={(event) => set(name, event.target.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 9))}
      />
    </div>
  );
}

/** "1985-03-15" <-> a Date at local midnight, so the day never shifts. */
const toDate = (value?: string) => (value ? new Date(`${value}T00:00:00`) : undefined);
const toValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** A shadcn calendar in a popover. Month and year dropdowns make a birth year quick to reach. */
export function DateInput({
  name,
  values,
  errors,
  set,
  say,
  lang,
  min,
  max,
  start,
}: FieldProps & { min?: string; max?: string; start?: string }) {
  const [open, setOpen] = useState(false);
  const selected = toDate(values[name]);
  const locale = lang === "fr" ? fr : enCA;
  const shown = selected?.toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", { day: "numeric", month: "long", year: "numeric" });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={name}
        className={cn("date-trigger", !selected && "empty")}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      >
        <span>{shown ?? say("Choose a date")}</span>
        <CalendarDays aria-hidden />
      </PopoverTrigger>
      <PopoverContent className="date-pop" align="start">
        <Calendar
          mode="single"
          locale={locale}
          captionLayout="dropdown"
          selected={selected}
          defaultMonth={selected ?? toDate(start ?? max)}
          startMonth={toDate(min)}
          endMonth={toDate(max)}
          disabled={[...(min ? [{ before: toDate(min)! }] : []), ...(max ? [{ after: toDate(max)! }] : [])]}
          onSelect={(date) => {
            if (!date) return;
            set(name, toValue(date));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
