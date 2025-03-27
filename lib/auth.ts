import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "@/lib/supabase"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      try {
        const { data: existingUser, error: queryError } = await supabase
          .from("users")
          .select()
          .eq("email", user.email)
          .single()

        if (queryError && queryError.code !== "PGRST116") {
          console.error("Error checking existing user:", queryError)
          return false
        }

        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account?.provider,
          })

          if (insertError) {
            console.error("Error creating user:", insertError)
            return false
          }
        }

        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
    async session({ session }) {
      if (!session.user?.email) return session

      try {
        const { data: user, error } = await supabase
          .from("users")
          .select()
          .eq("email", session.user.email)
          .single()

        if (error) {
          console.error("Error fetching user:", error)
          return session
        }

        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
          },
        }
      } catch (error) {
        console.error("Error in session callback:", error)
        return session
      }
    },
  },
} 