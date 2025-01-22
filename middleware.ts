import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Voeg hier eventuele middleware logica toe
  // Bijvoorbeeld, als je de toegang tot admin routes wilt beperken:
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   // Voer hier authenticatie/autorisatie controles uit
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

