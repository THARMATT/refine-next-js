import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value ||''
 
  if (currentUser && !request.nextUrl.pathname.startsWith('/profile')) {
    return Response.redirect(new URL('/profile', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/signup')) {
    return Response.redirect(new URL('/signup', request.url))
  }
}
 
export const config = {
  matcher: ['/','/profile','/signin','/signup'],
}