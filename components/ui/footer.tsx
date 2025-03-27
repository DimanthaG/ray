"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background/60 backdrop-blur-xl border-t border-border/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Business name: Raytronics</p>
          <p>Business Email: <a href="mailto:lasa_ray@yahoo.com" className="text-primary hover:underline">lasa_ray@yahoo.com</a></p>
          <p>Developed by: <Link href="https://codavra.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Codavra.com</Link></p>
          <p>Developer Email: <a href="mailto:info@codavra.com" className="text-primary hover:underline">info@codavra.com</a></p>
          <p>© {new Date().getFullYear()} Raytronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 