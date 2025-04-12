import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routes } from "./app/routes"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect root to admin dashboard
  if (pathname === "/") {
    return NextResponse.redirect(new URL(routes.admin.dashboard, request.url))
  }

  // Pour la démo, nous ne vérifions pas l'authentification dans le middleware
  // Dans un environnement réel, vous vérifieriez les tokens ici

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
