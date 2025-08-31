import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
)

export type Client = {
  id: number
  name: string
  email: string
  project: string
  status: 'active' | 'inactive' | 'pending'
  created_at: string
}

export type Portfolio = {
  id: number
  title: string
  description: string
  image_url: string
  category: string
  created_at: string
}

export type ExhibitionRegistration = {
  id: number
  first_name: string
  last_name: string
  company: string
  division: string | null
  job_title: string | null
  nationality: string
  country: string
  address: string
  country_code: string
  phone_number: string
  email: string | null // Made optional since no email system
  business_type: string
  entry_code: string
  status: 'registered' | 'checked_in' | 'cancelled'
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: Client
        Insert: Omit<Client, 'id' | 'created_at'>
        Update: Partial<Omit<Client, 'id' | 'created_at'>>
      }
      portfolio: {
        Row: Portfolio
        Insert: Omit<Portfolio, 'id' | 'created_at'>
        Update: Partial<Omit<Portfolio, 'id' | 'created_at'>>
      }
      exhibition_registrations: {
        Row: ExhibitionRegistration
        Insert: Omit<ExhibitionRegistration, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ExhibitionRegistration, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 