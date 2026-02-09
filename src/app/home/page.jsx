import { Suspense } from "react";
import api from "@/utils/api";
import HeroCarousel from "./clientHome/HeroCarousel";
import HomeContent from "./HomeContent"; 

// --- METADATA ---
export const metadata = {
  title: "Top Interior Designers In Delhi NCR For Home",
  description: "Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today",
  alternates: { canonical: "https://hcinterior.in" },
  openGraph: {
    title: "Top Interior Designers In Delhi NCR For Home",
    description: "Home interior designers in Delhi NCR...",
    url: "https://hcinterior.in",
    siteName: "High Creation Interior",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true, 
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  "name": "High Creation Interior",
  "url": "https://hcinterior.in",
  "sameAs": [
    "https://www.facebook.com/HighCreationInteriorProjectsPvtLtd",
    "https://www.instagram.com/highcreationinterior/"
  ]
};

// 1. Fetch ONLY the banner (Fastest possible fetch)
async function getBannerData() {
  try {
    const bannerRes = await api.get("/cms-content/homepage_banner");
    return bannerRes.data?.json_content || [];
  } catch (err) {
    console.error("Banner Fetch Error:", err);
    return [];
  }
}

export default async function Home() {
  // Fetch banner data on the server
  const bannerData = await getBannerData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Hero Carousel - Renders Immediately (Low LCP) */}
      <HeroCarousel bannerData={bannerData} />

      {/* 2. The Rest of the Page - Streams in later */}
      {/* ENABLE SUSPENSE: This allows the Banner to show while the heavy content loads in the background */}
      <Suspense fallback={<div className="py-5 text-center">Loading Content...</div>}>
        <HomeContent />
      </Suspense>
    </>
  );
}