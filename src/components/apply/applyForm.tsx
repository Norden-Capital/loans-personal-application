import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";

import { AmountBox } from "@/components/apply/amountBox";
import { LanguageSwitch } from "@/components/apply/languageSwitch";
import { LogoMark } from "@/components/apply/logoMark";
import { PhoneField } from "@/components/apply/phoneField";
import { Chips, Choice, Field, TextInput } from "@/components/apply/pieces";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { brandForHost } from "@/lib/brands";
import {
  ADDRESS_MONTHS,
  CREDIT_SCORES,
  FINANCIAL_SITUATIONS,
  INCOME_TYPES,
  JOB_MONTHS,
  PAY_FREQUENCY,
  PROVINCES,
  PURPOSES,
  STEP_ONE_FIELDS,
  YES_NO,
  formatPostalCode,
  isOwner,
  isWorking,
  problemWith,
  stepTwoFields,
  yearsAgo,
  type PhoneState,
  type Values,
} from "@/lib/formRules";
import { translate, type Lang } from "@/lib/i18n";
import { stepOneRequest, stepTwoRequest } from "@/lib/requests";
import { rememberTracking } from "@/lib/tracking";
import { countVisit } from "@/lib/visit";

/** Astro first renders the form to HTML on the server, where useLayoutEffect only warns. */
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const STEPS = [
  { name: "Your info", desc: "Amount, name and address" },
  { name: "Income", desc: "Job, income and home" },
  { name: "Bank check", desc: "Connect your bank securely" },
];

const SOMETHING_WRONG = "Something went wrong. Please try again.";

type Screen = "waiting" | "alreadyApplied" | "tryLater";

const SCREEN_TITLES: Record<Screen, [string, string]> = {
  waiting: ["Finding your offer...", "This can take up to a minute. Please keep this page open."],
  alreadyApplied: ["You already applied.", "We have your application. You don't need to apply again."],
  tryLater: ["We can't finish this right now.", "Your answers are saved. Please try again in a few minutes."],
};

async function post(url: string, body: unknown) {
  try {
    const answer = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return { ok: answer.ok, status: answer.status, data: await answer.json().catch(() => ({})) };
  } catch {
    return { ok: false, status: 0, data: {} };
  }
}

export function ApplyForm() {
  const [lang, setLang] = useState<Lang>("en");
  const [logo, setLogo] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(1500);
  const [values, setValues] = useState<Values>({});
  const [phone, setPhone] = useState<PhoneState>({ status: "empty", national: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMore, setShowMore] = useState(false);
  const [dates, setDates] = useState<{ max?: string; min?: string }>({});
  const [stepToken, setStepToken] = useState<string | null>(null);
  const [savedLang, setSavedLang] = useState<Lang | null>(null);
  const [sending, setSending] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen | null>(null);

  const say = (text: string) => translate(lang, text);

  // The language was already chosen before the page painted; the brand depends on the address.
  useBrowserLayoutEffect(() => {
    rememberTracking();
    if (document.documentElement.lang === "fr") setLang("fr");
    setLogo(brandForHost(location.hostname).logo);
    setDates({ max: yearsAgo(18), min: yearsAgo(99) });
  }, []);

  useEffect(countVisit, []);

  function switchLanguage(next: Lang) {
    document.documentElement.lang = next;
    setLang(next);
  }

  function set(name: string, value: string) {
    const next = name === "postalCode" ? formatPostalCode(value) : value;
    setValues((current) => ({ ...current, [name]: next }));
    setErrors((current) => {
      const rest = { ...current };
      delete rest[name];
      // Under 18: say so right away, not only on Next.
      if (name === "birthDate" && next) {
        const problem = problemWith(name, { birthDate: next }, phone);
        if (problem) rest[name] = problem;
      }
      return rest;
    });
  }

  function changePhone(next: PhoneState) {
    setPhone(next);
    setErrors((current) => {
      if (!current.phone) return current;
      const rest = { ...current };
      delete rest.phone;
      return rest;
    });
  }

  // Each step's line fills with the share of its visible questions answered correctly.
  const fill = useMemo(() => {
    const share = (fields: string[]) =>
      (fields.filter((field) => !problemWith(field, values, phone)).length / fields.length) * 100;
    return [share(STEP_ONE_FIELDS), share(stepTwoFields(values)), 0];
  }, [values, phone]);

  function go(next: number) {
    setStep(next);
    window.scrollTo(0, 0);
  }

  function showFirstError(fields: string[], found: Record<string, string>): boolean {
    setErrors(found);
    const first = fields.find((field) => found[field]);
    if (first) {
      document.querySelector(`[data-field="${first}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return Boolean(first);
  }

  /** When the LMS refuses an answer: under its field if it's on this step, or else by the button. */
  function showRefusal(status: number, data: { message?: string; fieldErrors?: Record<string, string> }, fields: string[]) {
    const fromLms = data.fieldErrors ?? {};
    if (showFirstError(fields, fromLms)) return;
    setProblem(status === 400 && data.message ? data.message : SOMETHING_WRONG);
  }

  /** Saves step 1. Returns the token for step 2, or null if it couldn't be saved. */
  async function saveStepOne(): Promise<string | null> {
    const { ok, status, data } = await post("/api/apply", stepOneRequest({ stepToken, amount, values, phone, lang }));
    if (!ok || !data.stepToken) {
      showRefusal(status, data, STEP_ONE_FIELDS);
      return null;
    }
    setStepToken(data.stepToken);
    setSavedLang(lang);
    return data.stepToken;
  }

  /** Step 2's last move: LeadScout's answer picks the screen. */
  async function finish(token: string) {
    setScreen("waiting");
    go(3);
    const { ok, status, data } = await post(`/api/apply/${token}/finish`, stepTwoRequest(values));
    if (ok && data.outcome === "GO_TO_LINK" && data.redirectUrl?.startsWith("https://")) {
      // Keeps showing the waiting screen until the partner's page opens.
      window.location.assign(data.redirectUrl);
    } else if (ok && data.outcome === "ALREADY_APPLIED") {
      setScreen("alreadyApplied");
    } else if (status === 400) {
      setScreen(null);
      go(2);
      showRefusal(status, data, stepTwoFields(values));
    } else {
      setScreen("tryLater");
    }
  }

  async function goNext() {
    const fields = step === 1 ? STEP_ONE_FIELDS : stepTwoFields(values);
    const found: Record<string, string> = {};
    for (const field of fields) {
      const fieldProblem = problemWith(field, values, phone);
      if (fieldProblem) found[field] = fieldProblem;
    }
    setProblem(null);
    if (showFirstError(fields, found)) return;

    setSending(true);
    if (step === 1) {
      if (await saveStepOne()) go(2);
    } else {
      // The language is saved with step 1, so a switch on step 2 is saved again first.
      const token = lang === savedLang ? stepToken : await saveStepOne();
      if (token) await finish(token);
    }
    setSending(false);
  }

  const shared = { values, errors, set, say };
  const title = screen
    ? SCREEN_TITLES[screen]
    : step === 1
      ? ["Let's begin with your information.", "Please provide a few details to get started."]
      : ["Now, tell us about your income.", "Last step before your offer"];

  return (
    <div className="right">
      <div className="top-sticky">
        <div className="inner">
          <div className="topbar-in">
            <LogoMark logo={logo} small />
            <LanguageSwitch lang={lang} onChange={switchLanguage} />
          </div>
        </div>
      </div>

      <main className="inner main">
        <ol className="stepper">
          {STEPS.map((item, index) => {
            const number = index + 1;
            return (
              <li
                key={item.name}
                className={number === step ? "cur" : number < step ? "done" : undefined}
                style={{ "--fill": `${fill[index]}%` } as React.CSSProperties}
                aria-current={number === step ? "step" : undefined}
              >
                <span className="num">{number < step ? <Check className="size-4" aria-hidden /> : number}</span>
                <span className="txt">
                  <span className="name">{say(item.name)}</span>
                  <span className="desc">{say(item.desc)}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="head">
          <h1>{say(title[0])}</h1>
          <p>{say(title[1])}</p>
        </div>

        <form noValidate onSubmit={(event) => event.preventDefault()}>
          {/* Hidden rather than removed, so going back keeps every answer. */}
          <section hidden={step !== 1}>
            <AmountBox amount={amount} setAmount={setAmount} lang={lang} say={say} />

            <div className="section">
              <p className="section-title">{say("About you")}</p>
              <div className="fields">
                <Field name="firstName" label="First name" error={errors.firstName} say={say} className="half">
                  <TextInput name="firstName" placeholder="Enter first name" autoComplete="given-name" {...shared} />
                </Field>
                <Field name="lastName" label="Last name" error={errors.lastName} say={say} className="half">
                  <TextInput name="lastName" placeholder="Enter last name" autoComplete="family-name" {...shared} />
                </Field>
                <Field name="email" label="Email" error={errors.email} say={say} className="full">
                  <TextInput name="email" type="email" placeholder="Enter your email" autoComplete="email" {...shared} />
                </Field>
                <Field name="phone" label="Phone" error={errors.phone} say={say}>
                  <PhoneField lang={lang} say={say} invalid={Boolean(errors.phone)} onChange={changePhone} />
                </Field>
                <Field name="birthDate" label="Date of birth" error={errors.birthDate} say={say}>
                  <TextInput name="birthDate" type="date" autoComplete="bday" max={dates.max} min={dates.min} {...shared} />
                </Field>
              </div>
            </div>

            <div className="section">
              <p className="section-title">{say("Your address")}</p>
              <div className="fields">
                <Field name="address" label="Street address" error={errors.address} say={say} className="full">
                  <TextInput name="address" placeholder="Enter your address" autoComplete="street-address" {...shared} />
                </Field>
                <Field name="province" label="Province" error={errors.province} say={say}>
                  <Choice name="province" options={PROVINCES} {...shared} />
                </Field>
                <Field name="city" label="City" error={errors.city} say={say} className="half">
                  <TextInput name="city" placeholder="Enter your city" autoComplete="address-level2" {...shared} />
                </Field>
                <Field name="postalCode" label="Postal code" error={errors.postalCode} say={say} className="full half">
                  <TextInput name="postalCode" placeholder="A1A-1A1" autoComplete="postal-code" maxLength={7} {...shared} />
                </Field>
              </div>
            </div>

            <div className="consent">
              <div className={errors.consent ? "field bad" : "field"} data-field="consent">
                <label className="check">
                  <Checkbox
                    checked={values.consent === "yes"}
                    onCheckedChange={(checked) => set("consent", checked ? "yes" : "")}
                  />
                  <span>
                    {say("I agree that my application and bank check (IBV) are shared with lenders to find me a loan.")}{" "}
                    {showMore ? say("I can be contacted by email, phone and text about my application.") + " " : null}
                    <button
                      type="button"
                      className="linkbtn"
                      onClick={(event) => {
                        event.preventDefault();
                        setShowMore(!showMore);
                      }}
                    >
                      {say(showMore ? "Show less" : "Show more")}
                    </button>
                  </span>
                </label>
                {errors.consent ? <p className="err">{say(errors.consent)}</p> : null}
              </div>
              <div className={errors.terms ? "field bad" : "field"} data-field="terms">
                <label className="check">
                  <Checkbox
                    checked={values.terms === "yes"}
                    onCheckedChange={(checked) => set("terms", checked ? "yes" : "")}
                  />
                  <span>
                    {say("I accept the")} <a href="#">{say("Terms")}</a> {say("and")}{" "}
                    <a href="#">{say("Privacy Policy")}</a>.
                  </span>
                </label>
                {errors.terms ? <p className="err">{say(errors.terms)}</p> : null}
              </div>
              <label className="check">
                <Checkbox
                  checked={values.optIn === "yes"}
                  onCheckedChange={(checked) => set("optIn", checked ? "yes" : "")}
                />
                <span>{say("Send me offers by email and text. (Optional)")}</span>
              </label>
            </div>
          </section>

          <section hidden={step !== 2}>
            <p className="section-title">{say("Employment")}</p>
            <Field name="incomeType" label="What is your current employment situation?" error={errors.incomeType} say={say}>
              <Choice name="incomeType" options={INCOME_TYPES} {...shared} />
            </Field>

            {isWorking(values) ? (
              <div className="fields">
                <Field name="employerName" label="Employer" error={errors.employerName} say={say}>
                  <TextInput name="employerName" placeholder="Enter your employer" {...shared} />
                </Field>
                <Field name="jobTitle" label="Job title" error={errors.jobTitle} say={say}>
                  <TextInput name="jobTitle" placeholder="Enter your job title" {...shared} />
                </Field>
                <Field name="employedMonths" label="Time at this job" error={errors.employedMonths} say={say}>
                  <Choice name="employedMonths" options={JOB_MONTHS} {...shared} />
                </Field>
                <Field name="payDate1" label="Next pay date" error={errors.payDate1} say={say}>
                  <TextInput name="payDate1" type="date" {...shared} />
                </Field>
                <Field name="payFrequency" label="How often do you get paid?" error={errors.payFrequency} say={say} className="full" asGroup>
                  <Chips name="payFrequency" label="How often do you get paid?" options={PAY_FREQUENCY} columns={4} values={values} set={set} say={say} />
                </Field>
              </div>
            ) : null}

            <div className="section">
              <p className="section-title">{say("Income")}</p>
              <div className="fields">
                <Field name="monthlyIncome" label="Monthly income (before tax)" error={errors.monthlyIncome} say={say}>
                  <TextInput name="monthlyIncome" type="number" inputMode="numeric" min={0} money {...shared} />
                </Field>
                <Field name="directDeposit" label="Is your pay sent to your bank?" error={errors.directDeposit} say={say} asGroup>
                  <Chips name="directDeposit" label="Is your pay sent to your bank?" options={YES_NO} columns={2} values={values} set={set} say={say} />
                </Field>
              </div>
            </div>

            <div className="section">
              <p className="section-title">{say("Home")}</p>
              <div className="fields">
                <Field name="ownHome" label="Do you own your home?" error={errors.ownHome} say={say} asGroup>
                  <Chips name="ownHome" label="Do you own your home?" options={YES_NO} columns={2} values={values} set={set} say={say} />
                </Field>
                <Field name="timeAtAddress" label="Time at this address" error={errors.timeAtAddress} say={say}>
                  <Choice name="timeAtAddress" options={ADDRESS_MONTHS} {...shared} />
                </Field>
                <Field name="rentMortgagePayment" label="Monthly rent or mortgage" error={errors.rentMortgagePayment} say={say} className="full">
                  <TextInput name="rentMortgagePayment" type="number" inputMode="numeric" min={0} placeholder="0" money {...shared} />
                </Field>
                {isOwner(values) ? (
                  <>
                    <Field name="propertyValue" label="Home value" error={errors.propertyValue} say={say}>
                      <TextInput name="propertyValue" type="number" inputMode="numeric" min={0} money {...shared} />
                    </Field>
                    <Field name="propertyMortgage" label="Mortgage left" error={errors.propertyMortgage} say={say}>
                      <TextInput name="propertyMortgage" type="number" inputMode="numeric" min={0} placeholder="0" money {...shared} />
                    </Field>
                  </>
                ) : null}
              </div>
            </div>

            <div className="section">
              <p className="section-title">{say("Loan and credit")}</p>
              <div className="fields">
                <Field name="purpose" label="What is the loan for?" error={errors.purpose} say={say}>
                  <Choice name="purpose" options={PURPOSES} {...shared} />
                </Field>
                <Field name="unsecuredDebtAmount" label="Credit card and loan debt" error={errors.unsecuredDebtAmount} say={say}>
                  <TextInput name="unsecuredDebtAmount" type="number" inputMode="numeric" min={0} placeholder="0" money {...shared} />
                </Field>
                <Field name="financialSituation" label="Are you in bankruptcy or a proposal?" error={errors.financialSituation} say={say} className="full">
                  <Choice name="financialSituation" options={FINANCIAL_SITUATIONS} {...shared} />
                </Field>
                <Field name="creditScore" label="Your credit score" error={errors.creditScore} say={say} className="full" asGroup>
                  <Chips name="creditScore" label="Your credit score" options={CREDIT_SCORES} columns={4} values={values} set={set} say={say} />
                </Field>
              </div>
            </div>

            <p className="agree">
              {say("By continuing, you agree to our")} <a href="#">{say("Terms")}</a> {say("and")}{" "}
              <a href="#">{say("Privacy Policy")}</a>.
            </p>
          </section>

          {screen === "waiting" ? <Loader2 className="waiting-icon animate-spin" aria-hidden /> : null}

          {screen === "tryLater" && stepToken ? (
            <div className="nav">
              <Button type="button" className="next" onClick={() => finish(stepToken)}>
                {say("Try again")}
              </Button>
            </div>
          ) : null}

          {problem ? (
            <p className="problem" role="alert">
              {say(problem)}
            </p>
          ) : null}

          {step < 3 ? (
            <>
              <div className="nav">
                <Button type="button" className="next" disabled={sending} onClick={goNext}>
                  {say(step === 2 ? "See my offer" : "Next")}
                  {sending ? <Loader2 className="animate-spin" aria-hidden /> : <ArrowRight aria-hidden />}
                </Button>
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="back bg-transparent"
                    disabled={sending}
                    onClick={() => {
                      setProblem(null);
                      go(step - 1);
                    }}
                  >
                    {say("Previous")}
                  </Button>
                ) : null}
              </div>
              <div className="reassure">
                <Lock className="size-3.5" aria-hidden />
                {say("Your information is sent securely.")}
              </div>
            </>
          ) : null}
        </form>
      </main>
    </div>
  );
}
