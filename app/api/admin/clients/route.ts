import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { supabase, type Client } from "@/lib/supabase"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(clients)
  } catch (error) {
    console.error("[CLIENTS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, email, project, status } = body

    if (!name || !email || !project || !status) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const { data: client, error } = await supabase
      .from('clients')
      .insert({
        name,
        email,
        project,
        status,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(client)
  } catch (error) {
    console.error("[CLIENTS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
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
      return new NextResponse("Missing client ID", { status: 400 })
    }

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error

    return NextResponse.json({ message: "Client deleted successfully" })
  } catch (error) {
    console.error("[CLIENTS_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 