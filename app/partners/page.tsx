import type { Metadata } from "next"
import { PartnersContent } from "@/components/partners/partners-content"

export const metadata: Metadata = {
  title: "Be Our Partner | Sell Products Locally & Internationally | Raytronics Group",
  description:
    "Partner with Raytronics Group to market, distribute, and sell your products to Sri Lankan and international markets. Categories include Electronics, Ceylon Gems & Jewelry, Spices, Batik, Ceylon Tea, Ayurvedic Wellness, and Handcrafted Toys.",
  keywords: [
    "Partner with Raytronics",
    "Sell Sri Lankan products globally",
    "Ceylon spices export",
    "Ceylon gems distribution",
    "Batik textiles supplier",
    "Ceylon tea export",
    "Ayurvedic products export",
    "Handmade wooden toys",
    "Canada export partner",
  ],
}

export default function PartnersPage() {
  return <PartnersContent />
}
