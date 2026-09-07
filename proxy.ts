import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = request.nextUrl.pathname === '/admin/login'

  if (isAdminRoute && !isLoginRoute) {
    const authCookie = request.cookies.get('admin_session')
    
    // Simple check for the cookie. In a real app, this should be a JWT or signed session
    if (!authCookie || authCookie.value !== 'logged_in_true') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Prevent logged in users from seeing the login page
  if (isLoginRoute) {
    const authCookie = request.cookies.get('admin_session')
    if (authCookie && authCookie.value === 'logged_in_true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
