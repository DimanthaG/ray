import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { MinimalistNavbar } from "@/components/ui/minimalist-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raytronics - Social Media Marketing Agency",
  description: "Transform your brand's social media presence with Raytronics. We create engaging content and strategic campaigns that drive results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <MinimalistNavbar />
          <main className="pt-[72px]">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
