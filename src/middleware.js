import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
