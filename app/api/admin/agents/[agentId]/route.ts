import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/auth-options"
import { createAdminClient } from "@/lib/supabase"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { agentId } = await params
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
      is_active,
      is_verified
    } = body

    if (!name || !email) {
      return new NextResponse("Name and email are required", { status: 400 })
    }

    const supabase = createAdminClient()
    const updateData: any = {
      name,
      email,
      phone: phone || null,
      title: title || null,
      bio: bio || null,
      profile_image_url: profile_image_url || null,
      location: location || null,
      website: website || null,
      linkedin_url: linkedin_url || null,
      whatsapp_number: whatsapp_number || null,
    }

    if (is_active !== undefined) updateData.is_active = is_active
    if (is_verified !== undefined) updateData.is_verified = is_verified

    const { data: agent, error } = await supabase
      .from('agents')
      .update(updateData)
      .eq('id', parseInt(agentId))
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(agent)
  } catch (error) {
    console.error("[AGENTS_PUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

