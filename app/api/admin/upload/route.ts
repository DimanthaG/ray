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
    // Log Cloudinary configuration (without sensitive data)
    console.log('Cloudinary configuration:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      configured: !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET,
    })

    const session = await getServerSession(authOptions)
    if (!session) {
      console.error('Unauthorized: No session found')
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.formData()
    const files = data.getAll('files') as File[]
    console.log(`Received ${files.length} files`)

    if (!files.length) {
      console.error('No files provided in request')
      return new NextResponse("No files provided", { status: 400 })
    }

    const uploadPromises = files.map(async (file) => {
      try {
        console.log(`Processing file: ${file.name}, size: ${file.size}, type: ${file.type}`)
        
        // Convert file to base64
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const fileStr = `data:${file.type};base64,${buffer.toString('base64')}`
        console.log('File converted to base64')

        // Upload to Cloudinary
        console.log('Uploading to Cloudinary...')
        const result = await cloudinary.uploader.upload(fileStr, {
          folder: 'portfolio',
          resource_type: 'auto',
        })
        console.log('Cloudinary upload successful:', result.secure_url)

        return {
          title: file.name.split('.')[0], // Use filename without extension as title
          description: `Uploaded on ${new Date().toLocaleDateString()}`,
          image_url: result.secure_url,
          category: 'Uncategorized',
        }
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error)
        throw error
      }
    })

    try {
      const uploadedFiles = await Promise.all(uploadPromises)
      console.log(`Successfully uploaded ${uploadedFiles.length} files`)
      return NextResponse.json(uploadedFiles)
    } catch (error) {
      console.error('Error in Promise.all:', error)
      throw error
    }
  } catch (error) {
    console.error('[UPLOAD_ERROR]', error)
    return new NextResponse(
      error instanceof Error ? error.message : "Upload failed",
      { status: 500 }
    )
  }
} 