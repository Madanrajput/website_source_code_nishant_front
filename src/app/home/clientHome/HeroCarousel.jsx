"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function HeroCarousel({ bannerData }) {
  const [showRest, setShowRest] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Smooth sliding motion with 5-second explicitly set intervals
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 60 }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Load remaining slides on desktop after 2.5s to optimize Largest Contentful Paint
  useEffect(() => {
    setIsMounted(true);
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => setShowRest(true), 2500);
      return () => clearTimeout(timer);
    } else {
      setShowRest(true);
    }
  }, []);

  // Filter out undefined banners and dynamically render all available slides
  const activeBanners = (showRest ? bannerData : bannerData?.slice(0, 1) || []).filter(Boolean);

  // Inform Embla when we add the remaining slides to the DOM so it loops properly
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, activeBanners.length]);

  if (!bannerData || bannerData.length === 0) return null;

  return (
    <section className="position-relative w-100" style={{ backgroundColor: '#f0f0f0' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .embla { overflow: hidden; width: 100%; aspect-ratio: 16/9; }
        @media (min-width: 768px) { .embla { aspect-ratio: 192/85; } }
        .embla__container { display: flex; height: 100%; }
        .embla__slide { flex: 0 0 100%; min-width: 0; position: relative; }
        .banner-media { object-fit: cover; width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
        
        /* 🌟 UPGRADED OVERLAY: Much softer bottom gradient */
        .banner-overlay { 
            position: absolute; 
            z-index: 10; 
            inset: 0; 
            display: flex; 
            flex-direction: column; 
            justify-content: flex-end; 
            align-items: center;       
            padding-bottom: 6%;        
            pointer-events: none;
            /* Changed from 0.85 black to 0.4 black for a brighter feel */
            background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 100%);
            text-align: center;
        }
        
        .banner-overlay * {
            pointer-events: auto; 
        }

        .banner-content-wrapper {
            max-width: 900px; 
            width: 90%;
            padding: 0 15px;
        }

        /* 🌟 MODERN BUTTON STYLING */
        .banner-btn {
            background-color: #ff914d;
            border: none;
            box-shadow: 0 4px 15px rgba(255, 145, 77, 0.4);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #ffffff !important; /* Force white text on button */
        }
        .banner-btn:hover {
            background-color: #e67d3c;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 145, 77, 0.6);
            color: #ffffff !important;
        }

        /* Navigation Arrows */
        .embla__nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 20;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .embla__nav-btn:hover { 
            background: rgba(255, 145, 77, 0.9); 
            border-color: #ff914d; 
            transform: translateY(-50%) scale(1.1);
        }
        .embla__nav-btn.prev { left: 20px; }
        .embla__nav-btn.next { right: 20px; }
        .embla__nav-icon { width: 24px; height: 24px; fill: currentColor; }
      `}} />

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {activeBanners.map((banner, index) => {
            const isVideo = banner?.banner_image?.match(/\.(mp4|webm|ogg)$/i);
            const isFirstSlide = index === 0;

            return (
              <div className="embla__slide" key={banner.id || index}>
                {isVideo ? (
                  <video
                    className="banner-media"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload={isFirstSlide ? "auto" : "metadata"}
                    poster={banner?.banner_image_poster || ""}
                  >
                    <source src={banner?.banner_image} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={banner?.banner_image ?? "/images/home-banner-1.png"}
                    className="banner-media"
                    alt={banner?.title?.trim() || "High Creation Interior Banner"}
                    fill
                    priority={isFirstSlide}       
                    fetchPriority={isFirstSlide ? "high" : "auto"} 
                    quality={isFirstSlide ? 90 : 75} 
                    sizes="(max-width: 768px) 100vw, 100vw"
                  />
                )}

                <div className="banner-overlay text-white">
                  <div className="banner-content-wrapper">
                    {banner?.top_slogan && (
                       <div className="fw-lighter fs-4 mb-2 text-uppercase" style={{ letterSpacing: '2px', textShadow: '0 2px 8px rgba(0,0,0,0.2)', color: '#ffffff' }}>
                         {banner.top_slogan}
                       </div>
                    )}
                    
                    {/* Replaced heavy text-shadow with a subtle soft drop shadow and enforced white color */}
                    {isFirstSlide ? (
                      <h1 className="letheading home_banner_heading fw-bold mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#ffffff' }}>
                        {banner?.title}
                      </h1>
                    ) : (
                      <h2 className="letheading home_banner_heading fw-bold mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#ffffff' }}>
                        {banner?.title}
                      </h2>
                    )}
                    
                    {banner?.sub_title && (
                       <div className="font_stylish_home mb-2 fs-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#ffffff' }}>
                         {banner.sub_title}
                       </div>
                    )}
                    
                    {/* Enforced white color and kept minimal shadow for readability */}
                    {banner?.description && (
                       <p className="fs-5 mb-4 mx-auto" style={{ maxWidth: '700px', textShadow: '0 1px 4px rgba(0,0,0,0.3)', color: '#ffffff' }}>
                         {banner.description}
                       </p>
                    )}
                    
                    {banner?.button_text && banner?.button_link && (
                       <div className="mt-3 mb-2">
                         <Link href={banner.button_link} className="btn btn-primary rounded-pill px-5 py-3 fs-5 fw-bold banner-btn">
                           {banner.button_text}
                         </Link>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isMounted && bannerData.length > 1 && (
        <>
          <button className="embla__nav-btn prev" onClick={scrollPrev} aria-label="Previous slide">
            <svg className="embla__nav-icon" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button className="embla__nav-btn next" onClick={scrollNext} aria-label="Next slide">
            <svg className="embla__nav-icon" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </>
      )}
    </section>
  );
}