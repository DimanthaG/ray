import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"
import Image from "next/image"
import { Mail, Phone, MapPin, Globe, Linkedin, MessageCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

type Props = {
  params: Promise<{ qrCode: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { qrCode } = await params
  const { data: agent } = await supabase
    .from("agents")
    .select("*")
    .eq("qr_code", qrCode)
    .eq("is_active", true)
    .eq("is_verified", true)
    .single()

  if (!agent) {
    return {
      title: "Agent Not Found | " + siteConfig.name,
    }
  }

  return {
    title: `${agent.name} - Verified Agent | ${siteConfig.name}`,
    description: agent.bio || `Contact ${agent.name}, a verified agent of ${siteConfig.name}`,
    openGraph: {
      title: `${agent.name} - Verified Agent | ${siteConfig.name}`,
      description: agent.bio || `Contact ${agent.name}, a verified agent of ${siteConfig.name}`,
      images: agent.profile_image_url ? [agent.profile_image_url] : [],
    },
  }
}

export default async function AgentPage({ params }: Props) {
  const { qrCode } = await params

  const { data: agent, error } = await supabase
    .from("agents")
    .select("*")
    .eq("qr_code", qrCode)
    .eq("is_active", true)
    .eq("is_verified", true)
    .single()

  if (error || !agent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header with verification badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-800 dark:text-green-300">
                Verified Agent of Raytronics Group
              </span>
            </div>
          </div>

          {/* Agent Card */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  {agent.profile_image_url ? (
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-background shadow-lg">
                      <Image
                        src={agent.profile_image_url}
                        alt={agent.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background shadow-lg">
                      <span className="text-6xl font-bold text-primary">
                        {agent.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Agent Info */}
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{agent.name}</h1>
                  {agent.title && (
                    <p className="text-xl text-muted-foreground mb-4">{agent.title}</p>
                  )}
                  {agent.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-6">
                      <MapPin className="w-5 h-5" />
                      <span>{agent.location}</span>
                    </div>
                  )}
                  {agent.bio && (
                    <p className="text-lg leading-relaxed text-foreground/90 mb-6">{agent.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-8 md:p-12 bg-muted/30">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.email && (
                  <Link
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg hover:bg-accent transition-colors border"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{agent.email}</p>
                    </div>
                  </Link>
                )}

                {agent.phone && (
                  <Link
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg hover:bg-accent transition-colors border"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{agent.phone}</p>
                    </div>
                  </Link>
                )}

                {agent.whatsapp_number && (
                  <Link
                    href={`https://wa.me/${agent.whatsapp_number.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card rounded-lg hover:bg-accent transition-colors border"
                  >
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <p className="font-medium">{agent.whatsapp_number}</p>
                    </div>
                  </Link>
                )}

                {agent.website && (
                  <Link
                    href={agent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card rounded-lg hover:bg-accent transition-colors border"
                  >
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <p className="font-medium truncate">{agent.website.replace(/^https?:\/\//, "")}</p>
                    </div>
                  </Link>
                )}

                {agent.linkedin_url && (
                  <Link
                    href={agent.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card rounded-lg hover:bg-accent transition-colors border"
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-medium">View Profile</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to {siteConfig.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

