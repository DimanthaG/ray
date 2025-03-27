import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { edgeConfig } from "@/lib/edge-config"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { key, value } = body

    if (!key || value === undefined) {
      return new NextResponse("Missing key or value", { status: 400 })
    }

    // Update Edge Config using the raw client
    await edgeConfig.set(key, value)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[EDGE_CONFIG_UPDATE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 