import { notFound } from "next/navigation";
import MainLayout from "../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";
import { getCanonicalUrl, getRobotsDirectives } from "@/utils/seoHelpers";
import Image from "next/image"; 
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { 
  FaMapMarkerAlt, FaArrowRight, FaPhoneAlt, FaEnvelope, FaUser, 
  FaShieldAlt, FaGem, FaClock, FaTrophy, FaStar, FaAward, 
  FaCheckCircle, FaWallet, FaTools, FaDraftingCompass, FaHardHat, FaHome,
  FaWhatsapp, FaPlus
} from "react-icons/fa";

// Import your new smart forms
// import { SidebarForm, BottomContactForm } from "@/components/CityContactForms";

import { SidebarForm,BottomContactForm } from "./CityForms";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";

const cityUrlMap = {
  "noida": "/interior-designers-in-noida",
  "greater_noida": "/interior-designers-in-greater-noida",
  "delhi": "/interior-designers-in-delhi",
  "gurugram": "/interior-designers-in-gurgaon",
  "faridabad": "/best-interior-designers-in-faridabad",
  "ghaziabad": "/interior-designers-in-ghaziabad",
  "manesar": "/interior-designers-in-manesar",
  "dwarka": "/interior-designers-in-dwarka",
};

// --- DATA FETCHERS ---
async function getCityData(city) {
  try {
    const res = await fetch(`${API_BASE_URL}/cms-city/${city}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) { return null; }
}

async function getRecentBlogs() {
  try {
    const res = await fetch(`${API_BASE_URL}/cms-blog`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 4) : [];
  } catch (error) { return []; }
}

const parseJsonSafe = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try { return JSON.parse(data); } catch (e) { return []; }
};

// --- SEO METADATA ---
export async function generateMetadata({ searchParams }) {
  const city = searchParams?.city && searchParams.city !== "undefined" ? searchParams.city : "delhi";
  const pageData = await getCityData(city);
  const fallbackPath = cityUrlMap[city] || `/services-detail/${city}`;
  const canonicalUrl = getCanonicalUrl({ canonicalUrl: pageData?.seo_content?.canonical_url, fallbackPath });

  if (!pageData) return { title: "Services", robots: { index: false, follow: true } };

  return {
    title: pageData?.seo_content?.meta_title ?? `${pageData.main_title} - Services`,
    description: pageData?.seo_content?.meta_description ?? "Best Interior Design Services",
    keywords: pageData?.seo_content?.meta_keywords ?? "",
    alternates: { canonical: canonicalUrl },
    robots: getRobotsDirectives(pageData?.seo_content),
  };
}

const ServicesDetailPage = async ({ searchParams }) => {
  const city = searchParams?.city && searchParams.city !== "undefined" ? searchParams.city : "delhi";
  const pageData = await getCityData(city);
  
  if (!pageData) notFound(); 

  const recentBlogs = await getRecentBlogs();
  
  // Sanitizing CMS Data for UI
  const safeDescription = pageData?.main_description ? DOMPurify.sanitize(pageData.main_description) : "";
  const safeSideDescription = pageData?.side_description ? DOMPurify.sanitize(pageData.side_description) : "";
  
  const displayCity = city.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const faqs = parseJsonSafe(pageData.faqs);

  // Get 3 other cities for the bottom section
  const otherCities = Object.keys(cityUrlMap).filter(c => c !== city).slice(0, 3);

  return (
    <MainLayout>
      <style dangerouslySetInnerHTML={{__html: `
        :root { --hc-primary: #ff914d; --hc-dark: #0f172a; }
        .font-outfit { font-family: var(--font-outfit), sans-serif; }
        .font-poppins { font-family: var(--font-poppins), sans-serif; }
        .text-gradient { background: linear-gradient(135deg, #ff914d 0%, #ff5722 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .lazy-render { content-visibility: auto; contain-intrinsic-size: 1px 800px; }

        /* 🌟 REFINED PREMIUM FAQ & HEADING STYLES */
        .faq-main-title {
          font-family: var(--font-outfit), sans-serif;
          /* clamp(MIN, PREFERRED, MAX) -> Scales smoothly! */
          font-size: clamp(1.75rem, 6vw, 2.5rem); 
          font-weight: 800;
          color: var(--hc-dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          position: relative;
          padding-bottom: 12px;
        }
        
        /* Adds a luxury orange gradient underline to the heading */
        .faq-main-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, var(--hc-primary) 0%, #ff5722 100%);
          border-radius: 2px;
        }

        /* 🌟 INTERACTIVE LUXURY FAQs (Mobile Optimized) */
        .faq-premium-item { 
          border: none !important; 
          margin-bottom: 16px; 
          border-radius: 16px !important; 
          overflow: hidden; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.04); 
          background: #ffffff; 
          border: 1px solid #f1f5f9 !important; 
        }
        
        .faq-premium-btn { 
          width: 100%; 
          text-align: left; 
          background: white; 
          border: none; 
          /* Responsive padding: tighter on mobile, spacious on desktop */
          padding: clamp(16px, 4vw, 24px); 
          font-weight: 700; 
          /* Responsive font size for the questions */
          font-size: clamp(1.05rem, 3.5vw, 1.2rem); 
          color: var(--hc-dark); 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          box-shadow: none !important;
          line-height: 1.4;
          gap: 15px; /* Ensures text doesn't overlap the plus icon */
        }
        
        .faq-premium-btn:not(.collapsed) { color: var(--hc-primary); background: #fffcf9; }
        .faq-icon-toggle { transition: transform 0.3s ease; color: var(--hc-primary); flex-shrink: 0; }
        .faq-premium-btn:not(.collapsed) .faq-icon-toggle { transform: rotate(45deg); color: #ff5722; }
        
        /* Adjust body text size for mobile readability */
        .faq-premium-body { 
          padding: 0 clamp(16px, 4vw, 24px) 20px; 
          color: #475569; 
          font-size: clamp(0.95rem, 3vw, 1.05rem);
          line-height: 1.7; 
          background: #fffcf9; 
        }
        
        /* 🌟 PREMIUM HTML PARSER FOR CMS CONTENT */
        .rich-text-content h2, .rich-text-content h3 { font-family: var(--font-outfit), sans-serif; font-size: clamp(1.4rem, 3vw, 1.8rem); font-weight: 700; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem; }
        .rich-text-content p { font-family: var(--font-poppins), sans-serif; font-size: 1rem; line-height: 1.8; color: #475569; margin-bottom: 1.2rem; }
        .rich-text-content ul { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; padding: 0; list-style: none; margin: 2rem 0; }
        .rich-text-content li { background: #fdfdfd; border: 1px solid #f1f5f9; padding: 1rem; border-radius: 12px; display: flex; align-items: flex-start; font-weight: 500; font-family: var(--font-poppins), sans-serif; transition: 0.3s; }
        .rich-text-content li:hover { border-color: var(--hc-primary); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,145,77,0.1); }
        .rich-text-content li::before { content: '✦'; color: var(--hc-primary); margin-right: 12px; font-size: 1.2rem; line-height: 1; }

        .micro-trust-item { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px dashed #e2e8f0; }
        .micro-trust-item:last-child { border-bottom: none; padding-bottom: 0; }
        .micro-trust-icon { color: #22c55e; font-size: 18px; margin-right: 12px; }

        .faq-premium-item { border: none !important; margin-bottom: 12px; border-radius: 16px !important; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03); background: #ffffff; border: 1px solid #f1f5f9 !important; }
        .faq-premium-btn { width: 100%; text-align: left; background: white; border: none; padding: 20px 25px; font-weight: 700; color: var(--hc-dark); display: flex; justify-content: space-between; align-items: center; }
        .faq-premium-btn:not(.collapsed) { color: var(--hc-primary); background: #fffcf9; }
        .faq-icon-toggle { transition: transform 0.3s ease; color: var(--hc-primary); }
        .faq-premium-btn:not(.collapsed) .faq-icon-toggle { transform: rotate(45deg); color: #ff5722; }
        .faq-premium-body { padding: 0 25px 20px; color: #475569; line-height: 1.7; background: #fffcf9; }

        .floating-contact-widget { position: fixed; right: 20px; top: 55%; transform: translateY(-50%); z-index: 999; display: flex; flex-direction: column; gap: 12px; }
        .widget-btn { width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: 0.3s; text-decoration: none; }
        .widget-btn:hover { transform: scale(1.1); color: white; }
        .widget-btn.call { background: var(--hc-primary); }

        @media (max-width: 768px) {
          .mobile-slider-wrapper { display: flex !important; flex-wrap: nowrap !important; overflow-x: auto !important; scroll-snap-type: x mandatory; gap: 15px; padding: 10px 0 30px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .mobile-slider-wrapper::-webkit-scrollbar { display: none; }
          .mobile-slider-wrapper > div { flex: 0 0 88% !important; scroll-snap-align: center; }
          .rich-text-content ul { display: flex; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 1rem; }
          .rich-text-content li { flex: 0 0 85%; }
        }

        .city-hero { height: 55vh; min-height: 450px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; background-color: #1e293b; }
        .hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.95) 100%); z-index: 1; }
        .hero-content { position: relative; z-index: 2; text-align: center; color: white; padding-top: 40px; }
        .hero-badge { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 24px; border-radius: 30px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; display: inline-flex; align-items: center; color: #fff; font-weight: 600; }
        .city-main-container { margin-top: -80px; position: relative; z-index: 10; }
        .premium-card { background: #ffffff; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.04); padding: 40px; margin-bottom: 40px; border: 1px solid rgba(0,0,0,0.02); }
        
        .hero-main-title { font-size: clamp(2.4rem, 5vw, 3.8rem); line-height: 1.1; letter-spacing: -0.02em; }
        .process-step { display: flex; align-items: flex-start; margin-bottom: 30px; position: relative; }
        .process-step:last-child { margin-bottom: 0; }
        .process-icon { width: 50px; height: 50px; min-width: 50px; background: #fff4ed; color: #ff914d; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 20px; z-index: 2; }
        .process-step:not(:last-child)::after { content: ''; position: absolute; left: 24px; top: 50px; bottom: -30px; width: 2px; background: #ffe4d6; z-index: 1; }

        .trust-box { padding: 30px 20px; border-radius: 16px; background: #fafafa; border: 1px solid #f0f0f0; transition: all 0.3s ease; height: 100%; text-align: center; }
        .trust-box:hover { background: #ffffff; transform: translateY(-5px); box-shadow: 0 15px 30px rgba(255,145,77,0.08); border-color: #ff914d; }
        .trust-icon { width: 60px; height: 60px; background: #fff4ed; color: #ff914d; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 24px; }

        .excellence-stat { text-align: center; padding: 20px; position: relative; }
        @media (min-width: 768px) { .excellence-stat::after { content: ""; position: absolute; right: 0; top: 20%; height: 60%; width: 1px; background: #e2e8f0; } .excellence-stat:last-child::after { display: none; } }
        
        .dual-sticky-wrapper { position: sticky; top: 100px; height: max-content; }
        .sidebar-widget { background: #ffffff; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.05); padding: 30px; margin-bottom: 30px; border: 1px solid rgba(0,0,0,0.03); }
        .widget-title { font-family: var(--font-outfit), sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 25px; position: relative; padding-bottom: 10px; }
        .widget-title::after { content: ""; position: absolute; left: 0; bottom: 0; width: 40px; height: 3px; background: #ff914d; border-radius: 2px; }

        .sidebar-cta { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 20px; padding: 30px 20px; text-align: center; color: white; margin-bottom: 30px; position: relative; overflow: hidden; }
        .nav-city-link { display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; border-radius: 10px; color: #475569; text-decoration: none; font-weight: 500; font-family: var(--font-poppins), sans-serif; transition: all 0.2s ease; background: #f8fafc; margin-bottom: 10px; }
        .nav-city-link:hover, .nav-city-link.active { background: #ff914d; color: white; transform: translateX(5px); }
        .nav-city-link.active { pointer-events: none; }

        .related-card { overflow: hidden; border-radius: 16px; transition: transform 0.3s ease; border: 1px solid #f0f0f0; }
        .related-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
      `}} />

      {/* <div className="floating-contact-widget d-none d-md-flex">
        <a href="tel:+91 707070 1373" className="widget-btn call"><FaPhoneAlt size={20}/></a>
      </div> */}

      <main className="bg-light pb-5">
        
        {/* --- HERO SECTION --- */}
        <div className="city-hero w-100">
          <Image 
            src={pageData?.location_image || '/images/wework_bgImage.jpg'} 
            alt={`${displayCity} Interior Design`}
            fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
          />
          <div className="hero-overlay"></div>
          <div className="container hero-content font-poppins">
            <div className="hero-badge"><FaMapMarkerAlt className="me-2" /> High Creation in {displayCity}</div>
            <h1 className="hero-main-title fw-bold mb-3 font-outfit text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
              {pageData?.main_title || `Interior Designers in ${displayCity}`}
            </h1>
            <p className="fs-5 text-white mx-auto" style={{ maxWidth: '700px', opacity: 0.9 }}>
              Elevating lifestyles with bespoke, luxury interiors tailored for homes in {displayCity}.
            </p>
          </div>
        </div>

        <div className="container city-main-container">
          <div className="row g-5">
            
            {/* --- LEFT COLUMN: CONTENT HUB --- */}
            <div className="col-lg-8">
              <div className="dual-sticky-wrapper">
                
                <div className="premium-card mb-4">
                  <h2 className="font-outfit fw-bold h3 mb-4 text-dark">
                    Transforming Spaces in <span className="text-gradient">{displayCity}</span>
                  </h2>
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: safeDescription }} />
                </div>

                {(pageData?.side_title || safeSideDescription) && (
                  <div className="lazy-render">
                    <div className="premium-card mb-4" style={{ background: '#fffcf9' }}>
                      <h3 className="font-outfit fw-bold h4 mb-3 text-dark">{pageData.side_title}</h3>
                      <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: safeSideDescription }} />
                    </div>
                  </div>
                )}

                {/* --- DESIGN PROCESS GRID --- */}
                <div className="lazy-render">
                  <div className="premium-card bg-white border-0">
                    <h2 className="font-outfit fw-bold h3 mb-4 text-dark">Our Proven Design Process</h2>
                    <div className="mobile-slider-wrapper">
                      {[
                        { icon: <FaUser />, title: "Consultation & Ideation", desc: `We meet at your ${displayCity} property to understand your vision.` },
                        { icon: <FaDraftingCompass />, title: "3D Concept & Planning", desc: "Walking through your home with detailed 3D renders before we build." },
                        { icon: <FaHardHat />, title: "Precision Execution", desc: "Expert execution with 146 quality checks and zero compromises." },
                        { icon: <FaHome />, title: "The Grand Handover", desc: "A flawless move-in within 45 guaranteed days. Welcome home." }
                      ].map((step, i) => (
                        <div className="process-step" key={i}>
                          <div className="process-icon">{step.icon}</div>
                          <div>
                            <h4 className="font-outfit h5 fw-bold mb-1">{i + 1}. {step.title}</h4>
                            <p className="text-muted font-poppins small mb-0">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- TRUST PILLARS --- */}
                <div className="lazy-render">
                  <div className="premium-card bg-transparent border-0 shadow-none px-0 py-0 mb-4">
                    <div className="row g-4 mobile-slider-wrapper">
                      <div className="col-md-4">
                        <div className="trust-box bg-white shadow-sm">
                          <div className="trust-icon"><FaShieldAlt /></div>
                          <h4 className="font-outfit fw-bold h5">10-Year Warranty</h4>
                          <p className="text-muted font-poppins small mb-0">India&apos;s only full-home coverage guarantee.</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="trust-box bg-white shadow-sm">
                          <div className="trust-icon"><FaGem /></div>
                          <h4 className="font-outfit fw-bold h5">Elite Finishes</h4>
                          <p className="text-muted font-poppins small mb-0">Sourcing luxury materials that stand the test of time.</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="trust-box bg-white shadow-sm">
                          <div className="trust-icon"><FaClock /></div>
                          <h4 className="font-outfit fw-bold h5">45-Day Delivery</h4>
                          <p className="text-muted font-poppins small mb-0">Swift, on-time installation of storage & kitchens.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- EXCELLENCE STATS --- */}
                <div className="lazy-render">
                  <div className="premium-card shadow-sm" style={{ background: 'linear-gradient(to right, #ffffff, #fff9f5)' }}>
                    <div className="row align-items-center mobile-slider-wrapper">
                      <div className="col-md-4 excellence-stat">
                        <FaTrophy size={40} className="text-warning mb-3" />
                        <h3 className="font-outfit fw-bold h2 mb-1">500+</h3>
                        <p className="font-poppins text-muted small fw-bold text-uppercase mb-0">Projects Delivered</p>
                      </div>
                      <div className="col-md-4 excellence-stat">
                        <FaStar size={40} color="#ff914d" className="mb-3" />
                        <h3 className="font-outfit fw-bold h2 mb-1">4.9/5</h3>
                        <p className="font-poppins text-muted small fw-bold text-uppercase mb-0">Client Ratings</p>
                      </div>
                      <div className="col-md-4 excellence-stat">
                        <FaAward size={40} color="#2b2b2b" className="mb-3" />
                        <h3 className="font-outfit fw-bold h2 mb-1">15+</h3>
                        <p className="font-poppins text-muted small fw-bold text-uppercase mb-0">Design Awards</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🌟 INTEGRATED: BOTTOM CONTACT FORM (Above FAQs/Blogs) */}
                {/* <div className="lazy-render">
                    <BottomContactForm mapSrc={pageData?.map_url} />
                </div> */}

                {/* 🌟 INTERACTIVE PREMIUM FAQs */}
                {faqs.length > 0 && (
                  <div className="lazy-render">
                    <div className="premium-card border-0 px-0">
                      <h2 className="font-outfit fw-bold h3 mb-4">Insights for {displayCity}</h2>
                      <div className="accordion font-poppins" id={`accordion-faq-${pageData?.id}`}>
                        {faqs.map((faq, index) => (
                          <div className="accordion-item faq-premium-item" key={index}>
                            <h2 className="accordion-header">
                              <button className={`accordion-button faq-premium-btn ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                <span className="pe-3">{faq.question}</span>
                                <FaPlus className="faq-icon-toggle flex-shrink-0" />
                              </button>
                            </h2>
                            <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent={`#accordion-faq-${pageData?.id}`}>
                              <div className="accordion-body faq-premium-body" style={{ whiteSpace: 'pre-line' }}>{faq.answer}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- BLOG INSPIRATION --- */}
                {recentBlogs.length > 0 && (
                  <div className="lazy-render">
                    <div className="premium-card border-0 px-0 pt-0">
                      <h2 className="font-outfit fw-bold h3 mb-4">Design Inspiration</h2>
                      <div className="row g-4 font-poppins mobile-slider-wrapper">
                        {recentBlogs.map((blog, idx) => (
                          <div className="col-md-6" key={idx}>
                            <Link href={`/${blog.seo_content?.slug || `blog-detail?id=${blog.id}`}`} className="text-decoration-none">
                              <div className="d-flex align-items-center border p-3 rounded-4 bg-white shadow-sm h-100 transition-all hover:shadow-md">
                                <img src={blog.image || "/images/default.jpg"} alt={blog.title} className="rounded" style={{ width: "80px", height: "80px", objectFit: "cover" }} loading="lazy" />
                                <div className="ms-3">
                                  <h6 className="text-dark fw-bold mb-1" style={{ fontSize: '14px' }}>{blog.title.length > 45 ? `${blog.title.substring(0, 45)}...` : blog.title}</h6>
                                  <small className="text-gradient fw-bold">READ ARTICLE <FaArrowRight size={10} /></small>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* --- RIGHT COLUMN: SIDEBAR --- */}
            <div className="col-lg-4">
              <div className="dual-sticky-wrapper">
                <div className="sidebar-cta shadow-lg mb-4">
                  <h4 className="font-outfit fw-bold mb-2">Book a Site Visit</h4>
                  <p className="font-poppins small text-white-50 mb-4">Expert designers will visit your {displayCity} property.</p>
                  <Link href="/contact" className="btn btn-light w-100 fw-bold py-2 rounded-pill">Schedule Now</Link>
                </div>

                {/* 🌟 INTEGRATED: SIDEBAR FORM (Replaced static form) */}
                <SidebarForm city={city} />

                {/* --- THE PROMISE --- */}
                <div className="sidebar-widget py-4 font-poppins lazy-render">
                  <h4 className="widget-title mb-4">The Promise</h4>
                  <div className="micro-trust-item">
                    <FaCheckCircle className="micro-trust-icon" />
                    <div>
                      <span className="d-block fw-bold text-dark" style={{ fontSize: '14px' }}>Transparent Pricing</span>
                      <span className="text-muted" style={{ fontSize: '12px' }}>No hidden costs, ever.</span>
                    </div>
                  </div>
                  <div className="micro-trust-item">
                    <FaTools className="micro-trust-icon text-warning" />
                    <div>
                      <span className="d-block fw-bold text-dark" style={{ fontSize: '14px' }}>In-House Execution</span>
                      <span className="text-muted" style={{ fontSize: '12px' }}>No third-party contractors involved.</span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-widget">
                  <h4 className="widget-title">Service Areas</h4>
                  <div className="d-flex flex-column">
                    {Object.keys(cityUrlMap).map((c, idx) => (
                      <Link key={idx} href={cityUrlMap[c]} className={`nav-city-link ${c === city ? 'active' : ''}`}>
                        <span><FaMapMarkerAlt className="me-2" size={14} /> <span className="text-capitalize">{c.replace('_', ' ')}</span></span>
                        <FaArrowRight size={12} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEARBY LOCATIONS --- */}
        {otherCities.length > 0 && (
          <div className="container mt-5 pt-4 border-top">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <h2 className="font-outfit fw-bold text-dark h3">Nearby Locations</h2>
              <Link href="/services" className="text-decoration-none fw-bold small text-gradient">VIEW ALL CITIES <FaArrowRight /></Link>
            </div>
            <div className="row g-4 mobile-slider-wrapper">
              {otherCities.map((cityName, idx) => (
                <div className="col-lg-4" key={idx}>
                  <Link href={cityUrlMap[cityName]} className="text-decoration-none">
                    <div className="related-card bg-white position-relative shadow-sm h-100">
                      <div style={{ height: "200px", position: "relative" }}>
                        <Image src="/images/wework_bgImage.jpg" alt={cityName} fill style={{ objectFit: "cover" }} loading="lazy" />
                        <div className="position-absolute bottom-0 start-0 p-4 w-100 text-white fw-bold" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                          <FaMapMarkerAlt className="me-2 text-warning" /> {cityName.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </MainLayout>
  );
};

export default ServicesDetailPage;