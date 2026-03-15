// // import MainLayout from "../layouts/MainLayout";
// // import { defaultAltText } from "@/utils/helper";
// // import { notFound } from "next/navigation";
// // import Image from "next/image"; // OPTIMIZATION: Use Next.js Image

// // /**
// //  * 🔒 Slug Guard
// //  * Blocks bots, invalid URLs, and legacy junk
// //  */
// // const isValidSlug = (slug) => {
// //   if (!slug) return false;
// //   if (slug === "undefined" || slug === "null") return false;
// //   if (slug.includes(".")) return false; // blocks .env, .git, etc
// //   return true;
// // };

// // const BASE_URL = "https://hcinterior.in";
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";

// // /**
// //  * --- HELPER: Cached Fetch for Blogs ---
// //  * Replaces Axios with native fetch for ISR (Incremental Static Regeneration)
// //  */
// // async function getBlogData(slug) {
// //   try {
// //     const res = await fetch(`${API_BASE_URL}/cms-blog/blog-slug/${slug}`, {
// //       next: { revalidate: 60 }, // OPTIMIZATION: Cache content on server for 60s
// //     });

// //     if (!res.ok) return null;
// //     return await res.json();
// //   } catch (error) {
// //     console.error("Blog Fetch Error:", error);
// //     return null;
// //   }
// // }

// // /**
// //  * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
// //  */
// // export async function generateMetadata({ params }) {
// //   const slug = params.blog;

// //   // 🚫 Invalid slug → no index, no API call
// //   if (!isValidSlug(slug)) {
// //     return {
// //       title: "Not Found",
// //       robots: "noindex, follow",
// //     };
// //   }

// //   const blogDetails = await getBlogData(slug);

// //   if (!blogDetails) {
// //     return {
// //       title: "Blog Not Found",
// //       robots: "noindex, follow",
// //     };
// //   }

// //   return {
// //     title:
// //       blogDetails?.seo_content?.meta_title ??
// //       blogDetails?.title ??
// //       "Latest News and Blog",

// //     description:
// //       blogDetails?.seo_content?.meta_description ?? "",

// //     keywords:
// //       blogDetails?.seo_content?.meta_keywords ?? "",

// //     alternates: {
// //       canonical: `${BASE_URL}/${slug}`, // Ensure this matches your final URL structure
// //     },

// //     robots: "index, follow",
// //   };
// // }

// // /**
// //  * ✅ BLOG PAGE (SERVER COMPONENT)
// //  */
// // const BlogDetail = async ({ params }) => {
// //   const slug = params.blog;

// //   // 🚫 Invalid slug → hard 404
// //   if (!isValidSlug(slug)) {
// //     notFound();
// //   }

// //   const blogDetails = await getBlogData(slug);

// //   if (!blogDetails) {
// //     notFound();
// //   }

// //   return (
// //     <MainLayout>
// //       {/* ✅ Controlled JSON-LD injection */}
// //       {blogDetails?.seo_content?.custom_code && (
// //         <script
// //           type="application/ld+json"
// //           dangerouslySetInnerHTML={{
// //             __html: blogDetails.seo_content.custom_code,
// //           }}
// //         />
// //       )}

// //       <main>
// //         <div className="blog_detail">
// //           <div className="container">
// //             <div className="row my-5 justify-content-center mx-0">
// //               <div className="col-lg-10">
// //                 <h1 className="pb-3">{blogDetails.title}</h1>

// //                 {/* OPTIMIZATION: High Priority Main Image */}
// //                 {/* This fixes "Largest Contentful Paint" (LCP) issues */}
// //                 {blogDetails.image && (
// //                   <div className="position-relative w-100 mb-4" style={{ minHeight: '300px' }}>
// //                     <Image
// //                       src={blogDetails.image}
// //                       alt={blogDetails.title ?? defaultAltText}
// //                       width={1200}
// //                       height={600}
// //                       className="w-100 h-auto object-fit-cover rounded"
// //                       priority={true} // Load this IMMEDIATELY
// //                       sizes="(max-width: 768px) 100vw, 1200px"
// //                       style={{ maxWidth: "100%", height: "auto" }}
// //                     />
// //                   </div>
// //                 )}

// //                 <div className="details py-4">
// //                   {/* Note: We do NOT use LazySection here because Google needs 
// //                       to read this text immediately for SEO ranking. */}
// //                   <div
// //                     dangerouslySetInnerHTML={{
// //                       __html: blogDetails.description,
// //                     }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <hr />
// //       </main>
// //     </MainLayout>
// //   );
// // };

// // export default BlogDetail;
// import MainLayout from "../layouts/MainLayout";
// import { defaultAltText } from "@/utils/helper";
// import { notFound } from "next/navigation";
// import Image from "next/image"; 

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
//  */
// async function getBlogData(slug) {
//   try {
//     const res = await fetch(`${API_BASE_URL}/cms-blog/blog-slug/${slug}`, {
//       next: { revalidate: 60 }, 
//     });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (error) {
//     console.error("Blog Fetch Error:", error);
//     return null;
//   }
// }

// /**
//  * --- HELPER: Cached Fetch for Custom CMS Pages ---
//  */
// async function getCmsPageData(slug) {
//   try {
//     const res = await fetch(`${API_BASE_URL}/cms-pages/slug/${slug}`, {
//       next: { revalidate: 60 }, 
//     });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (error) {
//     console.error("CMS Page Fetch Error:", error);
//     return null;
//   }
// }

// /**
//  * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
//  * Dynamically generates SEO tags depending on if it's a blog or page
//  */
// export async function generateMetadata({ params }) {
//   const slug = params.blog;

//   if (!isValidSlug(slug)) {
//     return { title: "Not Found", robots: "noindex, follow" };
//   }

//   // 1. Try fetching as a Blog
//   let data = await getBlogData(slug);
  
//   // 2. If not a blog, try fetching as a Custom CMS Page
//   if (!data) {
//     data = await getCmsPageData(slug);
//   }

//   // 3. If neither exist, return 404 metadata
//   if (!data) {
//     return { title: "Not Found", robots: "noindex, follow" };
//   }

//   // FIX: Look for 'page_name' first based on your API structure, 
//   // then check 'seo_content.page_name', then fallback to URL/slug.
//   const canonicalUrl = 
//     data?.page_name || 
//     data?.seo_content?.page_name || 
//     data?.seo_content?.canonical_url || 
//     `${BASE_URL}/${slug}`;

//   return {
//     title:
//       data?.seo_content?.meta_title ??
//       data?.title ??
//       "HC Interior",

//     description:
//       data?.seo_content?.meta_description ?? "",

//     keywords:
//       data?.seo_content?.meta_keywords ?? "",

//     alternates: {
//       canonical: canonicalUrl, 
//     },

//     robots: "index, follow",
//   };
// }

// /**
//  * ✅ DYNAMIC ROOT PAGE (SERVER COMPONENT)
//  * Handles both /blog-post and /custom-page URLs automatically
//  */
// const DynamicRootPage = async ({ params }) => {
//   const slug = params.blog;

//   if (!isValidSlug(slug)) {
//     notFound();
//   }

//   // 1. Determine Data and Page Type
//   let pageData = await getBlogData(slug);
//   let pageType = "blog";

//   if (!pageData) {
//     pageData = await getCmsPageData(slug);
//     pageType = "cms-page";
//   }

//   // 2. If neither exist, trigger Next.js 404 page
//   if (!pageData) {
//     notFound();
//   }

//   return (
//     <MainLayout>
//       {/* ✅ Controlled JSON-LD injection (Works for both) */}
//       {pageData?.seo_content?.custom_code && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: pageData.seo_content.custom_code,
//           }}
//         />
//       )}

//       <main>
//         {/* =========================================
//             UI FOR BLOG POSTS
//         ========================================= */}
//         {pageType === "blog" && (
//           <div className="blog_detail">
//             <div className="container">
//               <div className="row my-5 justify-content-center mx-0">
//                 <div className="col-lg-10">
//                   <h1 className="pb-3">{pageData.title}</h1>

//                   {pageData.image && (
//                     <div className="position-relative w-100 mb-4" style={{ minHeight: '300px' }}>
//                       <Image
//                         src={pageData.image}
//                         alt={pageData.title ?? defaultAltText}
//                         width={1200}
//                         height={600}
//                         className="w-100 h-auto object-fit-cover rounded"
//                         priority={true} 
//                         sizes="(max-width: 768px) 100vw, 1200px"
//                         style={{ maxWidth: "100%", height: "auto" }}
//                       />
//                     </div>
//                   )}

//                   <div className="details py-4">
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: pageData.description, // Blogs use 'description' field
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* =========================================
//             UI FOR CUSTOM CMS PAGES
//         ========================================= */}
//         {pageType === "cms-page" && (
//           <div className="custom_page_detail">
//            {/* 🌟 3. MAIN CKEDITOR CONTENT */}
//             <div className="container">
//               <div className="row my-5 justify-content-center mx-0">
//                 <div className="col-lg-12">
//                   <div className="details py-4">
//                     <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
//                   </div>

//                   {/* 🌟 4. RENDER ACCORDION / FAQS DYNAMICALLY */}
//                   {pageData.faqs && pageData.faqs.length > 0 && (
//                     <div className="mt-5">
//                       <h3 className="mb-4 fw-bold">Frequently Asked Questions</h3>
//                       <div className="accordion" id={`accordion-${pageData.id}`}>
                        
//                         {/* Because faqs is stored as a string in MySQL JSON, we need to parse it if it isn't already an array */}
//                         {(typeof pageData.faqs === 'string' ? JSON.parse(pageData.faqs) : pageData.faqs).map((faq, index) => (
//                           <div className="accordion-item mb-3 border rounded" key={index}>
//                             <h2 className="accordion-header" id={`heading${index}`}>
//                               <button 
//                                 className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} 
//                                 type="button" 
//                                 data-bs-toggle="collapse" 
//                                 data-bs-target={`#collapse${index}`} 
//                                 aria-expanded={index === 0 ? "true" : "false"} 
//                                 aria-controls={`collapse${index}`}
//                                 style={{ backgroundColor: '#f8f9fa' }}
//                               >
//                                 {faq.question}
//                               </button>
//                             </h2>
//                             <div 
//                               id={`collapse${index}`} 
//                               className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
//                               aria-labelledby={`heading${index}`} 
//                               data-bs-parent={`#accordion-${pageData.id}`}
//                             >
//                               <div className="accordion-body">
//                                 {faq.answer}
//                               </div>
//                             </div>
//                           </div>
//                         ))}

//                       </div>
//                     </div>
//                   )}
//                   {/* ------------------------------------------ */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <hr />
//       </main>
//     </MainLayout>
//   );
// };

// export default DynamicRootPage;
import MainLayout from "../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";
import { notFound } from "next/navigation";
import Image from "next/image"; 
import { headers } from "next/headers"; // 🌟 FIX 1: Import Next.js headers

// 🌟 FIX 2: Force Next.js to treat this as a highly dynamic route
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

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
 * --- HELPER: Safely check if a page/blog is marked as Draft ---
 */
const isDraftStatus = (data) => {
  if (!data) return true;
  // If no status is found, assume it's NOT a draft.
  if (data.status === undefined || data.status === null) return false; 
  
  const status = String(data.status).toLowerCase().trim();
  return status === "draft" || status === "inactive" || status === "0";
};

/**
 * --- HELPER: Fetch for Blogs ---
 */
async function getBlogData(slug) {
  try {
    const timestamp = new Date().getTime();
    const res = await fetch(`${API_BASE_URL}/cms-blog/blog-slug/${slug}?t=${timestamp}`, {
      cache: "no-store", 
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    
    if (!res.ok) return null;
    let data = await res.json();
    
    if (!data || data.success === false) return null;

    if (Array.isArray(data)) {
        if (data.length === 0) return null;
        data = data[0]; 
    }
    
    return data;
  } catch (error) {
    console.error("Blog Fetch Error:", error);
    return null;
  }
}

/**
 * --- HELPER: Fetch for Custom CMS Pages ---
 */
async function getCmsPageData(slug) {
  try {
    const timestamp = new Date().getTime();
    const res = await fetch(`${API_BASE_URL}/cms-pages/slug/${slug}?t=${timestamp}`, {
      cache: "no-store", 
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    
    if (!res.ok) return null;
    let data = await res.json();
    
    if (!data || data.success === false) return null;

    if (Array.isArray(data)) {
        if (data.length === 0) return null;
        data = data[0]; 
    }
    
    return data;
  } catch (error) {
    console.error("CMS Page Fetch Error:", error);
    return null;
  }
}

/**
 * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
 */
export async function generateMetadata({ params }) {
  // 🌟 FIX 3: Call headers() to physically prevent Next.js from caching metadata 404s
  headers();

  const slug = params.blog;

  if (!isValidSlug(slug)) {
    return { title: "Not Found", robots: "noindex, follow" };
  }

  let data = await getBlogData(slug);
  
  if (!data) {
    data = await getCmsPageData(slug);
  }

  // 🛑 DRAFT PROTECTION
  if (!data || isDraftStatus(data)) {
    return { title: "Not Found", robots: "noindex, follow" };
  }

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
      canonical: data?.seo_content?.canonical_url || `${BASE_URL}/${slug}`, 
    },
    robots: "index, follow",
  };
}

/**
 * HELPER: Safely parse JSON arrays coming from the database
 */
const parseJsonSafe = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

/**
 * ✅ DYNAMIC ROOT PAGE (SERVER COMPONENT)
 */
const DynamicRootPage = async ({ params }) => {
  // 🌟 FIX 4: Call headers() to physically prevent Next.js from caching the page HTML / 404 State
  headers();

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

  // 2. 🛑 DRAFT PROTECTION: If page doesn't exist OR status is Draft, physically block rendering
  if (!pageData || isDraftStatus(pageData)) {
    notFound();
  }

  // 3. Safely parse our dynamic arrays for CMS pages
  let faqs = [];
  let accordions = [];
  let contentBlocks = [];

  if (pageType === "cms-page") {
    faqs = parseJsonSafe(pageData.faqs);
    accordions = parseJsonSafe(pageData.accordions);
    contentBlocks = parseJsonSafe(pageData.content_blocks);
  }

  return (
    <MainLayout>
      {/* ✅ Controlled JSON-LD injection */}
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
                        __html: pageData.description, 
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
            <div className="container">
              <div className="row my-5 justify-content-center mx-0">
                <div className="col-lg-12">
                  
                  {/* 🌟 1. PAGE TITLE */}
                  <h1 className="mb-4 fw-bold">{pageData.title}</h1>

                  {/* 🌟 2. MAIN CKEDITOR CONTENT */}
                  <div className="details py-4">
                    <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                  </div>

                  {/* 🌟 3. CONTENT BLOCKS */}
                  {contentBlocks.length > 0 && (
                    <div className="content-blocks-section mt-5">
                      {contentBlocks.map((block, idx) => (
                        <div key={idx} className="mb-4 p-4 border rounded bg-light shadow-sm">
                          
                          {/* Testimonial Block */}
                          {block.type === 'testimonial' && (
                            <blockquote className="blockquote text-center mb-0">
                              <p className="mb-3 fs-5 font-italic">
                                &quot;{block.data.review}&quot;
                              </p>
                              <footer className="blockquote-footer mt-0 fs-6">
                                {block.data.client_name} <cite title="Source Title">{block.data.designation}</cite>
                              </footer>
                            </blockquote>
                          )}

                          {/* Service Row Block */}
                          {block.type === 'service_row' && (
                            <div className="row align-items-center">
                              <div className={block.data.reverse_layout ? 'col-md-6 order-md-2' : 'col-md-6'}>
                                <h3 className="fw-bold mb-3">{block.data.heading}</h3>
                                <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>{block.data.description}</p>
                              </div>
                              <div className={block.data.reverse_layout ? 'col-md-6 order-md-1 text-center' : 'col-md-6 text-center'}>
                                {block.data.image_url && (
                                  <img 
                                    src={block.data.image_url} 
                                    alt={block.data.heading} 
                                    className="img-fluid rounded shadow" 
                                    style={{ maxHeight: '350px', objectFit: 'cover' }} 
                                  />
                                )}
                              </div>
                            </div>
                          )}

                          {/* Counter Block */}
                          {block.type === 'counter' && (
                            <div className="text-center p-4">
                              <h2 className="text-primary fw-bold display-4 mb-2">{block.data.number}</h2>
                              <p className="fw-semibold text-uppercase text-secondary mb-0 tracking-wider">{block.data.label}</p>
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  )}

                  {/* 🌟 4. ACCORDIONS */}
                  {accordions.length > 0 && (
                    <div className="mt-5">
                      <h3 className="mb-4 fw-bold">Additional Information</h3>
                      <div className="accordion" id={`accordion-info-${pageData.id}`}>
                        {accordions.map((acc, index) => (
                          <div className="accordion-item mb-3 border rounded shadow-sm" key={`acc-${index}`}>
                            <h2 className="accordion-header" id={`acc-heading${index}`}>
                              <button 
                                className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#acc-collapse${index}`} 
                                aria-expanded={index === 0 ? "true" : "false"} 
                                aria-controls={`acc-collapse${index}`}
                                style={{ backgroundColor: '#f8f9fa' }}
                              >
                                {acc.title}
                              </button>
                            </h2>
                            <div 
                              id={`acc-collapse${index}`} 
                              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                              aria-labelledby={`acc-heading${index}`} 
                              data-bs-parent={`#accordion-info-${pageData.id}`}
                            >
                              <div className="accordion-body text-muted" style={{ whiteSpace: 'pre-line' }}>
                                {acc.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🌟 5. FREQUENTLY ASKED QUESTIONS */}
                  {faqs.length > 0 && (
                    <div className="mt-5">
                      <h3 className="mb-4 fw-bold">Frequently Asked Questions</h3>
                      <div className="accordion" id={`accordion-faq-${pageData.id}`}>
                        {faqs.map((faq, index) => (
                          <div className="accordion-item mb-3 border rounded shadow-sm" key={`faq-${index}`}>
                            <h2 className="accordion-header" id={`faq-heading${index}`}>
                              <button 
                                className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#faq-collapse${index}`} 
                                aria-expanded={index === 0 ? "true" : "false"} 
                                aria-controls={`faq-collapse${index}`}
                                style={{ backgroundColor: '#f8f9fa' }}
                              >
                                {faq.question}
                              </button>
                            </h2>
                            <div 
                              id={`faq-collapse${index}`} 
                              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                              aria-labelledby={`faq-heading${index}`} 
                              data-bs-parent={`#accordion-faq-${pageData.id}`}
                            >
                              <div className="accordion-body text-muted" style={{ whiteSpace: 'pre-line' }}>
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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