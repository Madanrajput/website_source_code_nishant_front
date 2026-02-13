import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const { pathname, searchParams } = url;

  // --- 1. FIX: "services-detail?city=..." -> "/services-detail/..." ---
  // This solves the "Canonical Error" for city pages mentioned in your sheet
  if (pathname === "/services-detail" && searchParams.has("city")) {
    const city = searchParams.get("city");
    
    // If city is "undefined" or empty, go to main services page
    if (!city || city === "undefined" || city === "null") {
      return NextResponse.redirect(new URL("/services", request.url), 301);
    }

    // Otherwise, redirect to the clean URL (e.g., /services-detail/noida)
    return NextResponse.redirect(new URL(`/services-detail/${city}`, request.url), 301);
  }

  // --- 2. FIX: Redirect Map for "noidex" / Old WordPress Links ---
  // This handles the red rows in your Excel sheet
  const redirectMap = {
    // Basic Page Cleanup
    "/home": "/",
    // Portfolio & Awards (From Sheet)
    "/reallife-portfolio": "/residential-projects",
    "/design-excellence-awards": "/awards",
    "/design-excellence-awards/": "/awards",
   // Redirect dead articles to blog

    // Old WordPress Categories & Tags (Fixing "noidex" bloat)
    "/category/blogs": "/blog",
    "/category/blogs/": "/blog",
    "/category/news": "/blog",
    "/author/lalit": "/blog",
    "/comments/feed": "/blog",
    
    // Old Service Tags -> New Service Detail Pages
    "/tag/interior-design-company-in-noida": "/services-detail/noida",
    "/tag/interior-designers-in-noida-extension": "/services-detail/noida",
    "/tag/interior-designer-in-noida-sector-63": "/services-detail/noida",
    "/greater-noida": "/services-detail/greater_noida",
    "/best-interior-designers-in-west-delhi": "/services-detail/delhi",
  };

  // Check if the current path is in our map
  // We remove trailing slashes for consistent matching (except for root)
  const normalizedPath = pathname.length > 1 && pathname.endsWith("/") 
    ? pathname.slice(0, -1) 
    : pathname;

  if (redirectMap[normalizedPath]) {
    return NextResponse.redirect(new URL(redirectMap[normalizedPath], request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  // Apply to all routes except api, static files, images, etc.
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};