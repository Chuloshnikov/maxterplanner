import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get("jwt");
  const { pathname } = req.nextUrl;
  
  const isProtectedRoute = pathname.startsWith("/account") || 
                          pathname.startsWith("/calendar") || 
                          pathname.startsWith("/projects") || 
                          pathname.startsWith("/team");
  
  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  // For protected routes
  if (isProtectedRoute) {
    if (!jwt) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // Check token validity
    try {
      const isValid = await verifyToken(jwt.value);
      if (!isValid) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("jwt");
        return response;
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("jwt");
      return response;
    }
  }

  // For auth pages
  if (isAuthPage && jwt) {
    try {
      const isValid = await verifyToken(jwt.value);
      if (isValid) {
        return NextResponse.redirect(new URL("/account", req.url));
      }
    } catch (error) {
         return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/team/:path*", "/calendar/:path*", "/account/:path*", "/projects/:path*", "/login", "/sign-up"],
};