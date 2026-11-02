import { isOwner, isWorking, type PhoneState, type Values } from "@/lib/formRules";
import type { Lang } from "@/lib/i18n";
import { tracking } from "@/lib/tracking";

/**
 * The two messages the LMS expects (ApplyDtos.StepOne and StepTwo). The form's
 * server adds the website's address and the browser's name.
 */
export function stepOneRequest({
  stepToken,
  amount,
  values,
  phone,
  lang,
}: {
  stepToken: string | null;
  amount: number;
  values: Values;
  phone: PhoneState;
  lang: Lang;
}) {
  const n = phone.national;
  const extra: Record<string, string> = {};
  for (const [key, value] of Object.entries(tracking())) extra[`aff_utm_${key}`] = value;
  return {
    stepToken,
    language: lang,
    extra,
    requestedAmount: amount,
    firstName: values.firstName?.trim(),
    lastName: values.lastName?.trim(),
    email: values.email?.trim(),
    // LeadScout's format, whatever the field shows on screen.
    phone: `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`,
    birthDate: values.birthDate,
    address: values.address?.trim(),
    city: values.city?.trim(),
    province: values.province,
    postalCode: values.postalCode,
    consent: values.consent === "yes",
    terms: values.terms === "yes",
    optIn: values.optIn === "yes",
    optInPhone: values.optIn === "yes",
  };
}

const whole = (text: string | undefined) => Number(text);

export function stepTwoRequest(values: Values) {
  return {
    purpose: values.purpose,
    creditScore: values.creditScore,
    incomeType: values.incomeType,
    directDeposit: values.directDeposit,
    monthlyIncome: whole(values.monthlyIncome),
    timeAtAddress: whole(values.timeAtAddress),
    ownHome: values.ownHome,
    rentMortgagePayment: whole(values.rentMortgagePayment),
    ...(isOwner(values)
      ? { propertyValue: whole(values.propertyValue), propertyMortgage: whole(values.propertyMortgage) }
      : {}),
    financialSituation: values.financialSituation,
    unsecuredDebtAmount: whole(values.unsecuredDebtAmount),
    ...(isWorking(values)
      ? {
          jobTitle: values.jobTitle?.trim(),
          employerName: values.employerName?.trim(),
          employedMonths: whole(values.employedMonths),
          payFrequency: values.payFrequency,
          payDate1: values.payDate1,
        }
      : {}),
  };
}
