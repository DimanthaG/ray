import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/auth-options"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get total clients
    const { count: totalClients, error: clientsError } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })

    if (clientsError) {
      console.error('Error fetching clients count:', clientsError)
      throw clientsError
    }

    // Get total portfolio items
    const { count: totalPortfolioItems, error: portfolioError } = await supabase
      .from('portfolio')
      .select('*', { count: 'exact', head: true })

    if (portfolioError) {
      console.error('Error fetching portfolio count:', portfolioError)
      throw portfolioError
    }

    // Get recent activity (latest 5 clients and portfolio items)
    const { data: recentClients, error: recentClientsError } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentClientsError) {
      console.error('Error fetching recent clients:', recentClientsError)
      throw recentClientsError
    }

    const { data: recentPortfolio, error: recentPortfolioError } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentPortfolioError) {
      console.error('Error fetching recent portfolio:', recentPortfolioError)
      throw recentPortfolioError
    }

    // Combine and sort recent activity
    const recentActivity = [
      ...recentClients.map(client => ({
        type: 'client',
        id: client.id,
        title: client.name,
        timestamp: client.created_at
      })),
      ...recentPortfolio.map(item => ({
        type: 'portfolio',
        id: item.id,
        title: item.title,
        timestamp: item.created_at
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json({
      totalClients: totalClients || 0,
      totalPortfolioItems: totalPortfolioItems || 0,
      totalEngagements: 1000000, // This would be calculated from actual engagement data
      recentActivity: recentActivity.slice(0, 5)
    })
  } catch (error) {
    console.error("[DASHBOARD_GET]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to fetch dashboard data",
      { status: 500 }
    )
  }
} 