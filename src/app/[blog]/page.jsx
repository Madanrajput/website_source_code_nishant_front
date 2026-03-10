// import MainLayout from "../layouts/MainLayout";
// import { defaultAltText } from "@/utils/helper";
// import { notFound } from "next/navigation";
// import Image from "next/image"; // OPTIMIZATION: Use Next.js Image

// /**
//  * 🔒 Slug Guard
//  * Blocks bots, invalid URLs, and legacy junk
//  */
// const isValidSlug = (slug) => {
//   if (!slug) return false;
//   if (slug === "undefined" || slug === "null") return false;
//   if (slug.includes(".")) return false; // blocks .env, .git, etc
//   return true;
// };

// const BASE_URL = "https://hcinterior.in";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";

// /**
//  * --- HELPER: Cached Fetch for Blogs ---
//  * Replaces Axios with native fetch for ISR (Incremental Static Regeneration)
//  */
// async function getBlogData(slug) {
//   try {
//     const res = await fetch(`${API_BASE_URL}/cms-blog/blog-slug/${slug}`, {
//       next: { revalidate: 60 }, // OPTIMIZATION: Cache content on server for 60s
//     });

//     if (!res.ok) return null;
//     return await res.json();
//   } catch (error) {
//     console.error("Blog Fetch Error:", error);
//     return null;
//   }
// }

// /**
//  * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
//  */
// export async function generateMetadata({ params }) {
//   const slug = params.blog;

//   // 🚫 Invalid slug → no index, no API call
//   if (!isValidSlug(slug)) {
//     return {
//       title: "Not Found",
//       robots: "noindex, follow",
//     };
//   }

//   const blogDetails = await getBlogData(slug);

//   if (!blogDetails) {
//     return {
//       title: "Blog Not Found",
//       robots: "noindex, follow",
//     };
//   }

//   return {
//     title:
//       blogDetails?.seo_content?.meta_title ??
//       blogDetails?.title ??
//       "Latest News and Blog",

//     description:
//       blogDetails?.seo_content?.meta_description ?? "",

//     keywords:
//       blogDetails?.seo_content?.meta_keywords ?? "",

//     alternates: {
//       canonical: `${BASE_URL}/${slug}`, // Ensure this matches your final URL structure
//     },

//     robots: "index, follow",
//   };
// }

// /**
//  * ✅ BLOG PAGE (SERVER COMPONENT)
//  */
// const BlogDetail = async ({ params }) => {
//   const slug = params.blog;

//   // 🚫 Invalid slug → hard 404
//   if (!isValidSlug(slug)) {
//     notFound();
//   }

//   const blogDetails = await getBlogData(slug);

//   if (!blogDetails) {
//     notFound();
//   }

//   return (
//     <MainLayout>
//       {/* ✅ Controlled JSON-LD injection */}
//       {blogDetails?.seo_content?.custom_code && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: blogDetails.seo_content.custom_code,
//           }}
//         />
//       )}

//       <main>
//         <div className="blog_detail">
//           <div className="container">
//             <div className="row my-5 justify-content-center mx-0">
//               <div className="col-lg-10">
//                 <h1 className="pb-3">{blogDetails.title}</h1>

//                 {/* OPTIMIZATION: High Priority Main Image */}
//                 {/* This fixes "Largest Contentful Paint" (LCP) issues */}
//                 {blogDetails.image && (
//                   <div className="position-relative w-100 mb-4" style={{ minHeight: '300px' }}>
//                     <Image
//                       src={blogDetails.image}
//                       alt={blogDetails.title ?? defaultAltText}
//                       width={1200}
//                       height={600}
//                       className="w-100 h-auto object-fit-cover rounded"
//                       priority={true} // Load this IMMEDIATELY
//                       sizes="(max-width: 768px) 100vw, 1200px"
//                       style={{ maxWidth: "100%", height: "auto" }}
//                     />
//                   </div>
//                 )}

//                 <div className="details py-4">
//                   {/* Note: We do NOT use LazySection here because Google needs 
//                       to read this text immediately for SEO ranking. */}
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: blogDetails.description,
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr />
//       </main>
//     </MainLayout>
//   );
// };

// export default BlogDetail;
import MainLayout from "../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";
import { notFound } from "next/navigation";
import Image from "next/image"; 

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
 */
async function getBlogData(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/cms-blog/blog-slug/${slug}`, {
      next: { revalidate: 60 }, 
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Blog Fetch Error:", error);
    return null;
  }
}

/**
 * --- HELPER: Cached Fetch for Custom CMS Pages ---
 */
async function getCmsPageData(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/cms-pages/slug/${slug}`, {
      next: { revalidate: 60 }, 
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("CMS Page Fetch Error:", error);
    return null;
  }
}

/**
 * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
 * Dynamically generates SEO tags depending on if it's a blog or page
 */
export async function generateMetadata({ params }) {
  const slug = params.blog;

  if (!isValidSlug(slug)) {
    return { title: "Not Found", robots: "noindex, follow" };
  }

  // 1. Try fetching as a Blog
  let data = await getBlogData(slug);
  
  // 2. If not a blog, try fetching as a Custom CMS Page
  if (!data) {
    data = await getCmsPageData(slug);
  }

  // 3. If neither exist, return 404 metadata
  if (!data) {
    return { title: "Not Found", robots: "noindex, follow" };
  }

  // FIX: Look for 'page_name' first based on your API structure, 
  // then check 'seo_content.page_name', then fallback to URL/slug.
  const canonicalUrl = 
    data?.page_name || 
    data?.seo_content?.page_name || 
    data?.seo_content?.canonical_url || 
    `${BASE_URL}/${slug}`;

  return {
    title:
      data?.seo_content?.meta_title ??
      data?.title ??
      "HC Interior",

    description:
      data?.seo_content?.meta_description ?? "",

    keywords:
      data?.seo_content?.meta_keywords ?? "",

    alternates: {
      canonical: canonicalUrl, 
    },

    robots: "index, follow",
  };
}

/**
 * ✅ DYNAMIC ROOT PAGE (SERVER COMPONENT)
 * Handles both /blog-post and /custom-page URLs automatically
 */
const DynamicRootPage = async ({ params }) => {
  const slug = params.blog;

  if (!isValidSlug(slug)) {
    notFound();
  }

  // 1. Determine Data and Page Type
  let pageData = await getBlogData(slug);
  let pageType = "blog";

  if (!pageData) {
    pageData = await getCmsPageData(slug);
    pageType = "cms-page";
  }

  // 2. If neither exist, trigger Next.js 404 page
  if (!pageData) {
    notFound();
  }

  return (
    <MainLayout>
      {/* ✅ Controlled JSON-LD injection (Works for both) */}
      {pageData?.seo_content?.custom_code && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageData.seo_content.custom_code,
          }}
        />
      )}

      <main>
        {/* =========================================
            UI FOR BLOG POSTS
        ========================================= */}
        {pageType === "blog" && (
          <div className="blog_detail">
            <div className="container">
              <div className="row my-5 justify-content-center mx-0">
                <div className="col-lg-10">
                  <h1 className="pb-3">{pageData.title}</h1>

                  {pageData.image && (
                    <div className="position-relative w-100 mb-4" style={{ minHeight: '300px' }}>
                      <Image
                        src={pageData.image}
                        alt={pageData.title ?? defaultAltText}
                        width={1200}
                        height={600}
                        className="w-100 h-auto object-fit-cover rounded"
                        priority={true} 
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  )}

                  <div className="details py-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pageData.description, // Blogs use 'description' field
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            UI FOR CUSTOM CMS PAGES
        ========================================= */}
        {pageType === "cms-page" && (
          <div className="custom_page_detail">
           {/* 🌟 3. MAIN CKEDITOR CONTENT */}
            <div className="container">
              <div className="row my-5 justify-content-center mx-0">
                <div className="col-lg-12">
                  <div className="details py-4">
                    <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                  </div>

                  {/* 🌟 4. RENDER ACCORDION / FAQS DYNAMICALLY */}
                  {pageData.faqs && pageData.faqs.length > 0 && (
                    <div className="mt-5">
                      <h3 className="mb-4 fw-bold">Frequently Asked Questions</h3>
                      <div className="accordion" id={`accordion-${pageData.id}`}>
                        
                        {/* Because faqs is stored as a string in MySQL JSON, we need to parse it if it isn't already an array */}
                        {(typeof pageData.faqs === 'string' ? JSON.parse(pageData.faqs) : pageData.faqs).map((faq, index) => (
                          <div className="accordion-item mb-3 border rounded" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                              <button 
                                className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#collapse${index}`} 
                                aria-expanded={index === 0 ? "true" : "false"} 
                                aria-controls={`collapse${index}`}
                                style={{ backgroundColor: '#f8f9fa' }}
                              >
                                {faq.question}
                              </button>
                            </h2>
                            <div 
                              id={`collapse${index}`} 
                              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                              aria-labelledby={`heading${index}`} 
                              data-bs-parent={`#accordion-${pageData.id}`}
                            >
                              <div className="accordion-body">
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  )}
                  {/* ------------------------------------------ */}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <hr />
      </main>
    </MainLayout>
  );
};

export default DynamicRootPage;