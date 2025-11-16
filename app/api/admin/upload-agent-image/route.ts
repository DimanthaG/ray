import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/auth-options"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.formData()
    const file = data.get('file') as File

    if (!file) {
      return new NextResponse("No file provided", { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileStr = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary in 'agents' folder
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: 'agents',
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    })

    return NextResponse.json({
      image_url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error: any) {
    console.error("[UPLOAD_AGENT_IMAGE]", error)
    return NextResponse.json(
      { error: error?.message || "Failed to upload image" },
      { status: 500 }
    )
  }
}

