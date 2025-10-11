import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Function to generate a unique entry code for Trade Expo
function generateTradeExpoEntryCode(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `TRADE${timestamp}${random}`
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
      email,
      businessType,
      companySize,
      yearsInBusiness,
      productsServices,
      targetMarkets,
      exhibitionGoals,
      eventType
    } = body

    // Validate required fields
    if (!firstName || !lastName || !company || !nationality || !country || 
        !address || !countryCode || !phoneNumber || !businessType || 
        !companySize || !yearsInBusiness || !productsServices || !exhibitionGoals) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Generate unique entry code
    const entryCode = generateTradeExpoEntryCode()

    // Store in Supabase - using the separate trade_expo_registrations table
    const { data, error } = await supabase
      .from('trade_expo_registrations')
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
          email: email || null,
          business_type: businessType,
          company_size: companySize,
          years_in_business: yearsInBusiness,
          products_services: productsServices,
          target_markets: targetMarkets || null,
          exhibition_goals: exhibitionGoals,
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
      message: "Registration successful! Please save your entry code for Trade Expo access."
    })
  } catch (error) {
    console.error("[TRADE_EXPO_REGISTER_POST]", error)
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to submit registration",
      { status: 500 }
    )
  }
}
