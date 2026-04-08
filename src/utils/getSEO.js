import { getCanonicalUrl, getRobotsDirectives } from "@/utils/seoHelpers";

export async function getPageSEO(pageUrlIdentifier) {
    try {
      const baseURL = process.env.NODE_ENV === "development" 
        ? process.env.NEXT_PUBLIC_API_DEV_URL 
        : process.env.NEXT_PUBLIC_API_BASE_URL;
  
      // Ensure the identifier has a leading slash to match your database format (e.g., "/home")
      const pathQuery = pageUrlIdentifier.startsWith('/') ? pageUrlIdentifier : `/${pageUrlIdentifier}`;

      // 🌟 Fetch only the exact record we need, bypassing cache
      const res = await fetch(`${baseURL}/seo-tag/route?path=${encodeURIComponent(pathQuery)}`, { 
        cache: "no-store" 
      });
  
      if (res.ok) {
        const pageSeo = await res.json();
        
        if (pageSeo && pageSeo.id) {
          const { index, follow } = getRobotsDirectives(pageSeo);
  
          let cleanCanonical = getCanonicalUrl({
            metaCanonicalTag: pageSeo.meta_can_tag,
            fallbackPath: pageUrlIdentifier,
          });
  
          return {
            title: pageSeo.title,
            description: pageSeo.meta_description,
            keywords: pageSeo.meta_keywords || "",
            alternates: { canonical: cleanCanonical },
            robots: { index, follow },
            openGraph: {
              title: pageSeo.og_title || pageSeo.title,
              description: pageSeo.og_description || pageSeo.meta_description,
              url: cleanCanonical,
              images: pageSeo.og_image ? [{ url: pageSeo.og_image }] : [],
            },
          };
        }
      }
    } catch (err) {
      console.error(`SEO Fetch Error for ${pageUrlIdentifier}:`, err);
    }
  
    // Global Fallback if no CMS entry is found
    return {
      title: "High Creation Interior | Best Interior Designers",
      description: "Elevate your living space with the best interior design company in Noida & Delhi NCR.",
    };
  }