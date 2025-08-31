import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Function to generate a unique entry code
function generateEntryCode(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `GEM${timestamp}${random}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const {
      firstName,
      lastName,
      company,
      division,
      jobTitle,
      nationality,
      country,
      address,
      countryCode,
      phoneNumber,
      businessType,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !company || !nationality || !country || 
        !address || !countryCode || !phoneNumber || !businessType) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Generate unique entry code
    const entryCode = generateEntryCode()

    // Store in Supabase
    const { data, error } = await supabase
      .from('exhibition_registrations')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          company,
          division: division || null,
          job_title: jobTitle || null,
          nationality,
          country,
          address,
          country_code: countryCode,
          phone_number: phoneNumber,
          business_type: businessType,
          entry_code: entryCode,
          status: 'registered'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      return new NextResponse(`Database error: ${error.message}`, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      entryCode,
      message: "Registration successful! Please save your entry code for exhibition access."
    })
  } catch (error) {
    console.error("[REGISTER_POST]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to submit registration",
      { status: 500 }
    )
  }
}

