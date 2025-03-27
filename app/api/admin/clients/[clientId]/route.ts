import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "../../../auth/auth-options"

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const client = await prisma.client.findUnique({
      where: {
        id: params.clientId,
      },
    })

    if (!client) {
      return new NextResponse("Client not found", { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error("[CLIENT_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
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

    const client = await prisma.client.update({
      where: {
        id: params.clientId,
      },
      data: {
        name,
        description,
        logo,
        website,
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error("[CLIENT_PUT]", error)
    return new NextResponse("Internal error", { status: 500 })
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

    await prisma.client.delete({
      where: {
        id: params.clientId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[CLIENT_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 