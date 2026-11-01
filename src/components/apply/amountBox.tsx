import { useState } from "react";

import { Input } from "@/components/ui/input";
import { AMOUNTS, MAX_AMOUNT, MIN_AMOUNT } from "@/lib/formRules";
import { money, type Lang } from "@/lib/i18n";

/** Minus, the amount (which can be typed), plus, and the suggested amounts. */
export function AmountBox({
  amount,
  setAmount,
  lang,
  say,
}: {
  amount: number;
  setAmount: (amount: number) => void;
  lang: Lang;
  say: (text: string) => string;
}) {
  // While typing, the box shows plain digits. Otherwise it shows the formatted amount.
  const [typed, setTyped] = useState<string | null>(null);

  function finishTyping() {
    const value = Number(typed);
    // An empty box keeps the last amount; anything else is kept inside the limits.
    if (value) setAmount(Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, value)));
    setTyped(null);
  }

  return (
    <div className="amount-box">
      <div>
        <label className="ask" id="amountLabel" htmlFor="amountInput">
          {say("How much would you like to borrow?")}
        </label>
        <div className="amt-hint">{say("From $300 to $3,000")}</div>
      </div>
      <div className="amt-ctl">
        <button
          type="button"
          aria-label={say("Lower the amount")}
          disabled={amount <= MIN_AMOUNT}
          onClick={() => setAmount([...AMOUNTS].reverse().find((a) => a < amount) ?? MIN_AMOUNT)}
        >
          &minus;
        </button>
        <Input
          id="amountInput"
          inputMode="numeric"
          autoComplete="off"
          value={typed ?? money(lang, amount)}
          onFocus={(event) => {
            setTyped(String(amount));
            // After the click and the new text settle, or typing adds to the old amount.
            const box = event.target;
            requestAnimationFrame(() => box.select());
          }}
          onChange={(event) => setTyped(event.target.value.replace(/\D/g, ""))}
          onBlur={finishTyping}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
        />
        <button
          type="button"
          aria-label={say("Raise the amount")}
          disabled={amount >= MAX_AMOUNT}
          onClick={() => setAmount(AMOUNTS.find((a) => a > amount) ?? MAX_AMOUNT)}
        >
          +
        </button>
      </div>
      <div className="amt-picks" role="group" aria-labelledby="amountLabel">
        {AMOUNTS.map((value) => (
          <button key={value} type="button" aria-pressed={value === amount} onClick={() => setAmount(value)}>
            {money(lang, value)}
          </button>
        ))}
      </div>
    </div>
  );
}
