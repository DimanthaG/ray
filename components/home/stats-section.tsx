"use client"

import { Lock, Smartphone } from "lucide-react"

// Brands available as real logos via the Iconify "logos" set
// (SVG Logos by Gil Barbara, CC0, already full-color — no color param needed)
// Browse/verify slugs at https://icon-sets.iconify.design/logos/
const paymentGateways = [
  {
    name: "Visa",
    tag: "Credit / Debit",
    logo: "https://api.iconify.design/logos/visa.svg",
    bg: "bg-white border border-border",
    badge: "Instant Gateway",
  },
  {
    name: "Mastercard",
    tag: "Credit / Debit",
    logo: "https://api.iconify.design/logos/mastercard.svg",
    bg: "bg-white border border-border",
    badge: "Global Cards",
  },
  {
    name: "Stripe",
    tag: "256-Bit Encrypted",
    logo: "https://api.iconify.design/logos/stripe.svg",
    bg: "bg-white border border-border",
    badge: "Secure Processing",
  },
  {
    name: "UnionPay",
    tag: "International",
    // Inline wordmark (not a fetched image) so it can never fail to load.
    // Approximates UnionPay's red / blue / green brand marque.
    inlineSvg: (
      <svg viewBox="0 0 48 32" className="w-8 h-6" aria-hidden="true">
        <rect x="0" y="0" width="16" height="32" rx="3" fill="#E21836" />
        <rect x="16" y="0" width="16" height="32" fill="#00447C" />
        <rect x="32" y="0" width="16" height="32" rx="3" fill="#007B48" />
        <text
          x="24"
          y="21"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="white"
          fontFamily="Arial, sans-serif"
        >
          UP
        </text>
      </svg>
    ),
    bg: "bg-white border border-border",
    badge: "Global Commerce",
  },
  {
    name: "Google Pay",
    tag: "Digital Wallet",
    logo: "https://api.iconify.design/logos/google-pay.svg",
    bg: "bg-white border border-border",
    badge: "One-Tap Checkout",
  },
  {
    name: "Crypto",
    tag: "BTC / ETH / USDT",
    logo: "https://api.iconify.design/logos/bitcoin.svg",
    bg: "bg-white border border-border",
    badge: "Blockchain Secured",
  },
  // Local Sri Lankan wallets: no logo available in Simple Icons.
  // Swap the `icon` field for an <img src="/logos/frimi.svg" /> etc.
  // once you have the official brand assets.
  {
    name: "FriMi",
    tag: "Digital Wallet",
    icon: Smartphone,
    bg: "bg-white text-[#f7523f] border border-border",
    badge: "Local eWallet",
  },
  {
    name: "EZ Cash",
    tag: "Mobile Money",
    icon: Smartphone,
    bg: "bg-[#fcd116] text-[#e2231a]",
    badge: "Local eWallet",
  },
  {
    name: "mCash",
    tag: "Mobile Money",
    icon: Smartphone,
    bg: "bg-[#005baa] text-white",
    badge: "Local eWallet",
  },
]

function GatewayMark({ item }: { item: (typeof paymentGateways)[number] }) {
  return (
    <div className={`p-3 rounded-xl ${item.bg} shrink-0 flex items-center justify-center w-12 h-12`}>
      {item.inlineSvg ? (
        item.inlineSvg
      ) : item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          className="w-6 h-6 object-contain"
          loading="lazy"
          onError={(e) => {
            // If the external logo fails to load, fall back to initials
            // instead of a broken image icon.
            e.currentTarget.style.display = "none"
          }}
        />
      ) : item.icon ? (
        <item.icon className="w-6 h-6" />
      ) : null}
    </div>
  )
}

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
            {[...paymentGateways, ...paymentGateways, ...paymentGateways, ...paymentGateways].map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-card border border-border/80 shadow-md hover:border-brand/60 hover:scale-[1.03] transition-all duration-300 min-w-[200px] sm:min-w-[220px]"
              >
                <GatewayMark item={item} />
                <div className="text-left">
                  <div className="text-base font-extrabold text-foreground tracking-tight">{item.name}</div>
                  <div className="text-xs font-bold text-brand">{item.tag}</div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{item.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}