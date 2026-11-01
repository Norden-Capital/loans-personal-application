/**
 * The form's choices and checks. The names are LeadScout's fields, and the checks
 * match the LMS's (ApplyDtos), which checks every answer again on the server.
 */
export type Values = Record<string, string>;

export type PhoneState = { status: "empty" | "ok" | "invalid" | "foreign"; national: string };

export const AMOUNTS = [300, 500, 700, 1000, 1500, 2000, 2500, 3000];
export const MIN_AMOUNT = AMOUNTS[0];
export const MAX_AMOUNT = AMOUNTS[AMOUNTS.length - 1];

export type Option = { value: string; label: string; hint?: string };

const options = (...labels: [string, string][]): Option[] => labels.map(([value, label]) => ({ value, label }));

export const PROVINCES = options(
  ["AB", "Alberta"],
  ["BC", "British Columbia"],
  ["MB", "Manitoba"],
  ["NB", "New Brunswick"],
  ["NL", "Newfoundland and Labrador"],
  ["NS", "Nova Scotia"],
  ["NT", "Northwest Territories"],
  ["NU", "Nunavut"],
  ["ON", "Ontario"],
  ["PE", "Prince Edward Island"],
  ["QC", "Quebec"],
  ["SK", "Saskatchewan"],
  ["YT", "Yukon"],
);

export const INCOME_TYPES = options(
  ["full_time", "Full-time job"],
  ["part_time", "Part-time job"],
  ["self_employed", "Self-employed"],
  ["gig_worker", "Gig work (Uber, delivery...)"],
  ["retired", "Retired"],
  ["disability", "Disability"],
  ["social_security", "Government benefits"],
  ["unemployed", "Unemployed"],
);

export const JOB_MONTHS = options(
  ["2", "2 months or less"],
  ["6", "About 6 months"],
  ["12", "About 1 year"],
  ["18", "About 1.5 years"],
  ["24", "About 2 years"],
  ["25", "2 to 5 years"],
  ["60", "5 years or more"],
);

export const ADDRESS_MONTHS = options(
  ["6", "6 months or less"],
  ["12", "About 1 year"],
  ["18", "About 1.5 years"],
  ["24", "About 2 years"],
  ["25", "2 to 5 years"],
  ["60", "5 years or more"],
);

export const PAY_FREQUENCY: Option[] = [
  { value: "WEEKLY", label: "Weekly", hint: "Every week" },
  { value: "BIWEEKLY", label: "Bi-weekly", hint: "Every 2 weeks" },
  { value: "TWICEMONTHLY", label: "Twice a month", hint: "1st and 15th" },
  { value: "MONTHLY", label: "Monthly", hint: "Once a month" },
];

export const YES_NO = options(["yes", "Yes"], ["no", "No"]);

/** LeadScout's exact text. Buying a home is left out: it doesn't fit a $3,000 loan. */
export const PURPOSES = [
  "Emergency Expense",
  "Medical Expenses",
  "Debt Consolidation",
  "Credit Card Consolidation",
  "Home Improvement",
  "Major Purchase",
  "Moving or Relocation",
  "Vacation",
  "Other",
].map((value) => ({ value, label: value }));

export const CREDIT_SCORES = options(["good", "Good"], ["fair", "Fair"], ["low", "Low"], ["unknown", "Not sure"]);

export const FINANCIAL_SITUATIONS = options(
  ["none", "No, none of these"],
  ["inBankruptcy", "Bankruptcy"],
  ["inConsumerProposal", "Consumer proposal"],
  ["inDMP", "Debt management plan"],
);

const WORKING = ["full_time", "part_time", "self_employed", "gig_worker"];

export const isWorking = (values: Values) => WORKING.includes(values.incomeType ?? "");
export const isOwner = (values: Values) => values.ownHome === "yes";

export function yearsAgo(years: number): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear() - years}-${month}-${day}`;
}

export function formatPostalCode(text: string): string {
  const code = text.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  return code.length > 3 ? `${code.slice(0, 3)}-${code.slice(3)}` : code;
}

const blank = (text: string | undefined) => !text || !text.trim();
const needNumber = (text: string | undefined) => blank(text) || Number(text) < 0;

export const STEP_ONE_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "birthDate",
  "address",
  "province",
  "city",
  "postalCode",
  "consent",
  "terms",
];

/** The questions shown on step 2 right now: job and home details only apply to some people. */
export function stepTwoFields(values: Values): string[] {
  return [
    "incomeType",
    ...(isWorking(values) ? ["employerName", "jobTitle", "employedMonths", "payDate1", "payFrequency"] : []),
    "monthlyIncome",
    "directDeposit",
    "ownHome",
    "timeAtAddress",
    "rentMortgagePayment",
    ...(isOwner(values) ? ["propertyValue", "propertyMortgage"] : []),
    "purpose",
    "unsecuredDebtAmount",
    "financialSituation",
    "creditScore",
  ];
}

/** What's wrong with one answer, in English (translated when shown), or null if it's fine. */
export function problemWith(field: string, values: Values, phone: PhoneState): string | null {
  const value = values[field];
  switch (field) {
    case "firstName":
      return blank(value) ? "Enter your first name." : null;
    case "lastName":
      return blank(value) ? "Enter your last name." : null;
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value ?? "").trim()) ? null : "Enter a valid email.";
    case "phone":
      if (phone.status === "ok") return null;
      return phone.status === "foreign" ? "Only Canadian phone numbers can apply." : "Enter a valid phone number.";
    case "birthDate":
      return value && value <= yearsAgo(18) && value > yearsAgo(100) ? null : "You must be 18 or older.";
    case "address":
      return blank(value) ? "Enter your address." : null;
    case "city":
      return blank(value) ? "Enter your city." : null;
    case "postalCode":
      return /^[ABCEGHJ-NPRSTVXY]\d[A-Z]-\d[A-Z]\d$/.test(value ?? "") ? null : "Enter a valid postal code.";
    case "consent":
      return value === "yes" ? null : "You must agree to continue.";
    case "terms":
      return value === "yes" ? null : "You must accept to continue.";
    case "employerName":
      return blank(value) ? "Enter your employer." : null;
    case "jobTitle":
      return blank(value) ? "Enter your job title." : null;
    case "payDate1":
      return blank(value) ? "Choose a date." : null;
    case "monthlyIncome":
      return needNumber(value) ? "Enter your monthly income." : null;
    case "rentMortgagePayment":
    case "propertyMortgage":
    case "unsecuredDebtAmount":
      return needNumber(value) ? "Enter an amount (0 if none)." : null;
    case "propertyValue":
      return needNumber(value) ? "Enter the home value." : null;
    default:
      return blank(value) ? "Choose one." : null;
  }
}
