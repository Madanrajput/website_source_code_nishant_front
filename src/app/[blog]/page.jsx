import MainLayout from "../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";
import { notFound } from "next/navigation";
import Image from "next/image"; 
import { headers } from "next/headers"; 

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
  FaUserCircle,
  FaCalendarAlt
} from "react-icons/fa";

import { 
  generateOrganizationSchema, 
  generateLocalBusinessSchema, 
  generateBreadcrumbSchema, 
  generateFAQSchema 
} from "@/utils/schemaGenerator";
import { getCanonicalUrl, getRobotsDirectives } from "@/utils/seoHelpers";

// 👈 1. Import getPageSEO to access the global SEO manager
import { getPageSEO } from "@/utils/getSEO"; 

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const isValidSlug = (slug) => {
  if (!slug) return false;
  if (slug === "undefined" || slug === "null") return false;
  if (slug.includes(".")) return false; 
  return true;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";

const isDraftStatus = (data) => {
  if (!data) return true;
  if (data.status === undefined || data.status === null) return false; 
  const status = String(data.status).toLowerCase().trim();
  return status === "draft" || status === "inactive" || status === "0";
};

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
    return null;
  }
}

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
    return null;
  }
}

// 👈 2. Update generateMetadata to merge page data with the global SEO Tag data
export async function generateMetadata({ params }) {
  headers();
  const slug = params.blog;

  if (!isValidSlug(slug)) {
    return { title: "Not Found", robots: { index: false, follow: true } };
  }

  // Fetch Page Data and Global SEO Tags simultaneously
  const [blogData, cmsData, seoData] = await Promise.all([
    getBlogData(slug).catch(() => null),
    getCmsPageData(slug).catch(() => null),
    getPageSEO(`/${slug}`).catch(() => null)
  ]);

  let data = blogData || cmsData;

  if (!data || isDraftStatus(data)) {
    return { title: "Not Found", robots: { index: false, follow: true } };
  }

  // Merge the SEO logic
  const robots = seoData?.robots || getRobotsDirectives(data?.seo_content);
  const canonicalUrl = getCanonicalUrl({
    canonicalUrl: seoData?.alternates?.canonical || data?.seo_content?.canonical_url,
    fallbackPath: `/${slug}`,
  });

  return {
    title: seoData?.title || data?.seo_content?.meta_title || data?.title || "HC Interior",
    description: seoData?.description || data?.seo_content?.meta_description || "",
    keywords: seoData?.keywords || data?.seo_content?.meta_keywords || "",
    alternates: { canonical: canonicalUrl },
    robots,
    openGraph: seoData?.openGraph || null,
    twitter: seoData?.twitter || null,
  };
}

const parseJsonSafe = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try { return JSON.parse(data); } catch (e) { return []; }
};

const DynamicRootPage = async ({ params }) => {
  headers();
  const slug = params.blog;

  if (!isValidSlug(slug)) {
    notFound();
  }

  // 1. Fetch data sequentially (since we need to check blog first, then cms page)
  let pageData = await getBlogData(slug);
  let pageType = "blog";

  if (!pageData) {
    pageData = await getCmsPageData(slug);
    pageType = "cms-page";
  }

  if (!pageData || isDraftStatus(pageData)) {
    notFound();
  }

  // 👈 3. Fetch global SEO tags for this specific slug
  const seoData = await getPageSEO(`/${slug}`);
  const customSchema = seoData?.customSchema;

  let faqs = [];
  let accordions = [];
  let contentBlocks = [];

  if (pageType === "cms-page") {
    faqs = parseJsonSafe(pageData.faqs);
    accordions = parseJsonSafe(pageData.accordions);
    contentBlocks = parseJsonSafe(pageData.content_blocks);
  }

  let siteSettings = null;
  try {
    const timestamp = new Date().getTime();
    const setRes = await fetch(`${API_BASE_URL}/site-settings`, { 
        cache: "no-store",
        headers: { 'Cache-Control': 'no-cache' }
    });
    if (setRes.ok) {
        const rawSettings = await setRes.json();
        siteSettings = Array.isArray(rawSettings) ? rawSettings[0] : rawSettings;
    }
  } catch (e) { 
      console.error("Settings fetch failed", e); 
  }

  const orgSchema = generateOrganizationSchema(siteSettings);
  const localBizSchema = generateLocalBusinessSchema(siteSettings);
  const breadcrumbSchema = generateBreadcrumbSchema(slug, pageData.title);
  
  // Check if they pasted custom schema into the inner SEO content module
  const hasInnerCustomFaqSchema =
    typeof pageData?.seo_content?.custom_code === "string" &&
    /FAQPage/i.test(pageData.seo_content.custom_code);
    
  const faqSchema = faqs.length > 0 && !hasInnerCustomFaqSchema ? generateFAQSchema(faqs) : null;
// console.log('Does FAQ Schema', faqSchema) 
  return (
    <MainLayout>
      {/* <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} /> */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />} */}

      {/* 👈 4. Inject the Custom Schema from the Global SEO Tag Manager */}
      {customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof customSchema === 'string' 
              ? customSchema.replace(/<script[^>]*>/gi, '').replace(/<\/script>/gi, '') 
              : JSON.stringify(customSchema)
          }}
        />
      )}

      {/* Legacy Fallback: Inject Custom Schema from the Page's inner SEO panel */}
      {pageData?.seo_content?.custom_code && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pageData.seo_content.custom_code.replace(/<script[^>]*>/gi, '').replace(/<\/script>/gi, '') }}
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .social-btn { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 50%; background-color: #f1f5f9; color: #475569; text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .social-btn:hover { transform: translateY(-4px); }
        .social-btn.fb:hover { background-color: #1877F2; color: white; box-shadow: 0 6px 12px rgba(24, 119, 242, 0.3); }
        .social-btn.ig:hover { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); color: white; box-shadow: 0 6px 12px rgba(214, 36, 159, 0.3); }
        .social-btn.tw:hover { background-color: #000000; color: white; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); }
        .social-btn.in:hover { background-color: #0A66C2; color: white; box-shadow: 0 6px 12px rgba(10, 102, 194, 0.3); }
        .social-btn.pi:hover { background-color: #E60023; color: white; box-shadow: 0 6px 12px rgba(230, 0, 35, 0.3); }
        .social-btn.yt:hover { background-color: #FF0000; color: white; box-shadow: 0 6px 12px rgba(255, 0, 0, 0.3); }
      `}} />

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
                        alt={pageData.image_alt || pageData.title || defaultAltText}
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
                    <div dangerouslySetInnerHTML={{ __html: pageData.description }} />
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
                  <h1 className="mb-4 fw-bold">{pageData.title}</h1>

                  {pageData.show_author_date && (
                      <div className="author-date-social-block d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3 mb-4">
                          <div className="text-muted fst-italic fs-6 mb-3 mb-md-0 d-flex align-items-center">
                              <FaUserCircle className="me-2" size={18} />
                              {pageData.writer_name ? `By ${pageData.writer_name}` : "By Author"} 
                              <span className="mx-3">•</span> 
                              <FaCalendarAlt className="me-2" size={16} />
                              {new Date(pageData.created_at || Date.now()).toLocaleDateString('en-US', { 
                                  year: 'numeric', month: 'long', day: 'numeric' 
                              })}
                          </div>

                          <div className="social-links d-flex gap-2">
                              {siteSettings?.facebook_url && (
                                  <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer" className="social-btn fb" aria-label="Facebook"><FaFacebookF size={18} /></a>
                              )}
                              {siteSettings?.instagram_url && (
                                  <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer" className="social-btn ig" aria-label="Instagram"><FaInstagram size={18} /></a>
                              )}
                              {siteSettings?.twitter_url && (
                                  <a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer" className="social-btn tw" aria-label="X (Twitter)"><FaTwitter size={18} /></a>
                              )}
                              {siteSettings?.linkedin_url && (
                                  <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer" className="social-btn in" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
                              )}
                              {siteSettings?.pinterest_url && (
                                  <a href={siteSettings.pinterest_url} target="_blank" rel="noopener noreferrer" className="social-btn pi" aria-label="Pinterest"><FaPinterest size={18} /></a>
                              )}
                              {siteSettings?.youtube_url && (
                                  <a href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer" className="social-btn yt" aria-label="YouTube"><FaYoutube size={18} /></a>
                              )}
                          </div>
                      </div>
                  )}

                  <div className="details py-4">
                    <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                  </div>

                  {contentBlocks.length > 0 && (
                    <div className="content-blocks-section mt-5">
                      {contentBlocks.map((block, idx) => (
                        <div key={idx} className="mb-4 p-4 border rounded bg-light shadow-sm">
                          {block.type === 'testimonial' && (
                            <blockquote className="blockquote text-center mb-0">
                              <p className="mb-3 fs-5 font-italic">&quot;{block.data.review}&quot;</p>
                              <footer className="blockquote-footer mt-0 fs-6">
                                {block.data.client_name} <cite title="Source Title">{block.data.designation}</cite>
                              </footer>
                            </blockquote>
                          )}
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
                                    alt={block.data.image_alt || block.data.heading || defaultAltText} 
                                    className="img-fluid rounded shadow" 
                                    style={{ maxHeight: '350px', objectFit: 'cover' }} 
                                  decoding="async"  loading="lazy" />
                                )}
                              </div>
                            </div>
                          )}
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
                            <div id={`acc-collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`acc-heading${index}`} data-bs-parent={`#accordion-info-${pageData.id}`}>
                              <div className="accordion-body text-muted" style={{ whiteSpace: 'pre-line' }}>
                                {acc.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                            <div id={`faq-collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`faq-heading${index}`} data-bs-parent={`#accordion-faq-${pageData.id}`}>
                              <div className="accordion-body text-muted" style={{ whiteSpace: 'pre-line' }}>{faq.answer}</div>
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