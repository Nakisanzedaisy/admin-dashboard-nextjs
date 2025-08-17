import { NextResponse } from 'next/server'
import { verifyToken } from './src/lib/auth'

export function middleware(request) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is trying to access super admin routes
    if (request.nextUrl.pathname.startsWith('/admin/users') && decoded.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}