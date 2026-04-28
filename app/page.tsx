import type { Metadata } from "next"
import { HomePage } from "@/components/home/home-page"
import { siteConfig, siteKeywords } from "./metadata"

const homeTitle = "Digital marketing & social media"
const homeDescription = siteConfig.description

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [...siteKeywords],
  openGraph: {
    title: `${homeTitle} | ${siteConfig.name}`,
    description: homeDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${homeTitle} | ${siteConfig.name}`,
    description: homeDescription,
    images: [siteConfig.ogImage],
    creator: "@raytronics",
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

function jsonLdGraph() {
  const logoUrl = new URL(siteConfig.logoPath, siteConfig.url).toString()
  const sameAs = [
    siteConfig.links.facebook,
    siteConfig.links.instagram,
    siteConfig.links.twitter,
  ].filter(Boolean)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        description: homeDescription,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: homeDescription,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph()) }}
      />
      <HomePage />
    </>
  )
}
