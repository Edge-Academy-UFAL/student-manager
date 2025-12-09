import { auth } from '@/shared/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  if (session) {
    if (isAuthenticationRoute(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (!isAuthenticationRoute(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

function isAuthenticationRoute(path: string) {
  return ['/login', '/welcome', '/create-password'].some((route) => path.startsWith(route));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|images|icons|fonts|api).*)',
  ],
};
