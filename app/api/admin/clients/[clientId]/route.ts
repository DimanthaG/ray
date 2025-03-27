import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/auth-options"
import { supabase } from "@/lib/supabase"

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', params.clientId)
      .single()

    if (error) {
      console.error('Error fetching client:', error)
      return new NextResponse("Client not found", { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error("[CLIENT_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, description, logo, website } = body

    const { data: client, error } = await supabase
      .from('clients')
      .update({
        name,
        description,
        logo,
        website,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.clientId)
      .select()
      .single()

    if (error) {
      console.error('Error updating client:', error)
      throw error
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error("[CLIENT_PUT]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to update client",
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', params.clientId)

    if (error) {
      console.error('Error deleting client:', error)
      throw error
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[CLIENT_DELETE]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to delete client",
      { status: 500 }
    )
  }
} 