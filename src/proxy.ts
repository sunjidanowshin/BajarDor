import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const url = new URL("/signin", request.url);
  url.searchParams.set("redirect", request.nextUrl.pathname);
  url.searchParams.set("reason", "protected");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
