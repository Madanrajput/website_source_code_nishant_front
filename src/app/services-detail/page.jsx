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
  FaCheckCircle, FaWallet, FaTools, FaDraftingCompass, FaHardHat, FaHome
} from "react-icons/fa";

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
  const safeDescription = pageData?.main_description ? DOMPurify.sanitize(pageData.main_description) : "";
  const displayCity = city.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const faqs = parseJsonSafe(pageData.faqs);

  // Get 3 other cities for the bottom section
  const otherCities = Object.keys(cityUrlMap).filter(c => c !== city).slice(0, 3);

  return (
    <MainLayout>
      <style dangerouslySetInnerHTML={{__html: `
        .font-outfit { font-family: var(--font-outfit), sans-serif; }
        .font-poppins { font-family: var(--font-poppins), sans-serif; }
        .text-gradient { background: linear-gradient(135deg, #ff914d 0%, #ff5722 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* 🌟 PERF FIX: content-visibility skips rendering off-screen sections, massively boosting Mobile CPU scores */
        .lazy-render { content-visibility: auto; contain-intrinsic-size: 1px 800px; }
        
        .city-hero { height: 55vh; min-height: 450px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; background-color: #1e293b; }
        .hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.95) 100%); z-index: 1; }
        .hero-content { position: relative; z-index: 2; text-align: center; color: white; padding-top: 40px; }
        .hero-badge { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 24px; border-radius: 30px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; display: inline-flex; align-items: center; color: #fff; font-weight: 600; }
        .city-main-container { margin-top: -80px; position: relative; z-index: 10; }
        .premium-card { background: #ffffff; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.04); padding: 40px; margin-bottom: 40px; border: 1px solid rgba(0,0,0,0.02); }
        
        .process-step { display: flex; align-items: flex-start; margin-bottom: 30px; position: relative; }
        .process-step:last-child { margin-bottom: 0; }
        .process-icon { width: 50px; height: 50px; min-width: 50px; background: #fff4ed; color: #ff914d; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 20px; z-index: 2; }
        .process-step:not(:last-child)::after { content: ''; position: absolute; left: 24px; top: 50px; bottom: -30px; width: 2px; background: #ffe4d6; z-index: 1; }

        .trust-box { padding: 30px 20px; border-radius: 16px; background: #fafafa; border: 1px solid #f0f0f0; transition: all 0.3s ease; height: 100%; text-align: center; }
        .trust-box:hover { background: #ffffff; transform: translateY(-5px); box-shadow: 0 15px 30px rgba(255,145,77,0.08); border-color: #ff914d; }
        .trust-icon { width: 60px; height: 60px; background: #fff4ed; color: #ff914d; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 24px; }

        .excellence-stat { text-align: center; padding: 20px; position: relative; }
        @media (min-width: 768px) { .excellence-stat::after { content: ""; position: absolute; right: 0; top: 20%; height: 60%; width: 1px; background: #e2e8f0; } .excellence-stat:last-child::after { display: none; } }
        
        .rich-text-content h2, .rich-text-content h3 { font-family: var(--font-outfit), sans-serif; font-weight: 700; margin-top: 1.5rem; margin-bottom: 1rem; color: #1e293b; }
        .rich-text-content p { font-family: var(--font-poppins), sans-serif; font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 1.5rem; }

        .dual-sticky-wrapper { position: sticky; top: 100px; height: max-content; }
        .sidebar-widget { background: #ffffff; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.05); padding: 30px; margin-bottom: 30px; border: 1px solid rgba(0,0,0,0.03); }
        .widget-title { font-family: var(--font-outfit), sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 25px; position: relative; padding-bottom: 10px; }
        .widget-title::after { content: ""; position: absolute; left: 0; bottom: 0; width: 40px; height: 3px; background: #ff914d; border-radius: 2px; }

        .micro-trust-item { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px dashed #e2e8f0; }
        .micro-trust-item:last-child { border-bottom: none; padding-bottom: 0; }
        .micro-trust-icon { color: #22c55e; font-size: 18px; margin-right: 12px; }

        .sidebar-cta { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 20px; padding: 30px 20px; text-align: center; color: white; margin-bottom: 30px; position: relative; overflow: hidden; }
        .sidebar-cta::before { content: ""; position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,145,77,0.2); border-radius: 50%; filter: blur(20px); }

        .nav-city-link { display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; border-radius: 10px; color: #475569; text-decoration: none; font-weight: 500; font-family: var(--font-poppins), sans-serif; transition: all 0.2s ease; background: #f8fafc; margin-bottom: 10px; }
        .nav-city-link:hover, .nav-city-link.active { background: #ff914d; color: white; transform: translateX(5px); }
        .nav-city-link.active { pointer-events: none; }

        .form-control-modern { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; font-family: var(--font-poppins), sans-serif; font-size: 15px; transition: all 0.3s; }
        .form-control-modern:focus { background: #fff; border-color: #ff914d; box-shadow: 0 0 0 4px rgba(255,145,77,0.1); outline: none; }
        
        .related-card { overflow: hidden; border-radius: 16px; transition: transform 0.3s ease; border: 1px solid #f0f0f0; }
        .related-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        .blog-hover { transition: transform 0.2s ease; }
        .blog-hover:hover { transform: translateX(5px); }
      `}} />

      <main className="bg-light pb-5">
        
        {/* =========================================
            🌟 1. OPTIMIZED HERO SECTION (LCP Priority)
        ========================================= */}
        <div className="city-hero w-100">
          <Image 
            src={pageData?.location_image || '/images/wework_bgImage.jpg'} 
            alt={`${displayCity} Interior Design`}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
          />
          <div className="hero-overlay"></div>
          
          <div className="container hero-content font-poppins">
            <div className="hero-badge">
              <FaMapMarkerAlt className="me-2" /> High Creation in {displayCity}
            </div>
            <h1 className="display-3 fw-bold mb-3 font-outfit text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
              {pageData?.main_title || `Interior Designers in ${displayCity}`}
            </h1>
            <p className="fs-5 text-white mx-auto" style={{ maxWidth: '700px', textShadow: '0 2px 10px rgba(0,0,0,0.9)', opacity: 0.9 }}>
              Elevating lifestyles with bespoke, luxury interiors tailored exclusively for homes and commercial spaces in {displayCity}.
            </p>
          </div>
        </div>

        <div className="container city-main-container">
          <div className="row g-5">
            
            {/* --- LEFT COLUMN: EXPANDED CONTENT --- */}
            <div className="col-lg-8">
              <div className="dual-sticky-wrapper">
                
                <div className="premium-card">
                  <h2 className="font-outfit fw-bold h3 mb-4 text-dark">
                    Transforming Spaces in <span className="text-gradient">{displayCity}</span>
                  </h2>
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: safeDescription }} />
                </div>

                <div className="lazy-render">
                  <div className="premium-card bg-white border-0">
                    <h2 className="font-outfit fw-bold h3 mb-4 text-dark">Our Proven Design Process</h2>
                    <div className="process-step">
                      <div className="process-icon"><FaUser /></div>
                      <div>
                        <h4 className="font-outfit h5 fw-bold mb-1">1. Consultation & Ideation</h4>
                        <p className="text-muted font-poppins small mb-0">We meet at your {displayCity} property to understand your vision, lifestyle, and spatial requirements.</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="process-icon"><FaDraftingCompass /></div>
                      <div>
                        <h4 className="font-outfit h5 fw-bold mb-1">2. 3D Concept & Planning</h4>
                        <p className="text-muted font-poppins small mb-0">Our architects develop highly detailed 3D renders so you can walk through your new home before we build.</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="process-icon"><FaHardHat /></div>
                      <div>
                        <h4 className="font-outfit h5 fw-bold mb-1">3. Precision Execution</h4>
                        <p className="text-muted font-poppins small mb-0">Our in-house execution team brings the design to life with strict quality control and zero compromises.</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="process-icon"><FaHome /></div>
                      <div>
                        <h4 className="font-outfit h5 fw-bold mb-1">4. The Grand Handover</h4>
                        <p className="text-muted font-poppins small mb-0">Within 45 days, you step into a beautifully finished, fully functional luxury space. Welcome home.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lazy-render">
                  <div className="premium-card bg-transparent border-0 shadow-none px-0 py-0 mb-4">
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div className="trust-box">
                          <div className="trust-icon"><FaShieldAlt /></div>
                          <h4 className="font-outfit fw-bold h5">10-Year Warranty</h4>
                          <p className="text-muted font-poppins small mb-0">Complete peace of mind with India&apos;s only full-home warranty.</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="trust-box">
                          <div className="trust-icon"><FaGem /></div>
                          <h4 className="font-outfit fw-bold h5">146 Quality Checks</h4>
                          <p className="text-muted font-poppins small mb-0">Rigorous multi-point inspections ensuring flawless execution.</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="trust-box">
                          <div className="trust-icon"><FaClock /></div>
                          <h4 className="font-outfit fw-bold h5">45-Day Delivery</h4>
                          <p className="text-muted font-poppins small mb-0">Swift, on-time installation of kitchens, wardrobes & storage.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lazy-render">
                  <div className="premium-card" style={{ background: 'linear-gradient(to right, #ffffff, #fff9f5)' }}>
                    <h2 className="font-outfit fw-bold h3 mb-4 text-center">Celebrating Excellence</h2>
                    <div className="row align-items-center mt-4">
                      <div className="col-md-4 excellence-stat">
                        <FaTrophy size={40} className="text-warning mb-3" />
                        <h3 className="font-outfit fw-bold h2 mb-1">500+</h3>
                        <p className="font-poppins text-muted small fw-bold text-uppercase tracking-wider mb-0">Projects Delivered</p>
                      </div>
                      <div className="col-md-4 excellence-stat">
                        <FaStar size={40} color="#ff914d" className="mb-3" />
                        <h3 className="font-outfit fw-bold h2 mb-1">4.9/5</h3>
                        <p className="font-poppins text-muted small fw-bold text-uppercase tracking-wider mb-0">Client Ratings</p>
                      </div>
                      <div className="col-md-4 excellence-stat">
                        <FaAward size={40} color="#2b2b2b" className="mb-3" />
                        <h3 className="font-outfit fw-bold h2 mb-1">15+</h3>
                        <p className="font-poppins text-muted small fw-bold text-uppercase tracking-wider mb-0">Design Awards</p>
                      </div>
                    </div>
                  </div>
                </div>

                {faqs.length > 0 && (
                  <div className="lazy-render">
                    <div className="premium-card border-0 px-0">
                      <h2 className="font-outfit fw-bold h3 mb-4">Questions about {displayCity}?</h2>
                      <div className="accordion font-poppins" id={`accordion-faq-${pageData?.id}`}>
                        {faqs.map((faq, index) => (
                          <div className="accordion-item mb-3 border rounded-3" key={`faq-${index}`}>
                            <h2 className="accordion-header">
                              <button className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq-collapse${index}`} style={{ backgroundColor: '#f8f9fa' }}>
                                {faq.question}
                              </button>
                            </h2>
                            <div id={`faq-collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent={`#accordion-faq-${pageData?.id}`}>
                              <div className="accordion-body text-muted" style={{ whiteSpace: 'pre-line' }}>{faq.answer}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 🌟 NEW: BLOGS MOVED TO LEFT COLUMN BOTTOM */}
                {recentBlogs.length > 0 && (
                  <div className="lazy-render">
                    <div className="premium-card border-0 px-0 pt-0">
                      <h2 className="font-outfit fw-bold h3 mb-4">Design Inspiration & Ideas</h2>
                      <div className="row g-4 font-poppins">
                        {recentBlogs.map((blog, idx) => (
                          <div className="col-md-6" key={idx}>
                            <Link href={`/${blog.seo_content?.slug || `blog-detail?id=${blog.id}`}`} className="text-decoration-none">
                              <div className="d-flex align-items-center border p-3 rounded-4 bg-white blog-hover h-100 shadow-sm">
                                <img src={blog.image || "/images/default.jpg"} alt={blog.title} className="rounded" style={{ width: "80px", height: "80px", objectFit: "cover" }} loading="lazy" decoding="async" />
                                <div className="ms-3">
                                  <h6 className="text-dark fw-bold mb-1" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                                    {blog.title.length > 45 ? `${blog.title.substring(0, 45)}...` : blog.title}
                                  </h6>
                                  <small className="text-muted" style={{ color: '#ff914d', fontSize: '12px', fontWeight: '600' }}>READ ARTICLE <FaArrowRight size={10} className="ms-1"/></small>
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

            {/* --- RIGHT COLUMN: STICKY SIDEBAR --- */}
            <div className="col-lg-4">
              <div className="dual-sticky-wrapper">
                
                <div className="sidebar-cta shadow-lg">
                  <h4 className="font-outfit fw-bold mb-2">Book a Site Visit</h4>
                  <p className="font-poppins small text-white-50 mb-4">Our designers will visit your {displayCity} property for a consultation.</p>
                  <Link href="/contact" className="btn btn-light w-100 fw-bold font-poppins text-dark rounded-pill py-2">
                    Schedule Now <FaArrowRight className="ms-2 text-warning" />
                  </Link>
                </div>

                <div className="sidebar-widget" style={{ border: '2px solid #ff914d' }}>
                  <h4 className="widget-title text-center mx-auto" style={{ width: 'fit-content' }}>Contact Us</h4>
                  <form>
                    <div className="mb-3 position-relative">
                      <FaUser className="position-absolute text-muted" style={{ top: '16px', left: '15px' }} />
                      <input type="text" className="form-control form-control-modern ps-5" placeholder="Full Name" required />
                    </div>
                    <div className="mb-3 position-relative">
                      <FaPhoneAlt className="position-absolute text-muted" style={{ top: '16px', left: '15px' }} />
                      <input type="text" className="form-control form-control-modern ps-5" placeholder="Phone Number" required />
                    </div>
                    <div className="mb-4">
                      <textarea className="form-control form-control-modern" rows="3" placeholder="Tell us about your space..."></textarea>
                    </div>
                    <button type="button" className="btn w-100 fw-bold font-poppins text-white py-3 rounded-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #ff914d 0%, #ff5722 100%)', border: 'none' }}>
                      Request Consultation
                    </button>
                  </form>
                </div>

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
                    <FaWallet className="micro-trust-icon text-primary" />
                    <div>
                      <span className="d-block fw-bold text-dark" style={{ fontSize: '14px' }}>Easy EMI Options</span>
                      <span className="text-muted" style={{ fontSize: '12px' }}>Flexible payment plans.</span>
                    </div>
                  </div>
                  <div className="micro-trust-item">
                    <FaTools className="micro-trust-icon text-warning" />
                    <div>
                      <span className="d-block fw-bold text-dark" style={{ fontSize: '14px' }}>In-House Execution</span>
                      <span className="text-muted" style={{ fontSize: '12px' }}>No third-party contractors.</span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-widget lazy-render">
                  <h4 className="widget-title">Service Areas</h4>
                  <div className="d-flex flex-column font-poppins">
                    {Object.keys(cityUrlMap).map((c, idx) => {
                      const isActive = c === city;
                      return (
                        <Link key={idx} href={cityUrlMap[c]} className={`nav-city-link ${isActive ? 'active' : ''}`}>
                          <span className="d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2" size={14} opacity={0.7} />
                            <span className="text-capitalize">{c.replace('_', ' ')}</span>
                          </span>
                          <FaArrowRight size={12} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            🌟 3. NEW: NEARBY LOCATIONS CARDS 
        ========================================= */}
        {otherCities.length > 0 && (
          <div className="container mt-5 pt-4 lazy-render border-top border-light">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="font-outfit fw-bold text-dark">Explore Nearby Locations</h2>
                <p className="text-muted font-poppins mb-0">Discover our signature designs in other premium locations.</p>
              </div>
              <Link href="/services" className="d-none d-md-block text-decoration-none fw-bold font-poppins" style={{ color: '#ff914d' }}>
                View All Cities <FaArrowRight className="ms-1" />
              </Link>
            </div>
            
            <div className="row g-4 font-poppins">
              {otherCities.map((cityName, idx) => (
                <div className="col-lg-4 col-md-6" key={idx}>
                  <Link href={cityUrlMap[cityName]} className="text-decoration-none">
                    <div className="related-card bg-white position-relative">
                      <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                        <Image 
                          src="/images/wework_bgImage.jpg" // Fallback placeholder if actual city image isn't available
                          alt={`${cityName} Interior Design`} 
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                          loading="lazy"
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                        <div className="position-absolute bottom-0 start-0 p-4 w-100">
                          <h4 className="text-white fw-bold mb-0 text-capitalize d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2 text-warning" size={18} />
                            {cityName.replace('_', ' ')}
                          </h4>
                        </div>
                      </div>
                      <div className="p-4 d-flex justify-content-between align-items-center">
                        <span className="text-muted small fw-bold text-uppercase tracking-wider">Explore Services</span>
                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                          <FaArrowRight color="#ff914d" size={14} />
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