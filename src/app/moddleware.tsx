// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("jwt");

  const isProtected = req.nextUrl.pathname.startsWith("/notes");

  if (isProtected && !jwt) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*"], // только для маршрутов /notes
};