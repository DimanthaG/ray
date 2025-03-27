import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, company, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Store in Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          company: company || null,
          subject: subject || null,
          message,
          status: 'unread',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error storing contact submission:', error)
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[CONTACT_POST]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to submit contact form",
      { status: 500 }
    )
  }
} 