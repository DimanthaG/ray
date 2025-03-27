import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
  ]
} 