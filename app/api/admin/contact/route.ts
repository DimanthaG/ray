import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: submissions, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contact submissions:", error)
      return new NextResponse("Internal Server Error", { status: 500 })
    }

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error in contact submissions route:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, subject, message } = body

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          phone,
          company,
          subject,
          message,
        },
      ])
      .select()

    if (error) {
      console.error("Error creating contact submission:", error)
      return new NextResponse("Internal Server Error", { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error in contact submission route:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 