"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"
import {
  Building2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Landmark,
  Mail,
  Upload,
  AlertCircle,
  CreditCard,
  Hash,
  Banknote,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  formatWisePaymentText,
  wiseGuideSteps,
  wisePaymentFields,
  wiseRecipient,
} from "@/lib/wise-payment-details"

type WisePaymentContentProps = {
  amount?: number
  reference?: string
  currency?: string
}

function CopyField({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string
  value: string
  onCopy: (value: string, label: string) => void
  copied: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-3 p-4 bg-muted/30 rounded-lg border border-border/50">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="font-medium break-all">{value}</p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0"
        onClick={() => onCopy(value, label)}
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img")
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let current = ""

  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }

  if (current) lines.push(current)
  return lines.length > 0 ? lines : [text]
}

function measureFieldBlock(
  ctx: CanvasRenderingContext2D,
  value: string,
  contentWidth: number
): number {
  const labelHeight = 18
  const valueLineHeight = 24
  const fieldGap = 20

  ctx.font = "bold 18px Inter, system-ui, sans-serif"
  const valueLines = wrapCanvasText(ctx, value, contentWidth)

  return labelHeight + valueLines.length * valueLineHeight + fieldGap
}

async function generatePaymentCardPng(
  amount?: number,
  currency?: string,
  reference?: string
): Promise<Blob> {
  const width = 800
  const padding = 48
  const headerHeight = 120
  const contentWidth = width - padding * 2

  const fields = [
    ...wisePaymentFields.map((f) => ({ label: f.label, value: f.value })),
    ...(amount != null
      ? [
          {
            label: "Amount",
            value: `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency ?? wiseRecipient.currency}`,
          },
        ]
      : []),
    ...(reference ? [{ label: "Reference", value: reference }] : []),
  ]

  const measureCanvas = document.createElement("canvas")
  const measureCtx = measureCanvas.getContext("2d")
  if (!measureCtx) throw new Error("Could not create canvas context")

  const fieldsHeight = fields.reduce(
    (total, field) => total + measureFieldBlock(measureCtx, field.value, contentWidth),
    0
  )
  const height = headerHeight + padding + fieldsHeight + padding

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not create canvas context")

  const logo = await loadImage("/logos/06.svg")

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = "#0f172a"
  ctx.fillRect(0, 0, width, headerHeight)

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 26px Inter, system-ui, sans-serif"
  ctx.fillText("Payment Details", padding, 52)
  ctx.font = "15px Inter, system-ui, sans-serif"
  ctx.fillStyle = "#cbd5e1"
  ctx.fillText(wiseRecipient.accountHolder, padding, 82)

  const logoHeight = 40
  const logoWidth = (logo.width / logo.height) * logoHeight
  const logoX = width - padding - logoWidth
  const logoY = (headerHeight - logoHeight) / 2
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(logoX - 12, logoY - 8, logoWidth + 24, logoHeight + 16)
  ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight)

  let y = headerHeight + padding

  for (const field of fields) {
    ctx.font = "14px Inter, system-ui, sans-serif"
    ctx.fillStyle = "#64748b"
    ctx.fillText(field.label, padding, y)
    y += 18

    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 18px Inter, system-ui, sans-serif"
    const valueLines = wrapCanvasText(ctx, field.value, contentWidth)
    for (const line of valueLines) {
      ctx.fillText(line, padding, y)
      y += 24
    }

    y += 20
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Failed to generate image"))
      },
      "image/png",
      1
    )
  })
}

export default function WisePaymentContent({
  amount,
  reference,
  currency = wiseRecipient.currency,
}: WisePaymentContentProps) {
  const { toast } = useToast()
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [openSteps, setOpenSteps] = useState<number[]>([1])

  const copyToClipboard = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedField(label)
        toast({
          title: "Copied!",
          description: `${label} copied to clipboard.`,
        })
        setTimeout(() => setCopiedField(null), 2000)
      } catch {
        toast({
          title: "Copy failed",
          description: "Please copy the text manually.",
          variant: "destructive",
        })
      }
    },
    [toast]
  )

  const handleCopyAll = () => {
    copyToClipboard(
      formatWisePaymentText({ amount, currency, reference }),
      "All payment details"
    )
  }

  const handleDownloadCard = async () => {
    setIsDownloading(true)
    try {
      const blob = await generatePaymentCardPng(amount, currency, reference)
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "raytronics-wise-payment-details.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast({
        title: "Downloaded",
        description: "Upload this image in Wise when adding a recipient.",
      })
    } catch {
      toast({
        title: "Download failed",
        description: "Use Copy all details instead, or try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const hasSummary = amount != null || reference != null

  const stepIcons = [Building2, Building2, Landmark, Upload, Landmark, Banknote, CreditCard]

  const toggleStep = (step: number) => {
    setOpenSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    )
  }

  const renderGuideStep = (step: (typeof wiseGuideSteps)[number], index: number, compact = false) => {
    const Icon = stepIcons[index] ?? Building2
    const isOpen = openSteps.includes(step.step)

    const content = (
      <>
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand font-bold shrink-0">
            {step.step}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-5 h-5 text-brand" />
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        </div>
        {step.image && (
          <div className="relative rounded-xl overflow-hidden border border-border/50 bg-muted/20">
            <Image
              src={step.image}
              alt={step.imageAlt ?? step.title}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
        )}
      </>
    )

    if (compact) {
      return (
        <div
          key={step.step}
          id={`wise-step-${step.step}`}
          className="bg-card border border-border/50 rounded-2xl overflow-hidden scroll-mt-24"
        >
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 p-4 text-left"
            onClick={() => toggleStep(step.step)}
            aria-expanded={isOpen}
          >
            <span className="font-semibold">
              Step {step.step}: {step.title}
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isOpen && <div className="px-4 pb-4 border-t border-border/50 pt-4">{content}</div>}
        </div>
      )
    }

    return (
      <div
        key={step.step}
        id={`wise-step-${step.step}`}
        className="bg-card border border-border/50 rounded-2xl overflow-hidden scroll-mt-24"
      >
        <div className="p-6 md:p-8">{content}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-16">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pay via <span className="text-brand">Wise</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Send payment to Raytronics Lanka (PVT) LTD using Wise. Copy the bank
            details below or follow our step-by-step guide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-8"
        >
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200">
              <p className="font-semibold mb-1">Wise upload autofill tip</p>
              <p>
                Download the payment details card below and upload it in Wise
                when prompted (Add recipient → Upload screenshot or invoice).
                Wise will read the details automatically — always review before
                confirming.
              </p>
            </div>
          </div>
        </motion.div>

        {hasSummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Payment summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {amount != null && (
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <Banknote className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Amount to send</p>
                    <p className="text-2xl font-bold text-primary">
                      {amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {currency}
                    </p>
                  </div>
                </div>
              )}
              {reference && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <Hash className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Payment reference (required)</p>
                    <p className="text-lg font-bold break-all">{reference}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          id="account-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 mb-8 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">Account details</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Recipient: {wiseRecipient.accountHolder}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={handleCopyAll}>
                <Copy className="w-4 h-4 mr-2" />
                Copy all
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadCard}
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Generating..." : "Download card"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {wisePaymentFields.map((field) => (
              <CopyField
                key={field.key}
                label={field.label}
                value={field.value}
                onCopy={copyToClipboard}
                copied={copiedField === field.label}
              />
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="w-4 h-4" />
              <span>Questions about this payment?</span>
            </div>
            <a
              href={`mailto:${wiseRecipient.email}`}
              className="text-primary hover:underline font-medium"
            >
              {wiseRecipient.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8"
          id="wise-guide"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Step-by-step guide</h2>
          <nav
            aria-label="Guide steps"
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {wiseGuideSteps.map((step) => (
              <a
                key={step.step}
                href={`#wise-step-${step.step}`}
                className="rounded-full border border-border/50 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-brand hover:border-brand/40 transition-colors"
              >
                Step {step.step}
              </a>
            ))}
          </nav>

          <div className="md:hidden space-y-3">
            {wiseGuideSteps.map((step, index) => renderGuideStep(step, index, true))}
          </div>
          <div className="hidden md:block space-y-8">
            {wiseGuideSteps.map((step, index) => renderGuideStep(step, index))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button asChild size="lg">
            <a
              href="https://wise.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Wise
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-background/95 backdrop-blur-md p-3 md:hidden">
        <div className="container mx-auto flex gap-2 max-w-4xl">
          <Button type="button" variant="outline" className="flex-1" onClick={handleCopyAll}>
            <Copy className="w-4 h-4 mr-2" />
            Copy all
          </Button>
          <Button
            type="button"
            variant="brand"
            className="flex-1"
            onClick={handleDownloadCard}
            disabled={isDownloading}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Generating..." : "Download"}
          </Button>
        </div>
      </div>
    </div>
  )
}
