"use client"

import { motion } from "framer-motion"
import { CreditCard, ShieldCheck, Globe2, Wallet, Landmark, Zap, Lock, Shield, Bitcoin, Smartphone } from "lucide-react"

const paymentGateways = [
  {
    name: "Visa",
    tag: "Credit / Debit",
    icon: CreditCard,
    color: "bg-[#1a1f71] text-amber-400 shadow-indigo-900/30",
    badge: "Instant Gateway",
  },
  {
    name: "Mastercard",
    tag: "Credit / Debit",
    icon: CreditCard,
    color: "bg-gradient-to-r from-[#eb001b] to-[#f79e1b] text-white shadow-amber-500/20",
    badge: "Global Cards",
  },
  {
    name: "Stripe",
    tag: "256-Bit Encrypted",
    icon: ShieldCheck,
    color: "bg-[#635bff] text-white shadow-indigo-500/20",
    badge: "Secure Processing",
  },
  {
    name: "UnionPay",
    tag: "International",
    icon: CreditCard,
    color: "bg-gradient-to-r from-[#007b83] to-[#e21836] text-white shadow-teal-500/20",
    badge: "Global Commerce",
  },
  {
    name: "Google Pay",
    tag: "Digital Wallet",
    icon: Wallet,
    color: "bg-white text-[#4285f4] border border-border shadow-blue-500/10",
    badge: "One-Tap Checkout",
  },
  {
    name: "Crypto",
    tag: "BTC / ETH / USDT",
    icon: Bitcoin,
    color: "bg-gradient-to-r from-[#f7931a] to-[#4b3621] text-white shadow-orange-500/20",
    badge: "Blockchain Secured",
  },
  {
    name: "FriMi",
    tag: "Digital Wallet",
    icon: Smartphone,
    color: "bg-white text-[#f7523f] border border-border shadow-red-500/10",
    badge: "Local eWallet",
  },
  {
    name: "EZ Cash",
    tag: "Mobile Money",
    icon: Smartphone,
    color: "bg-[#fcd116] text-[#e2231a] shadow-yellow-500/20",
    badge: "Local eWallet",
  },
  {
    name: "mCash",
    tag: "Mobile Money",
    icon: Smartphone,
    color: "bg-[#005baa] text-white shadow-blue-900/20",
    badge: "Local eWallet",
  },
]

export function StatsSection() {
  return (
    <section className="mb-20 md:mb-28" aria-labelledby="payment-heading">
      {/* Payment Options Header */}
      <div className="text-center mb-8 max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-extrabold text-brand">
          <Lock className="w-3.5 h-3.5" />
          <span>ACCEPTED PAYMENT & SETTLEMENT GATEWAYS</span>
        </div>
        <h2 id="payment-heading" className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
          Global Payment Methods
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Seamless international payments, wire transfers, and digital wallets supported for global clients.
        </p>
      </div>

      {/* High-Contrast Large Auto-Scrolling Marquee */}
      <div className="relative overflow-hidden w-full max-w-6xl mx-auto py-6 px-4 rounded-3xl border border-border/70 bg-card/90 backdrop-blur-2xl shadow-xl">
        <div className="relative flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="animate-marquee gap-4 sm:gap-6 whitespace-nowrap shrink-0 py-2">
            {[...paymentGateways, ...paymentGateways, ...paymentGateways, ...paymentGateways].map((item, idx) => {
              const PaymentIcon = item.icon
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-card border border-border/80 shadow-md hover:border-brand/60 hover:scale-[1.03] transition-all duration-300 min-w-[200px] sm:min-w-[220px]"
                >
                  <div className={`p-3 rounded-xl ${item.color} shrink-0`}>
                    <PaymentIcon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-base font-extrabold text-foreground tracking-tight">{item.name}</div>
                    <div className="text-xs font-bold text-brand">{item.tag}</div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{item.badge}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

