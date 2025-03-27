"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  return <>{children}</>
} 