import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/auth-options"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: portfolio, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching portfolio:', error)
      throw error
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error("[PORTFOLIO_GET]", error)
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
    const { title, description, imageUrl, category, image_url } = body

    // Handle both imageUrl and image_url fields
    const finalImageUrl = image_url || imageUrl

    if (!title || !description || !finalImageUrl || !category) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    console.log('Creating portfolio item:', {
      title,
      description,
      image_url: finalImageUrl,
      category
    })

    const { data: item, error } = await supabase
      .from('portfolio')
      .insert({
        title,
        description,
        image_url: finalImageUrl,
        category,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating portfolio item:', error)
      throw error
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("[PORTFOLIO_POST]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to create portfolio item",
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
      return new NextResponse("Missing portfolio item ID", { status: 400 })
    }

    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', parseInt(id))

    if (error) {
      console.error('Error deleting portfolio item:', error)
      throw error
    }

    return NextResponse.json({ message: "Portfolio item deleted successfully" })
  } catch (error) {
    console.error("[PORTFOLIO_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 