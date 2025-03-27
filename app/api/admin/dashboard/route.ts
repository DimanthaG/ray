import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Fetch total clients
    const totalClients = await prisma.client.count()

    // Fetch total portfolio items
    const totalPortfolioItems = await prisma.portfolio.count()

    // Fetch recent activity
    const recentActivity = await Promise.all([
      // Get recent clients
      prisma.client.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      }),
      // Get recent portfolio items
      prisma.portfolio.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      }),
    ])

    // Combine and sort recent activity
    const combinedActivity = [
      ...recentActivity[0].map((client) => ({
        id: client.id,
        type: "client" as const,
        title: `New client: ${client.name}`,
        date: client.createdAt.toISOString(),
      })),
      ...recentActivity[1].map((item) => ({
        id: item.id,
        type: "portfolio" as const,
        title: `New portfolio item: ${item.title}`,
        date: item.createdAt.toISOString(),
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({
      totalClients,
      totalPortfolioItems,
      totalEngagements: 1000000, // This would be calculated from actual engagement data
      recentActivity: combinedActivity.slice(0, 5),
    })
  } catch (error) {
    console.error("[DASHBOARD_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 