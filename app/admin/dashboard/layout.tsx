"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  LogOut,
  MessageSquare,
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push("/admin/login")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-card border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="space-y-1 px-3">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/clients"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Clients</span>
            </Link>
            <Link
              href="/admin/portfolio"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Portfolio</span>
            </Link>
            <Link
              href="/admin/dashboard/contact"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Contact</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="h-16 border-b flex items-center justify-between px-6">
            <div>
              <h2 className="text-lg font-semibold">Welcome, {session.user?.name}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/api/auth/signout")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
} 