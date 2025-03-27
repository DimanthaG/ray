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

    const { data: submissions, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact submissions:', error)
      throw error
    }

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("[CONTACT_SUBMISSIONS_GET]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to fetch contact submissions",
      { status: 500 }
    )
  }
} 