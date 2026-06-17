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

function generatePaymentCardPng(
  amount?: number,
  currency?: string,
  reference?: string
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const width = 800
    const padding = 48
    const lineHeight = 36
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

    const headerHeight = 100
    const contentHeight = fields.length * lineHeight + padding
    const height = headerHeight + contentHeight + padding

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      reject(new Error("Could not create canvas context"))
      return
    }

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, headerHeight)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 28px Inter, system-ui, sans-serif"
    ctx.fillText("Payment Details", padding, 48)
    ctx.font = "16px Inter, system-ui, sans-serif"
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText(wiseRecipient.accountHolder, padding, 78)

    let y = headerHeight + padding
    ctx.font = "14px Inter, system-ui, sans-serif"

    for (const field of fields) {
      ctx.fillStyle = "#64748b"
      ctx.fillText(field.label, padding, y)
      y += 20
      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 18px Inter, system-ui, sans-serif"
      ctx.fillText(field.value, padding, y)
      ctx.font = "14px Inter, system-ui, sans-serif"
      y += lineHeight
    }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-6">
            Pay via Wise
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 mb-8"
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
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Step-by-step guide</h2>
          <div className="space-y-8">
            {wiseGuideSteps.map((step, index) => {
              const Icon = stepIcons[index] ?? Building2
              return (
                <div
                  key={step.step}
                  className="bg-card border border-border/50 rounded-2xl overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-primary" />
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
                  </div>
                </div>
              )
            })}
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
    </div>
  )
}
