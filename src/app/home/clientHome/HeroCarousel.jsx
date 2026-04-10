"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroCarousel({ bannerData }) {
  const firstBanner = bannerData?.[0];
  const restBanners = bannerData?.slice(1, 3) || [];
  
  const [showRest, setShowRest] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0); // 🌟 FLASH FIX: Keeps track of the previous slide

  useEffect(() => {
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => setShowRest(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const activeBanners = showRest ? [firstBanner, ...restBanners] : [firstBanner];

  useEffect(() => {
    if (activeBanners.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((currentActive) => {
          setPrevIndex(currentActive);
          return (currentActive + 1) % activeBanners.length;
        });
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [activeBanners.length]);

  const nextSlide = () => {
    setActiveIndex((currentActive) => {
      setPrevIndex(currentActive);
      return (currentActive + 1) % activeBanners.length;
    });
  };

  const prevSlide = () => {
    setActiveIndex((currentActive) => {
      setPrevIndex(currentActive);
      return (currentActive - 1 + activeBanners.length) % activeBanners.length;
    });
  };

  if (!firstBanner) return null;

  return (
    <section className="position-relative">
      <div id="carouselExampleAutoplaying" className="carousel slide">
        
        <div 
          className="carousel-inner" 
          style={{ position: "relative", width: "100%", aspectRatio: "192/85", overflow: "hidden", backgroundColor: "#f0f0f0" }}
        >
          
          {activeBanners.map((banner, index) => {
            const isVideo = banner?.banner_image?.endsWith(".mp4");
            const isFirstSlide = index === 0;
            const isActive = index === activeIndex;
            const isPrev = index === prevIndex;

            return (
              <div 
                className="carousel-item" 
                key={index}
                style={{
                  // 🌟 FLASH FIX: The new slide fades in over the old slide. No background bleeding!
                  opacity: isActive ? 1 : (isPrev ? 1 : 0),
                  transition: isActive ? "opacity 0.8s ease-in-out" : "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "block", 
                  zIndex: isActive ? 2 : (isPrev ? 1 : 0),
                  pointerEvents: isActive ? "auto" : "none"
                }}
              >                
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  
                  {isVideo ? (
                    <video 
                      className="object-fit-cover home_video_banner" 
                      autoPlay
                      loop 
                      muted 
                      playsInline
                      preload={isFirstSlide ? "metadata" : "auto"}
                      poster={banner?.banner_image_poster || ""} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    >
                      <source src={banner?.banner_image} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={banner?.banner_image ?? "/images/home-banner-1.png"}
                      className="d-block carousel_img"
                      alt={banner?.title?.trim() || "High Creation Interior Design in Delhi NCR"} 
                      fill
                      priority={isFirstSlide} 
                      fetchPriority={isFirstSlide ? "high" : "auto"}
                      sizes="100vw"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  
                  <div className="pt-0 carousel-caption d-md-block" style={{ zIndex: 2 }}>
                    <div className="pb-0 mb-0 fw-lighter fs-3 home_subhead">{banner?.top_slogan}</div>
                    <div className="d-lg-flex">
                      <div>
                        {isFirstSlide ? (
                          <h1 className="letheading home_banner_heading">{banner?.title ?? "Best Interior Designers"}</h1>
                        ) : (
                          <h2 className="letheading home_banner_heading">{banner?.title ?? ""}</h2>
                        )}
                        <div className="font_stylish_home">{banner?.sub_title}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        
        {activeBanners.length > 1 && (
          <>
            {/* 🌟 CLICK FIX: Z-index pushed to 20 to pierce through the Enquire Now tab overlay! */}
            <button 
              className="carousel-control-prev" 
              type="button" 
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              style={{ zIndex: 20, pointerEvents: 'auto', cursor: 'pointer' }} 
              aria-label="Previous slide"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button 
              className="carousel-control-next" 
              type="button" 
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              style={{ zIndex: 20, pointerEvents: 'auto', cursor: 'pointer' }} 
              aria-label="Next slide"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </>
        )}
      </div>
      
      <div className="rotate_div container-fluid" style={{ zIndex: 4 }}>
        <div className="sssss ms-auto me-0">
          <a href="/contact" className="know_moress" aria-label="Enquire Now for Interior Design Services">Enquiry Now</a>
        </div>
      </div>
    </section>
  );
}