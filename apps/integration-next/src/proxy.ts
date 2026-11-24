import { NextResponse, type NextRequest } from 'next/server';
import { getKlpInitialState, KLP_INITIAL_STATE_HEADER } from './app/klp-mock';

// Always set, so a client can never pass its own value through.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(KLP_INITIAL_STATE_HEADER, getKlpInitialState(request.nextUrl.searchParams));

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: '/ssr/:path*',
};
