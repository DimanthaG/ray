export type WisePaymentField = {
  key: string
  label: string
  value: string
}

export const wiseRecipient = {
  accountHolder: "Raytronics Lanka (PVT) LTD",
  recipientType: "Business or Charity",
  email: "lasa_ray@yahoo.com",
  bankName: "Nations Trust Bank PLC",
  branch: "Nugegoda [053]",
  branchCode: "053",
  bankCode: "7162",
  accountNumber: "100530013805",
  currency: "LKR",
  currencyName: "Sri Lankan rupee",
  country: "Sri Lanka",
} as const

export const wisePaymentFields: WisePaymentField[] = [
  { key: "accountHolder", label: "Account holder name", value: wiseRecipient.accountHolder },
  { key: "recipientType", label: "Recipient type", value: wiseRecipient.recipientType },
  { key: "email", label: "Email (optional)", value: wiseRecipient.email },
  { key: "bankName", label: "Bank name", value: wiseRecipient.bankName },
  { key: "branch", label: "Branch name", value: wiseRecipient.branch },
  { key: "branchCode", label: "Branch code", value: wiseRecipient.branchCode },
  { key: "bankCode", label: "Bank code", value: wiseRecipient.bankCode },
  { key: "accountNumber", label: "Account number", value: wiseRecipient.accountNumber },
  { key: "currency", label: "Currency", value: `${wiseRecipient.currency} (${wiseRecipient.currencyName})` },
  { key: "country", label: "Country", value: wiseRecipient.country },
]

export type WiseGuideStep = {
  step: number
  title: string
  description: string
  image?: string
  imageAlt?: string
}

export const wiseGuideSteps: WiseGuideStep[] = [
  {
    step: 1,
    title: "Go to Wise and start a transfer",
    description: "Open Wise and select Send. Choose Add to add a new recipient.",
    image: "/payment/wise/guide/step-1-send.png",
    imageAlt: "Wise send screen with Add and Upload options",
  },
  {
    step: 2,
    title: "Choose Business or Charity",
    description: "Select Business or Charity as the recipient type for Raytronics Lanka.",
    image: "/payment/wise/guide/step-2-recipient-type.png",
    imageAlt: "Wise recipient type selection",
  },
  {
    step: 3,
    title: "Select LKR as their currency",
    description: "Choose Sri Lankan rupee (LKR) as the currency your recipient will receive.",
    image: "/payment/wise/guide/step-3-currency.png",
    imageAlt: "Wise currency selection with LKR highlighted",
  },
  {
    step: 4,
    title: "Add bank details or upload",
    description:
      "Choose Bank details to enter information manually, or Upload and use the downloadable payment card from this page for Wise autofill.",
    image: "/payment/wise/guide/step-4-add-recipient.png",
    imageAlt: "Wise add recipient options including bank details and upload",
  },
  {
    step: 5,
    title: "Enter account details",
    description:
      "Copy each field from this page into Wise. Use the copy buttons below for quick entry.",
    image: "/payment/wise/guide/step-5-bank-details.png",
    imageAlt: "Wise bank details form with recipient information",
  },
  {
    step: 6,
    title: "Enter amount and reference",
    description:
      "Enter the payment amount in LKR and include your invoice reference in the reference field so we can match your payment.",
    image: "/payment/wise/guide/step-6-amount.png",
    imageAlt: "Wise transfer amount and reference screen",
  },
  {
    step: 7,
    title: "Choose payment method and complete",
    description: "Select your preferred payment method, review the details, and confirm the transfer.",
    image: "/payment/wise/guide/step-7-payment-method.png",
    imageAlt: "Wise payment method selection",
  },
]

export function formatWisePaymentText(options?: {
  amount?: number
  currency?: string
  reference?: string
}): string {
  const lines = [
    "Wise Payment Details — Raytronics Lanka (PVT) LTD",
    "",
    ...wisePaymentFields.map((field) => `${field.label}: ${field.value}`),
  ]

  if (options?.amount != null && !Number.isNaN(options.amount)) {
    lines.push("", `Amount: ${options.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${options.currency ?? wiseRecipient.currency}`)
  }

  if (options?.reference) {
    lines.push(`Reference: ${options.reference}`)
  }

  return lines.join("\n")
}

export function parsePaymentParams(searchParams: {
  amount?: string | string[]
  reference?: string | string[]
  currency?: string | string[]
}) {
  const rawAmount = Array.isArray(searchParams.amount)
    ? searchParams.amount[0]
    : searchParams.amount
  const rawReference = Array.isArray(searchParams.reference)
    ? searchParams.reference[0]
    : searchParams.reference
  const rawCurrency = Array.isArray(searchParams.currency)
    ? searchParams.currency[0]
    : searchParams.currency

  const parsedAmount = rawAmount ? Number.parseFloat(rawAmount) : undefined
  const amount =
    parsedAmount != null && !Number.isNaN(parsedAmount) && parsedAmount > 0
      ? parsedAmount
      : undefined

  const reference = rawReference?.trim() || undefined
  const currency = rawCurrency?.trim().toUpperCase() || wiseRecipient.currency

  return { amount, reference, currency }
}
