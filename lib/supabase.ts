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
    }
  }
} 