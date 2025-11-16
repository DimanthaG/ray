import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/auth-options"
import { supabase, type Agent } from "@/lib/supabase"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("[AGENTS_GET] Supabase error:", error)
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      )
    }

    return NextResponse.json(agents || [])
  } catch (error: any) {
    console.error("[AGENTS_GET]", error)
    return NextResponse.json(
      { error: error?.message || "Internal Error", details: error },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { 
      name, 
      email, 
      phone, 
      title, 
      bio, 
      profile_image_url, 
      location, 
      website, 
      linkedin_url, 
      whatsapp_number,
      is_active = true,
      is_verified = true
    } = body

    if (!name || !email) {
      return new NextResponse("Name and email are required", { status: 400 })
    }

    // Generate QR code using Supabase function or fallback
    let qrCode: string
    const { data: qrCodeData, error: qrError } = await supabase
      .rpc('generate_agent_qr_code')

    if (qrError || !qrCodeData) {
      // Fallback: generate QR code manually if function doesn't exist
      console.warn("[AGENTS_POST] RPC function not available, using fallback:", qrError?.message)
      qrCode = `AGENT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    } else {
      qrCode = qrCodeData
    }

    const { data: agent, error } = await supabase
      .from('agents')
      .insert({
        name,
        email,
        phone: phone || null,
        title: title || null,
        bio: bio || null,
        profile_image_url: profile_image_url || null,
        qr_code: qrCode,
        location: location || null,
        website: website || null,
        linkedin_url: linkedin_url || null,
        whatsapp_number: whatsapp_number || null,
        is_active: is_active ?? true,
        is_verified: is_verified ?? true,
      })
      .select()
      .single()

    if (error) {
      console.error("[AGENTS_POST] Supabase insert error:", error)
      return NextResponse.json(
        { 
          error: error.message, 
          details: error,
          hint: error.code === '42P01' ? 'The agents table does not exist. Please run the SQL schema first.' : 
                error.code === '42501' ? 'Permission denied. Check RLS policies.' : 
                'Check the error details above.'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(agent)
  } catch (error: any) {
    console.error("[AGENTS_POST]", error)
    return NextResponse.json(
      { error: error?.message || "Internal Error", details: error },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return new NextResponse("Missing agent ID", { status: 400 })
    }

    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', parseInt(id))

    if (error) {
      console.error("[AGENTS_DELETE] Supabase error:", error)
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "Agent deleted successfully" })
  } catch (error: any) {
    console.error("[AGENTS_DELETE]", error)
    return NextResponse.json(
      { error: error?.message || "Internal Error", details: error },
      { status: 500 }
    )
  }
}

