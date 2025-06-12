import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("jwt");
  //console.log("🧠 middleware active — JWT:", jwt?.value);

  const { pathname } = req.nextUrl;
  const isProtectedRoute = pathname.startsWith("/notes") || pathname.startsWith("/calendar") || pathname.startsWith("/account");
  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  if (isProtectedRoute && !jwt) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthPage && jwt) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/calendar/:path*", "/account/:path*", "/login", "/sign-up"],
};