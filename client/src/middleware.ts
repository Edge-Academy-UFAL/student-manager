import { auth } from '@/shared/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUsername } from '@/shared/lib/utils';

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (
    !session &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    session?.user?.dtype === 'Student' &&
    !request.nextUrl.pathname.startsWith(
      `/students/${getUsername(session.user.email)}/`,
    )
  ) {
    return NextResponse.redirect(
      new URL(
        `/students/${getUsername(session.user.email)}/profile`,
        request.url,
      ),
    );
  }

  if (
    session &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|images|icons|fonts|api).*)',
  ],
};
