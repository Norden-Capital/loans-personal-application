import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import type { Option } from "@/lib/formRules";

import { cn } from "cn";

type Say = (text: string) => string;

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
  return (
    <NativeSelect
      id={name}
      name={name}
      value={values[name] ?? ""}
      aria-invalid={errors[name] ? true : undefined}
      onChange={(event) => set(name, event.target.value)}
    >
      <NativeSelectOption value="">{say("Choose one")}</NativeSelectOption>
      {options.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {say(option.label)}
        </NativeSelectOption>
      ))}
    </NativeSelect>
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
