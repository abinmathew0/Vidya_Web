import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const adminPaths = ['/admin'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Check if the path is under /admin
  if (adminPaths.some(path => pathname.startsWith(path))) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/error', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
