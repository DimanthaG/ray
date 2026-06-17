import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"
import WisePaymentContent from "@/components/wise-payment-content"
import { parsePaymentParams } from "@/lib/wise-payment-details"

export const metadata: Metadata = {
  title: "Pay via Wise",
  description:
    "Payment instructions for sending money to Raytronics Lanka via Wise. Copy bank details or follow our step-by-step guide.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Pay via Wise | " + siteConfig.name,
    description:
      "Payment instructions for sending money to Raytronics Lanka via Wise.",
  },
}

type Props = {
  searchParams: Promise<{
    amount?: string | string[]
    reference?: string | string[]
    currency?: string | string[]
  }>
}

export default async function WisePaymentPage({ searchParams }: Props) {
  const params = await searchParams
  const paymentParams = parsePaymentParams(params)

  return <WisePaymentContent {...paymentParams} />
}
