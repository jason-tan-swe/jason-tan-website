import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const isLocalhost = hostname.includes('localhost')
  
  // Handle subdomains
  const subdomain = isLocalhost
    ? hostname.split('.localhost')[0]
    : hostname.split('.')[0]

  // Redirect quests subdomain to the quests app
  if (subdomain === 'quests') {
    url.pathname = `/quests${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /studio (Sanity Studio)
     * 4. /static (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|studio|static|[\\w-]+\\.\\w+).*)',
  ],
} 