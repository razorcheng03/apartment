import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    try {
      const sessionData = JSON.parse(session.value)
      
      // Basic role-based protection
      if (pathname.startsWith('/dashboard/admin') && sessionData.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/resident', request.url))
      }
      
      if (pathname.startsWith('/dashboard/resident') && sessionData.role !== 'RESIDENT') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url))
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect from login/signup if already logged in
  if (pathname === '/login' || pathname === '/SIGN-UP' || pathname === '/') {
    if (session) {
      try {
        const sessionData = JSON.parse(session.value)
        if (sessionData.role === 'ADMIN') {
          return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        } else {
          return NextResponse.redirect(new URL('/dashboard/resident', request.url))
        }
      } catch (e) {
        // Continue to login if session is invalid
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/SIGN-UP', '/'],
}
