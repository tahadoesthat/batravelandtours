import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'bat_admin_session';
const DEFAULT_SECRET = 'super-secret-jwt-key-minimum-32-characters-long-12345';

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow login page and auth API routes
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/auth/logout')
  ) {
    // If user is already authenticated and visits /admin/login, redirect to /admin
    if (pathname === '/admin/login') {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token) {
        try {
          await jwtVerify(token, getJwtSecret());
          return NextResponse.redirect(new URL('/admin', request.url));
        } catch {
          // invalid token, proceed to login page
        }
      }
    }
    return NextResponse.next();
  }

  // 2. Protect all other /admin/* routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // 3. Protect admin API routes (e.g. /api/profile, /api/analytics/stats)
  if (
    pathname.startsWith('/api/profile') ||
    pathname.startsWith('/api/analytics/stats')
  ) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: 'Unauthorized or token expired' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/profile/:path*', '/api/analytics/stats/:path*'],
};
