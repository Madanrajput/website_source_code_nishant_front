import dynamic from "next/dynamic";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { 
  FaShieldAlt, FaClock, FaCheckCircle, FaHome, 
  FaMapMarkerAlt, FaGem, FaUser, FaTools, 
  FaStar, FaAward, FaTrophy
} from "react-icons/fa";

const ICON_MAP = {
  FaShieldAlt, FaClock, FaCheckCircle, FaHome, 
  FaMapMarkerAlt, FaGem, FaUser, FaTools, 
  FaStar, FaAward, FaTrophy
};
import React, { Fragment } from "react"; 

// --- CLIENT IMPORTS ---
import LazySection from "./clientHome/LazySection";
import ContactForm from "./clientHome/ContactForm";

// --- SERVER IMPORTS ---
import RowImage from "../components/RowImage";
import Card from "../components/Card";
import VideoCardHome from "../components/VideoCardHome";
import BgImageCard from "../components/BgImageCard";
import RoomOfice from "../components/RoomOfice";
import HomeAbout3D from "../components/HomeAbout3D";
import EstimateCalculator from "./clientHome/EstimateCalculator";

// --- DYNAMIC IMPORTS ---
const Blogs = dynamic(() => import("../components/Blogs"));

const SliderCard = dynamic(() => import("../components/SliderCard"), { 
  ssr: false, 
  loading: () => <div style={{ height: "400px", background: "#f8f9fa", width: "100%" }} /> 
});

const VideoTestimonialSlider = dynamic(() => import("../components/VideoTestimonialSlider"), { 
  ssr: false,
  loading: () => <div style={{ height: "400px", background: "#f8f9fa", width: "100%" }} /> 
});

const CounterRow = dynamic(() => import("../components/CounterRow"), { 
  ssr: false,
  loading: () => <div style={{ height: "300px", background: "#f8f9fa", width: "100%" }} /> 
});

// --- DATA FETCHING WITH FETCH ---
async function getRemainingData() {
  const baseURL = process.env.NODE_ENV === "development" 
      ? process.env.NEXT_PUBLIC_API_DEV_URL 
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchData = async (endpoint) => {
      try {
          const res = await fetch(`${baseURL}${endpoint}`, { next: { revalidate: 60 } });
          if (!res.ok) return [];
          const text = await res.text();
          return text ? JSON.parse(text) : [];
      } catch (e) {
          console.error(`Error fetching ${endpoint}:`, e);
          return [];
      }
  };

  try {
    const [designIdea, h3d_gallery, contentData, blogsData, whyChooseUsRaw,estimateBannerRaw , estimateCardsRaw] = await Promise.all([
      fetchData("/cms-parent-child/designer_choice"),
      fetchData("/cms-parent-child/h3d_gallery"),
      fetchData("/cms-content/home_page_content_what_we_are"),
      fetchData("/cms-blog"),
      fetchData("/cms-content/home_page_content_why_choose_us"),
      fetchData("/cms-content/home_page_estimate_banner"),
      fetchData("/cms-content/home_page_estimate_cards") 
    ]);
    
    let whyChooseUsData = [];
    if (whyChooseUsRaw) {
      const record = Array.isArray(whyChooseUsRaw) ? whyChooseUsRaw[0] : whyChooseUsRaw;
      whyChooseUsData = record?.json_content || [];
    }
    
    // Process Estimate Banner Data
    let estimateBannerData = null;
    if (estimateBannerRaw) {
        const record = Array.isArray(estimateBannerRaw) ? estimateBannerRaw[0] : estimateBannerRaw;
        estimateBannerData = record?.json_content;
    }

    // Process Estimate Cards Data
    let estimateCardsData = [];
    if (estimateCardsRaw) {
        const record = Array.isArray(estimateCardsRaw) ? estimateCardsRaw[0] : estimateCardsRaw;
        estimateCardsData = record?.json_content || [];
    }

    return {
      designIdea: designIdea || [],
      h3d_gallery: h3d_gallery || [],
      content: contentData || [], 
      blogs: Array.isArray(blogsData) ? blogsData.slice(0, 3) : [],
      whyChooseUsData,
      estimateBannerData,
      estimateCardsData
    };
  } catch (err) {
    console.error("Server Fetch Error (Remaining Data):", err);
    return { designIdea: [], h3d_gallery: [], content: [], blogs: [], whyChooseUsData: [], estimateBannerData: null };
  }
}

const formatDate = (dateString) => {
  if (!dateString) return "Date not available";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default async function HomeContent() {
  const { designIdea, h3d_gallery, content, blogs, whyChooseUsData, estimateBannerData,estimateCardsData } = await getRemainingData();

  const safeEstimateCards = Array.isArray(estimateCardsData) ? estimateCardsData : [];
  // Sort Descending (Newest First)
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);
  const staticRecords = sortedDesignIdea.slice(-5);

  const workProcessConfig = [
    {
      id: 1, contentIdx: 20, number: "01",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0", boxClass: "box1",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box2",
    },
    {
      id: 2, contentIdx: 19, number: "02",
      col1Class: "col-lg-2 col-md-3 col-6 ps-lg-3 pe-0", boxClass: "box_2",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box2_data",
    },
    {
      id: 3, contentIdx: 18, number: "03",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3", boxClass: "box_3",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box3_data",
    },
    {
      id: 4, contentIdx: 17, number: "04",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3", boxClass: "box4 box_3",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0 mt-lg-3", dataBoxClass: "box4_data",
    },
    {
      id: 5, contentIdx: 16, number: "05",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3", boxClass: "box5 box_3",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0 mt-lg-3", dataBoxClass: "box5_data",
    },
  ];

  const defaultWhyChooseUs = [
    { title: "Lifetime warranty¹", icon: "FaShieldAlt" },
    { title: "45-day move-in guarantee²", icon: "FaClock" },
    { title: "146 quality checks", icon: "FaCheckCircle" },
  ];
  
  const activeWhyChooseUsData =
    Array.isArray(whyChooseUsData) && whyChooseUsData.length > 0
      ? whyChooseUsData
      : defaultWhyChooseUs;


  // 🌟 Estimate Section Configuration
  const activeEstimateBanner = estimateBannerData || {
    is_active: true,
    heading: "Calculate the cost of your",
    rotating_words: "Kitchen, Wardrobe, Full Home, Living Room",
    description: "Get a personalized, transparent estimate for your interior project in just a few clicks. No hidden costs.",
    button_text: "Get Free Estimate",
  };

  const activeEstimateCards = safeEstimateCards.filter(card => card?.is_active !== false); 
  const finalMarqueeCards = activeEstimateCards.length > 0 
    ? activeEstimateCards 
    : h3d_gallery.filter(item => !item.child_content?.title?.toLowerCase().includes("1 bhk")).slice(0, 5);

  return (
    <>
      {/* --- INJECTED CSS FOR MOBILE HORIZONTAL SLIDERS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .mobile-scroll-row {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            padding-bottom: 20px !important;
            margin-bottom: 10px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none; 
            justify-content: flex-start !important; 
          }
          .mobile-scroll-row::-webkit-scrollbar { display: none; }
          .mobile-scroll-row > [class*="col-"] {
            flex: 0 0 85% !important;
            max-width: 85% !important;
            scroll-snap-align: center;
          }
          .mobile-process-row {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            padding-bottom: 20px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 15px;
            margin-left: 0;
            margin-right: 0;
            justify-content: flex-start !important; 
          }
          .mobile-process-row::-webkit-scrollbar { display: none; }
          .process-mobile-wrap {
            flex: 0 0 85% !important;
            scroll-snap-align: center;
            display: flex;
            flex-direction: column; 
          }
          .process-mobile-wrap > div {
            width: 100% !important;
            max-width: 100% !important;
            flex: unset !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
        @media (min-width: 769px) {
          .process-mobile-wrap { display: contents; }
        }
      `}} />

      {/* 2. About Us */}
      <HomeAbout3D />

      {/* 3. Explore What We Offer */}
      <div className="my-5 oofer_card">
          <div className="container">
            <h2 className="pb-3 font_about"><span className="font_stylish">Explore</span> What we Offer</h2>
            <div className="mx-0 row g-4 mobile-scroll-row">
              {[23, 24, 22, 21].map((index) => (
                <div className="col-lg-3 col-md-6 col-12" key={index}>
                  <Card 
                    cardNameALl="cardoffer" 
                    imgSrc={content[index]?.json_content?.image} 
                    imgAlt={"room"} 
                    imgClass={"offerimg"} 
                    titleCard={content[index]?.json_content?.title} 
                    descriptionCard={content[index]?.json_content?.description} 
                    buttonTextCard={"Know More"} 
                    linkCard={content[index]?.json_content?.designation} 
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 text-end">
              <a href="/what-we-offer" className="pe-2 know_more fs-6">View More <MdKeyboardArrowRight className="fs-4" /> </a>
            </div>
          </div>
        </div>

      {/* 4. The Way We Work */}
      <div className="way_wework">
          <div className="container">
            <h3 className="text-center font_about">The Way <span className="font_stylish">We Work</span></h3>
            <div className="mx-0 row justify-content-center g-lg-0 mobile-process-row">
              {workProcessConfig.map((step) => (
                <div className="process-mobile-wrap" key={step.id}>
                  <div className={step.col1Class}>
                    <div className={step.boxClass}>
                      <h3 className="box_heading">{step.number}</h3>
                    </div>
                  </div>
                  <div className={step.col2Class}>
                    <div className={step.dataBoxClass}>
                      <div className="px-3 px-lg-4 py-4">
                        {content[step.contentIdx]?.json_content?.image && (
                          <Image 
                            src={content[step.contentIdx]?.json_content?.image} 
                            width={60} 
                            height={60} 
                            alt="icon" 
                            style={{ height: 'auto' }}
                          />
                        )}
                        <h4 className="py-2 text-white">{content[step.contentIdx]?.json_content?.title}</h4>
                        <p className="box_para">{content[step.contentIdx]?.json_content?.description}</p>
                        <div className="text-lg-center">
                          <a className="know_mores" href={content[step.contentIdx]?.json_content?.designation}>Know More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* 5. Why Choose Us (Infinite Marquee) */}
      <LazySection placeholderHeight="300px">
        <section className="my-5 py-5 overflow-hidden" style={{ backgroundColor: "#fafafa" }}>
          
          <div className="container mb-5">
            <h2 className="text-center font_about fw-bold mb-0">
              Why <span className="font_stylish" style={{ color: "#ff914d" }}>choose us</span>
            </h2>
          </div>

          <div className="marquee-container position-relative w-100" style={{ overflow: "hidden" }}>
            <div className="marquee-track d-flex align-items-center gap-4">

              {[...activeWhyChooseUsData, ...activeWhyChooseUsData].map((item, idx) => {
                const IconComponent = ICON_MAP[item.icon] || FaCheckCircle;

                return (
                  <div key={idx} className="marquee-card bg-white p-4 rounded-4 shadow-sm text-center flex-shrink-0"
                       style={{ width: "220px", height: "180px" }}>
                    
                    <div className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                         style={{ width: "64px", height: "64px", backgroundColor: "#fff4ed", borderRadius: "50%" }}>
                      <IconComponent size={32} color="#ff914d" />
                    </div>

                    <p className="fw-bold mt-2 font-poppins text-dark" style={{ fontSize: "15px" }}>{item.title}</p>
                    {item.description && <p className="small text-muted mb-0">{item.description}</p>}
                  </div>
                );
              })}

            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .marquee-container {
              mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
              padding: 1rem 0; 
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: scrollMarquee 30s linear infinite;
            }
            .marquee-track:hover { animation-play-state: paused; }
            .marquee-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
            .marquee-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
            }
            @keyframes scrollMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}} />
        </section>
      </LazySection>

      {/* Design Idea */}
      <LazySection placeholderHeight="700px">
        <div className="pt-5 my-5 designidea" style={{ backgroundImage: `url(${content[1]?.json_content?.image})` }}>
          <div className="container">
            <h2 className="pb-4 text-center font_about">
              {content[1]?.json_content?.title} <span className="font_stylish">{content[1]?.json_content?.description}</span>
            </h2>
            
            <div className="row g-4 mobile-scroll-row">
              <div className="col-lg-6 col-md-6 col-12">
                <RoomOfice cardRoomOffice={"card card_room border-0 h-100"} badge_circle="badge_circleblack" arrowIcon="images/arrow_icon.png" altArrow="arrow" width="80" imageRoom_Office={content[15]?.json_content?.image} roomImg="residential_imgs" altImage="room" cardBody="card_body office_card_body" cardTitle={content[15]?.json_content?.title} cardText={content[15]?.json_content?.description} btnText="Know More " btnLink={content[15]?.json_content?.designation} btnClass={"btn_knowmoreblack"} />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <RoomOfice cardRoomOffice={"card card_room border-0 h-100"} badge_circle="badge_circleblack" arrowIcon="images/arrow_icon.png" altArrow="arrow" width="80" imageRoom_Office={content[14]?.json_content?.image} roomImg="residential_imgs" altImage="room" cardBody="card_body office_card_body" cardTitle={content[14]?.json_content?.title} cardText={content[14]?.json_content?.description} btnText="Know More " btnLink={content[14]?.json_content?.designation} btnClass={"btn_knowmoreblack"} />
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Ready To Go */}
      <LazySection placeholderHeight="400px">
        <section className="my-5">
          <div className="container">
            <div className="mx-0 mb-4 row justify-content-center text-center">
              <div className="col-12 d-flex flex-column align-items-center">
                <span className="font_stylish" style={{ marginBottom: "-15px", zIndex: 1 }}>
                  Ready To Go Designs
                </span>
                <h2 className="h3 font_about position-relative" style={{ zIndex: 2 }}>
                  with Our Exclusive Design Choices
                </h2>
              </div>
            </div>
            <SliderCard />
          </div>
        </section>
      </LazySection>

      {/* Designer Choice */}
      <LazySection placeholderHeight="800px">
        <div className="my-5 bgsectionroom">
          <div className="container ">
            <div className="row position-relative mx-0">
              <span className="pb-0 mb-0 font_stylish d-grid ms-lg-5 designer">Designer&apos;s Choice:</span>
              <h3 className="pb-4 w-auto font_about excluisive_home_heading">Exclusive Design Specials</h3>
            </div>
            <div className="mt-4 row g-4 mx-0 mobile-scroll-row">
              {staticRecords.map((record, i) => (
                <div className={`col-lg-${i === 0 || i === 3 ? '5' : i === 4 ? '12' : '7'} col-md-6 col-12`} key={record.id}>
                  <BgImageCard style={{ backgroundImage: `url(${record?.child_content?.image})` }} cardLinkTag={`/designer-choice/gallery?id=${record?.id}`} designerCardBgDiv={"designercard designercardimg1"} titleBgImage={record?.child_content?.title} descriptionBg={record?.child_content?.description} />
                </div>
              ))}
            </div>
            <div className="mt-4 col-lg-12 text-end pe-3">
               <a href="/designer-choice" className="know_more">Know More</a>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Celebrating Excellence */}
      <LazySection placeholderHeight="300px">
        <div className="my-5 celebereting">
          <div className="container">
            <div className="mx-0 row">
              <h3 className="text-center"><span className="font_stylish">Celebrating Excellence:</span></h3>
              <CounterRow 
                ImgCounter={content[13]?.json_content?.image} 
                ImgCounterClass="w-100" 
                imgAltCounter={content[13]?.json_content?.title} 
                divClassCounter="text-end" 
                
                counterStart="0" 
                counterEnd={content[12]?.json_content?.title} 
                label1={content[12]?.json_content?.designation} // 🌟 Dynamic Label 1
                counterDuration="5" 
                counterSuffix="" 
                
                counterStart2="0" 
                counterEnd2={content[11]?.json_content?.title} 
                label2={content[11]?.json_content?.designation} // 🌟 Dynamic Label 2
                counterDuration2="5" 
                counterSuffix2="" 
                
                counterStart3="0" 
                counterEnd3={content[10]?.json_content?.title} 
                label3={content[10]?.json_content?.designation} // 🌟 Dynamic Label 3
                counterDuration3="5" 
                counterSuffix3="" 
                
                counterStart4="0" 
                counterEnd4={content[9]?.json_content?.title} 
                label4={content[9]?.json_content?.designation} // 🌟 Dynamic Label 4
                counterDuration4="5" 
                
                descriptionCounter={content[13]?.json_content?.description} 
                textAboutBtnCounter="View Our Projects" 
                btnLink="/residential-projects" 
                textAboutBtnCLass="know_more me-lg-4" 
                textAboutBtnCounter2="All Services" 
                textAboutBtnCLass2="btn_services" 
                btnLink2={content[13]?.json_content?.designation} 
              />
            </div>
          </div>
        </div>
      </LazySection>

      {/* 🌟 UPGRADED: Let's Save Time (Now a Grid Layout) */}
      <LazySection placeholderHeight="600px">
        <div className="savedesign my-5">
          <div className="container">
            <div className="mb-5 position-relative text-center">
              <h3 className="mb-0"><span className="font_stylish">{content[8]?.json_content?.title}</span></h3>
              <h3 className="pb-0 pb-lg-4 font_about mt-0 designs_lets">{content[8]?.json_content?.description}</h3>
            </div>
            
            {/* Grid Layout (3 on top, 2 on bottom on Desktop) */}
            {/* Added mobile-scroll-row so it stays consistent on mobile devices */}
            <div className="row justify-content-center g-4 mx-0 mobile-scroll-row">
              {finalMarqueeCards.slice(0, 5).map((card, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  {/* Container wrapper to ensure cards do not stretch uncontrollably */}
                  <div className="mx-auto" style={{ maxWidth: "380px", height: "100%" }}>
                    <Card 
                      cardLinkName={card?.link || `/estimator-for-home`} 
                      cardNameALl="cardoffer shadow-sm border-0 bg-white h-100 d-flex flex-column" 
                      imgSrc={card?.image || card?.child_content?.image} 
                      imgAlt={card?.title || card?.child_content?.title} 
                      imgClass={"bhkimg rounded-top-3 w-100 object-fit-cover"} 
                      titleCard={card?.title || card?.child_content?.title} 
                      titleClass="text-center mb-0 pb-3 pt-3 fw-bold fs-6 text-dark flex-grow-1" 
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </LazySection>

      {/* 🌟 DYNAMIC CMS ESTIMATE SECTION */}
      {activeEstimateBanner.is_active !== false && (
        <LazySection placeholderHeight="600px">
          <section className="my-5 py-5" style={{ backgroundColor: "#fff9f9", borderTop: "1px solid #ffeeee", borderBottom: "1px solid #ffeeee" }}>
            <EstimateCalculator cmsData={activeEstimateBanner} />
          </section>
        </LazySection>
      )}

      {/* Blogs */}
      <LazySection placeholderHeight="500px">
        <div className="my-5 blogs_wrapper">
          <div className="container">
            <h3 className="pb-2 pb-lg-4 text-center font_about">Blogs</h3>
            <div className="row g-2 g-lg-4 justify-content-center mx-1 mobile-scroll-row">
              {blogs.map((blog, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <Blogs 
                    blogCard="blog_cards" 
                    imgSrcBlog={blog?.image || "/images/default.jpg"} 
                    blogImglink={`/${blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`}`} 
                    blogImgALt={blog?.title || "Blog Image"} 
                    blogClassImg="card-img-top rounded-4 object-fit-cover" 
                    blogdate={blog?.published_on ? formatDate(blog.published_on) : "Date not available"} 
                    blogTitle={blog?.title || "Untitled Blog"} 
                    blogDescription={blog?.description || "No description available"} 
                    buttonBlog="Continue Reading" 
                    blogBtnHref={`/${blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`}`} 
                    writer_name={blog?.writer_name || "High Creation"} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LazySection>

      <hr />
      
      {/* Testimonials */}
      <LazySection placeholderHeight="400px">
        <section className="my-5">
          <h3 className="text-center font_stylish">What People Say</h3>
          <VideoTestimonialSlider />
        </section>
      </LazySection>
      
      <hr />

      {/* Contact Form */}
      <LazySection placeholderHeight="600px">
         <ContactForm mapSrc={content[3]?.json_content?.description} />
      </LazySection>

      <hr />
    </>
  );
}