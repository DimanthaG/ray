import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/auth-options"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { status } = body

    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating contact submission:', error)
      throw error
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error("[CONTACT_SUBMISSION_PUT]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to update contact submission",
      { status: 500 }
    )
  }
} 