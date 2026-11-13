import type { Lang } from "@/lib/i18n";
import { PRIVACY_FR, TERMS_FR } from "@/lib/legalFr";

/**
 * The Terms and Conditions and the Privacy Policy, shown in the legal sheet,
 * in English (here) and French (legalFr.ts).
 * One text for every brand: {brand} and {site} are filled in for the brand the
 * form is opened on. Everything else that is the same for all brands is in
 * LEGAL_DETAILS below.
 *
 * Text in [square brackets] is not known yet and shows as it is until it is filled in.
 */

/** The company's own details, the same on every brand. */
export const LEGAL_DETAILS = {
  updated: "November 12, 2026",
  company: "Norden Capital",
  /** Each brand has its own inbox, on the domain the form is opened on (.ca, .online…). */
  supportEmail: "support@{site}",
  privacyEmail: "privacy@{site}",
  address: "702 Russell Ave, Enderby, BC V0E 1V0, Canada",
  province: "British Columbia",
  /** Where the data is stored or handled (privacy, section 9). */
  // Since the 2026-11-13 move: the website runs in Montreal (Vercel), the LMS
  // server and database in the US East (Contabo, New York area).
  locations: "Canada (Quebec) and the United States",
};

/** The details that read differently in French. The rest stays as in LEGAL_DETAILS. */
const LEGAL_DETAILS_FR: Partial<typeof LEGAL_DETAILS> = {
  updated: "12 novembre 2026",
  province: "la Colombie-Britannique",
  locations: "au Canada (Québec) et aux États-Unis",
};

/** The company's details in the form's language. */
export function legalDetails(lang: Lang) {
  return lang === "fr" ? { ...LEGAL_DETAILS, ...LEGAL_DETAILS_FR } : LEGAL_DETAILS;
}

/** A paragraph, a small heading, a bullet list, or lines kept together (an address). */
export type Block = { p: string } | { h: string } | { list: string[] } | { lines: string[] };
export type Section = { title: string; blocks: Block[] };

const TERMS: Section[] = [
  {
    title: "1. About These Terms",
    blocks: [
      { p: "These Terms and Conditions govern your use of {site} and the referral services provided through it." },
      {
        p: 'The website operates under the brand {brand} and is owned and operated by {company}, doing business as Norden Capital ("we," "us," or "our").',
      },
      {
        p: "Please read these terms before submitting a request. Where we ask you to accept these terms, you may decline by not proceeding with the submission.",
      },
    ],
  },
  {
    title: "2. Our Role",
    blocks: [
      {
        p: "Norden Capital provides loan referral and lead-generation services that help connect consumers with participating lenders and referral partners.",
      },
      {
        p: "We are not a lender. We do not issue loans, make credit decisions, set loan terms, collect repayments, or guarantee approval.",
      },
      {
        p: "Submitting a request through our website is a request to be connected with participating providers. It is not a loan agreement, an offer of credit, or a commitment to lend.",
      },
      { p: "Any loan you obtain is governed by a separate agreement between you and the lender." },
    ],
  },
  {
    title: "3. Eligibility",
    blocks: [
      { p: "To submit a request, you must:" },
      {
        list: [
          "Be a resident of Canada.",
          "Have reached the age of majority in your province or territory.",
          "Submit the request on your own behalf.",
          "Provide accurate and current information.",
          "Have the legal capacity to accept these terms.",
        ],
      },
      {
        p: "Additional eligibility requirements may apply depending on the provider, product, and province or territory. Our services and participating providers may not be available in every location.",
      },
    ],
  },
  {
    title: "4. Information You Provide",
    blocks: [
      { p: "You agree to provide information that is accurate, complete, and truthful to the best of your knowledge." },
      {
        p: "You must not submit another person's information without lawful authority, impersonate anyone, or submit fraudulent requests.",
      },
      {
        p: "If you discover a material error after submitting your request, contact us promptly. If your information has already been forwarded to a provider, you may also need to contact that provider directly.",
      },
      {
        p: "We may decline to process requests that appear fraudulent, incomplete, or inconsistent with these terms, subject to applicable law.",
      },
    ],
  },
  {
    title: "5. How the Referral Service Works",
    blocks: [
      {
        p: "When you submit a request and provide the required consent, we may forward your information to participating lenders or referral partners to identify potential lending options.",
      },
      {
        p: "Referral partners may work with their own networks of lenders, as explained in the disclosures presented when you submit your request.",
      },
      {
        p: "A provider may contact you, request additional information, or invite you to complete an application on its own website.",
      },
      { p: "Submitting a request does not oblige you to accept an offer or enter into a loan agreement." },
      {
        p: "Our network does not necessarily include every lender or financial product available in Canada. A referral does not represent a complete market comparison or a promise that a provider offers the lowest rate or most suitable product.",
      },
    ],
  },
  {
    title: "6. Approval, Rates, and Funding",
    blocks: [
      { p: "Lenders independently determine:" },
      {
        list: [
          "Whether to approve an application.",
          "The amount available.",
          "Interest rates and applicable fees.",
          "Repayment schedules and other conditions.",
          "Verification requirements and funding methods.",
        ],
      },
      {
        p: "Any amounts, rates, processing times, or funding examples displayed on our website are subject to the qualifications shown with them.",
      },
      {
        p: "Approval and funding are not guaranteed. Timing may depend on the lender, verification procedures, banking hours, your financial institution, and other factors.",
      },
      {
        p: "Before accepting an offer, review the lender's disclosures, including the annual percentage rate where applicable, total borrowing cost, payment schedule, and consequences of missed payments.",
      },
    ],
  },
  {
    title: "7. Fees and Compensation",
    blocks: [
      {
        p: "We may receive compensation from participating lenders or referral partners for referrals, submitted requests, or other qualifying outcomes.",
      },
      {
        p: "Any interest, fees, or repayment obligations associated with a loan must be disclosed by the lender in its own agreement. These terms do not authorize us to debit your bank account or collect loan payments.",
      },
    ],
  },
  {
    title: "8. Verification and Credit Checks",
    blocks: [
      {
        p: "A provider may require identity, income, employment, banking, or credit verification before deciding whether to offer you a loan.",
      },
      {
        p: "Any credit inquiry or access to sensitive financial information must be supported by the disclosures and authorization required by applicable law.",
      },
      {
        p: "Acceptance of these terms alone does not give us unrestricted permission to obtain a credit report or access your bank account.",
      },
    ],
  },
  {
    title: "9. Privacy and Communications",
    blocks: [
      {
        p: "Our collection, use, and disclosure of personal information are explained in our {privacyLink} and the notices presented when you submit your request.",
      },
      {
        p: "We and the providers receiving your request may communicate with you about it, consistent with your consent and applicable law.",
      },
      {
        p: "Optional promotional email and SMS communications are governed by the separate consent choices presented to you. Accepting these terms does not automatically enroll you in unrelated marketing.",
      },
      {
        p: "You may unsubscribe from our promotional communications using the instructions in the messages or by contacting us. Independent providers manage their own communication preferences and unsubscribe requests.",
      },
    ],
  },
  {
    title: "10. Electronic Records",
    blocks: [
      {
        p: "Where you accept these terms electronically, we may keep a record of your acceptance, the version presented, and the related submission.",
      },
      { p: "Electronic acceptance of these website terms does not constitute acceptance of a lender's loan agreement." },
      { p: "You may save or print a copy of these terms for your records." },
    ],
  },
  {
    title: "11. Acceptable Use",
    blocks: [
      { p: "You must not:" },
      {
        list: [
          "Use the website for fraud, impersonation, or other unlawful activity.",
          "Submit fabricated applications or information you are not authorized to provide.",
          "Attempt to access information or systems without permission.",
          "Introduce malware, interfere with website security, or disrupt its operation.",
          "Collect other users' personal information.",
          "Use automated tools in a way that compromises security, overloads the website, or infringes others' rights.",
        ],
      },
      {
        p: "We may restrict access where reasonably necessary to address misuse, protect users, maintain security, or comply with the law.",
      },
    ],
  },
  {
    title: "12. Website Content and Intellectual Property",
    blocks: [
      { p: "Website content, branding, graphics, and software are owned by us or used with permission." },
      {
        p: "You may access the website and save relevant information for your personal, lawful use. Other reproduction, distribution, or commercial use requires permission unless permitted by law.",
      },
      { p: "Nothing in these terms restricts lawful consumer reviews, complaints, or other protected expression." },
    ],
  },
  {
    title: "13. Third-Party Providers and Websites",
    blocks: [
      { p: "Our website may contain links to independent providers and third-party websites." },
      {
        p: "Those providers are responsible for their own services, decisions, agreements, and privacy practices. Review their terms before providing further information or accepting an offer.",
      },
      { p: "We remain responsible for our own conduct and obligations under applicable law." },
    ],
  },
  {
    title: "14. Website Availability and Information",
    blocks: [
      {
        p: "We take reasonable steps to keep the website functional and its information accurate. However, interruptions, technical errors, outdated information, and service changes may occur.",
      },
      { p: "We may temporarily suspend parts of the website for maintenance, security, or operational reasons." },
      {
        p: "Website content provides general information about our referral service. It does not constitute personalized financial, legal, or tax advice.",
      },
      { p: "Nothing in this section excludes a guarantee, duty, or remedy that cannot lawfully be excluded." },
    ],
  },
  {
    title: "15. Responsibility and Consumer Rights",
    blocks: [
      { p: "Each party's responsibility is determined by applicable law." },
      {
        p: "We do not promise that a referral will produce an offer, approval, particular rate, or funding within a specific time.",
      },
      {
        p: "Nothing in these terms excludes liability that cannot lawfully be excluded or limits mandatory consumer protections. This includes any rights relating to misleading representations, privacy, or other obligations that apply to our services.",
      },
    ],
  },
  {
    title: "16. Questions and Complaints",
    blocks: [
      {
        p: "Contact us if you have a concern about our website or referral service. Provide enough information for us to investigate, but do not send passwords or online banking credentials.",
      },
      {
        p: "Concerns about a lender's approval decision, loan terms, funding, or repayments should also be directed to that lender.",
      },
      {
        p: "Contacting us does not prevent you from contacting a regulator, obtaining legal advice, or pursuing any remedy available under applicable law.",
      },
    ],
  },
  {
    title: "17. Governing Law",
    blocks: [
      {
        p: "These terms are governed by the laws of {province} and the federal laws of Canada applicable there, subject to any mandatory laws that apply where you reside.",
      },
      {
        p: "Nothing in these terms removes protections available under applicable provincial or territorial consumer laws or requires you to bring proceedings in a location contrary to those laws.",
      },
      {
        p: "These terms do not require mandatory arbitration or waive any right to participate in a class proceeding where that right is protected by law.",
      },
    ],
  },
  {
    title: "18. Changes to These Terms",
    blocks: [
      { p: "We may revise these terms to reflect changes in our services or legal obligations." },
      {
        p: "The updated version will be posted with a revised date. Where required, we will provide notice and obtain acceptance before changes apply.",
      },
      { p: "Changes will not retroactively remove rights relating to an earlier submission." },
    ],
  },
  {
    title: "19. Severability",
    blocks: [
      {
        p: "If a provision is found invalid or unenforceable, it will apply only to the extent permitted by law. The remaining provisions will continue to apply where legally possible.",
      },
    ],
  },
  {
    title: "20. Contact Information",
    blocks: [
      {
        lines: [
          "Norden Capital",
          "Operated by: {company}",
          "Website brand: {brand}",
          "Website: {site}",
          "Email: {supportEmail}",
          "Mailing address: {address}",
        ],
      },
    ],
  },
];

const PRIVACY: Section[] = [
  {
    title: "1. Who We Are",
    blocks: [
      { p: '{brand} is operated by {company}, doing business as Norden Capital ("we," "us," or "our").' },
      {
        p: "We respect your privacy. This policy explains how we collect, use, share, and protect your personal information when you visit {site}, submit a request, or communicate with us.",
      },
      {
        p: "Norden Capital provides loan referral and lead-generation services. We are not a lender, do not issue loans, and do not make lending decisions. Participating lenders determine eligibility, approval, rates, repayment terms, and funding availability.",
      },
      {
        p: "This policy covers our handling of your information. Lenders and other independent partners have their own privacy policies.",
      },
    ],
  },
  {
    title: "2. Information We Collect",
    blocks: [
      { p: "Depending on how you use our website, we may collect:" },
      {
        list: [
          "Contact and identification information: your name, email address, telephone number, date of birth, and residential address.",
          "Information about your request: the amount you wish to borrow and information you provide about your employment, income, and financial circumstances.",
          "Communication records: messages, support requests, preferences, and records of your consent or withdrawal of consent.",
          "Technical information: your IP address, browser type, device information, pages visited, referral source, and interactions with our website.",
        ],
      },
      {
        p: "The information requested depends on the form or service you use. We identify required fields when collecting your information.",
      },
      {
        p: "If you follow a link to a lender's website, information you provide directly to that lender is governed by its privacy policy.",
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    blocks: [
      { p: "We use personal information for the purposes explained when we collect it, including to:" },
      {
        list: [
          "Receive and process your request for a referral.",
          "Match and forward your request to participating lenders or referral partners.",
          "Contact you about your request and respond to your questions.",
          "Operate, maintain, and troubleshoot our website.",
          "Detect fraud, misuse, and security incidents.",
          "Maintain records of consent and communication preferences.",
          "Meet applicable legal obligations and resolve disputes.",
          "Send promotional communications when we have the consent or other legal authorization required to do so.",
        ],
      },
      { p: "We do not guarantee that submitting a request will result in a match, approval, or funding." },
    ],
  },
  {
    title: "4. How We Share Your Information",
    blocks: [
      { h: "Lending and Referral Partners" },
      {
        p: "When you ask us to connect you with lending options and provide the required consent, we share the information needed to process your request with participating lenders and/or referral partners.",
      },
      {
        p: "A referral partner may forward your request to lenders within its network, as explained in the disclosures provided when you submit your request.",
      },
      {
        p: "These recipients may use your information to assess your request and contact you about available services, subject to your consent and applicable law. Any subsequent application, verification, credit assessment, or loan agreement is handled under the relevant provider's terms and privacy policy.",
      },
      { h: "Service Providers" },
      {
        p: "We may use service providers for website hosting, data storage, customer support, analytics, security, and email or SMS delivery.",
      },
      {
        p: "These providers may access personal information as necessary to perform services for us. We require appropriate privacy and security protections for information handled on our behalf.",
      },
      { h: "Legal and Business Purposes" },
      {
        p: "We may disclose information when required or permitted by law, including in response to a valid legal request or to protect against fraud and unlawful activity.",
      },
      {
        p: "If our business undergoes a merger, acquisition, or sale, personal information may be disclosed or transferred as permitted by law and subject to applicable confidentiality requirements.",
      },
      { p: "We do not authorize unrelated uses of your information merely because you visit our website." },
    ],
  },
  {
    title: "5. Consent and Your Choices",
    blocks: [
      {
        p: "We explain the purposes for collecting, using, and sharing your information when requesting your consent. Where required, we obtain express consent, including for sensitive information or optional marketing activities.",
      },
      {
        p: "Acknowledging this privacy policy does not, by itself, constitute consent to every possible use of your information.",
      },
      {
        p: "You may decline optional uses or withdraw consent by contacting us. Withdrawing consent does not invalidate processing that occurred lawfully before your withdrawal.",
      },
      {
        p: "If you decline or withdraw consent necessary to process a referral, we may be unable to complete your request. We will explain any relevant consequences.",
      },
    ],
  },
  {
    title: "6. Email, SMS, and Telephone Communications",
    blocks: [
      { h: "Communications About Your Request" },
      {
        p: "We or the partners receiving your request may contact you to respond to your inquiry, explain next steps, or discuss relevant lending options, consistent with the consent you provided and applicable law.",
      },
      { h: "Promotional Communications" },
      {
        p: "Where authorized, we may send promotional emails or SMS messages about our services or participating partners' offers.",
      },
      {
        p: "You may unsubscribe from our promotional emails using the unsubscribe link in the message. For promotional SMS messages, follow the opt-out instructions provided, such as replying STOP where supported. You may also contact us using the details below.",
      },
      { p: "Declining optional marketing communications does not prevent you from submitting a referral request." },
      {
        p: "If you receive communications directly from an independent partner, use that partner's unsubscribe instructions or contact it directly to manage its communications.",
      },
    ],
  },
  {
    title: "7. Cookies and Similar Technologies",
    blocks: [
      {
        p: "Our website may use cookies and similar technologies to support website functionality, remember preferences, measure traffic, and understand how visitors use our services.",
      },
      {
        p: "Where enabled and permitted, advertising technologies may also help measure campaign performance or personalize advertising.",
      },
      {
        p: "Where required, we request consent before activating optional technologies. You can manage available preferences through your browser settings.",
      },
      { p: "Disabling some cookies may affect website functionality." },
    ],
  },
  {
    title: "8. Information Security",
    blocks: [
      {
        p: "We use administrative, technical, and physical safeguards appropriate to the sensitivity of the information we handle. Access is limited to people and service providers who need the information for authorized purposes.",
      },
      {
        p: "No method of internet transmission or electronic storage is completely secure. We cannot guarantee absolute security.",
      },
    ],
  },
  {
    title: "9. Storage and Processing Locations",
    blocks: [
      {
        p: "Your personal information may be stored or processed in {locations}, including locations where we or our service providers operate.",
      },
      {
        p: "Where information is handled outside your province or Canada, it may be subject to the laws of that jurisdiction, including lawful access by local authorities.",
      },
      {
        p: "Where applicable, we assess transfers and apply the contractual and other safeguards required by law, including requirements relating to information transferred outside Quebec.",
      },
    ],
  },
  {
    title: "10. How Long We Keep Information",
    blocks: [
      {
        p: "We retain personal information only for as long as necessary to fulfill the purposes for which it was collected and meet applicable legal, recordkeeping, security, and dispute-resolution requirements.",
      },
      {
        p: "Retention periods depend on the type of information and the reason it is held. When information is no longer required, we securely destroy it or anonymize it in accordance with applicable law.",
      },
      {
        p: "We may retain limited suppression records to respect unsubscribe requests and prevent further unwanted marketing.",
      },
    ],
  },
  {
    title: "11. Your Privacy Rights",
    blocks: [
      { p: "Subject to applicable law and any permitted exceptions, you may request to:" },
      {
        list: [
          "Access personal information we hold about you.",
          "Correct inaccurate or incomplete information.",
          "Withdraw consent to certain uses or disclosures.",
          "Request deletion of information we no longer have a lawful reason to retain.",
          "Receive information about our handling and sharing of your data.",
          "Obtain an electronic copy of eligible information in a structured, commonly used format where required by law.",
          "Submit a privacy complaint.",
        ],
      },
      {
        p: "We may need to verify your identity before fulfilling a request. We will request only the information reasonably necessary for verification.",
      },
      { p: "If we cannot fulfill a request, we will explain the reason, subject to legal restrictions." },
    ],
  },
  {
    title: "12. Third-Party Websites",
    blocks: [
      {
        p: "Our website may link to lenders, referral partners, or other third-party websites. Their collection and use of personal information are governed by their own privacy policies.",
      },
      { p: "Review the relevant provider's policy before submitting additional information or accepting its services." },
    ],
  },
  {
    title: "13. Age Requirements",
    blocks: [
      {
        p: "Our referral services are intended for Canadian residents who have reached the age of majority in their province or territory.",
      },
      {
        p: "If you believe a minor has provided personal information through our website, contact us so we can review and address the situation.",
      },
    ],
  },
  {
    title: "14. Changes to This Policy",
    blocks: [
      {
        p: "We may update this policy to reflect changes in our services, practices, or legal obligations. The updated version will appear on this page with a revised date.",
      },
      { p: "For material changes, we will provide additional notice and obtain new consent where required by law." },
    ],
  },
  {
    title: "15. Contact Our Privacy Officer",
    blocks: [
      { p: "For privacy questions, requests, or complaints, contact:" },
      {
        lines: [
          "Privacy Officer — Norden Capital",
          "Legal entity: {company}",
          "Email: {privacyEmail}",
          "Mailing address: {address}",
          "Website: {site}",
        ],
      },
      { p: "If your concern remains unresolved, you may contact the privacy regulator responsible for your jurisdiction." },
    ],
  },
];

export const LEGAL_TEXT: Record<Lang, { terms: Section[]; privacy: Section[] }> = {
  en: { terms: TERMS, privacy: PRIVACY },
  fr: { terms: TERMS_FR, privacy: PRIVACY_FR },
};

/** Fills {brand}, {site} and the company details into one line of text. {privacyLink} is left for the sheet. */
export function fillLegal(text: string, brand: string, site: string, lang: Lang = "en"): string {
  const values: Record<string, string> = { ...legalDetails(lang), brand, site };
  const fill = (line: string) => line.replace(/\{(\w+)\}/g, (whole, key: string) => values[key] ?? whole);
  // Twice, because some details hold {site} themselves (the emails).
  return fill(fill(text));
}
