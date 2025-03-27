import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const [
      { data: clients, error: clientsError },
      { data: portfolio, error: portfolioError },
      { data: recentClients, error: recentClientsError },
      { data: recentPortfolio, error: recentPortfolioError },
    ] = await Promise.all([
      supabase.from("clients").select("count").single(),
      supabase.from("portfolio").select("count").single(),
      supabase
        .from("clients")
        .select()
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("portfolio")
        .select()
        .order("created_at", { ascending: false })
        .limit(5),
    ])

    if (clientsError || portfolioError || recentClientsError || recentPortfolioError) {
      console.error("Error fetching dashboard data:", {
        clientsError,
        portfolioError,
        recentClientsError,
        recentPortfolioError,
      })
      return new NextResponse("Internal Server Error", { status: 500 })
    }

    const recentActivity = [
      ...(recentClients || []).map((client: any) => ({
        type: "client",
        ...client,
      })),
      ...(recentPortfolio || []).map((item: any) => ({
        type: "portfolio",
        ...item,
      })),
    ].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    return NextResponse.json({
      totalClients: clients?.count || 0,
      totalPortfolio: portfolio?.count || 0,
      recentActivity: recentActivity.slice(0, 5),
    })
  } catch (error) {
    console.error("Error in dashboard route:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 