<<<<<<< HEAD
import { nextCookies } from "better-auth/next-js"

export function middleware() {
  return nextCookies()
=======
import { getSessionCookie } from "better-auth/cookies"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
>>>>>>> 0f1ef1b (jobs apis)
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/create",
    "/messages/:path*",
<<<<<<< HEAD
    "/profile/:path*"
  ]
}
=======
    "/profile/:path*",
  ],
}
>>>>>>> 0f1ef1b (jobs apis)
