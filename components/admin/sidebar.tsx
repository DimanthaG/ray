"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react"

export function Sidebar() {
  const { data: session } = useSession()

  return (
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
          href="/admin/dashboard/portfolio"
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
        <Link
          href="/admin/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t">
        <div className="mb-4">
          <p className="text-sm font-medium">{session?.user?.name}</p>
          <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  )
} 