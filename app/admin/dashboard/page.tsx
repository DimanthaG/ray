"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { LayoutGrid, Image as ImageIcon, Users, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signOut } from "next-auth/react"

const adminSections = [
  {
    title: "Portfolio Management",
    description: "Upload and manage portfolio images",
    icon: ImageIcon,
    href: "/admin/dashboard/portfolio",
  },
  {
    title: "Client Management",
    description: "Manage client information and projects",
    icon: Users,
    href: "/admin/dashboard/clients",
  },
  {
    title: "Settings",
    description: "Configure system settings",
    icon: Settings,
    href: "/admin/dashboard/settings",
  },
]

export default function AdminDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user?.name || "Admin"}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section, index) => (
          <motion.div
            key={section.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={section.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader>
                  <section.icon className="w-8 h-8 text-primary mb-4 group-hover:text-primary/80 transition-colors" />
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                    Manage
                    <LayoutGrid className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 