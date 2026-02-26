import MainLayout from "../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";
import { notFound } from "next/navigation";
import Image from "next/image"; // OPTIMIZATION: Use Next.js Image

/**
 * 🔒 Slug Guard
 * Blocks bots, invalid URLs, and legacy junk
 */
const isValidSlug = (slug) => {
  if (!slug) return false;
  if (slug === "undefined" || slug === "null") return false;
  if (slug.includes(".")) return false; // blocks .env, .git, etc
  return true;
};

const BASE_URL = "https://hcinterior.in";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";

/**
 * --- HELPER: Cached Fetch for Blogs ---
 * Replaces Axios with native fetch for ISR (Incremental Static Regeneration)
 */
async function getBlogData(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/cms-blog/blog-slug/${slug}`, {
      next: { revalidate: 60 }, // OPTIMIZATION: Cache content on server for 60s
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Blog Fetch Error:", error);
    return null;
  }
}

/**
 * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
 */
export async function generateMetadata({ params }) {
  const slug = params.blog;

  // 🚫 Invalid slug → no index, no API call
  if (!isValidSlug(slug)) {
    return {
      title: "Not Found",
      robots: "noindex, follow",
    };
  }

  const blogDetails = await getBlogData(slug);

  if (!blogDetails) {
    return {
      title: "Blog Not Found",
      robots: "noindex, follow",
    };
  }

  return {
    title:
      blogDetails?.seo_content?.meta_title ??
      blogDetails?.title ??
      "Latest News and Blog",

    description:
      blogDetails?.seo_content?.meta_description ?? "",

    keywords:
      blogDetails?.seo_content?.meta_keywords ?? "",

    alternates: {
      canonical: `${BASE_URL}/${slug}`, // Ensure this matches your final URL structure
    },

    robots: "index, follow",
  };
}

/**
 * ✅ BLOG PAGE (SERVER COMPONENT)
 */
const BlogDetail = async ({ params }) => {
  const slug = params.blog;

  // 🚫 Invalid slug → hard 404
  if (!isValidSlug(slug)) {
    notFound();
  }

  const blogDetails = await getBlogData(slug);

  if (!blogDetails) {
    notFound();
  }

  return (
    <MainLayout>
      {/* ✅ Controlled JSON-LD injection */}
      {blogDetails?.seo_content?.custom_code && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: blogDetails.seo_content.custom_code,
          }}
        />
      )}

      <main>
        <div className="blog_detail">
          <div className="container">
            <div className="row my-5 justify-content-center mx-0">
              <div className="col-lg-10">
                <h1 className="pb-3">{blogDetails.title}</h1>

                {/* OPTIMIZATION: High Priority Main Image */}
                {/* This fixes "Largest Contentful Paint" (LCP) issues */}
                {blogDetails.image && (
                  <div className="position-relative w-100 mb-4" style={{ minHeight: '300px' }}>
                    <Image
                      src={blogDetails.image}
                      alt={blogDetails.title ?? defaultAltText}
                      width={1200}
                      height={600}
                      className="w-100 h-auto object-fit-cover rounded"
                      priority={true} // Load this IMMEDIATELY
                      sizes="(max-width: 768px) 100vw, 1200px"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}

                <div className="details py-4">
                  {/* Note: We do NOT use LazySection here because Google needs 
                      to read this text immediately for SEO ranking. */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </main>
    </MainLayout>
  );
};

export default BlogDetail;