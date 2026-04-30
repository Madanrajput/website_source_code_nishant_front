"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function HeroCarousel({ bannerData }) {
  // Strictly limit to 3 slides total
  const firstBanner = bannerData?.[0];
  const restBanners = bannerData?.slice(1, 3) || [];

  const [showRest, setShowRest] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 🌟 FIXED: Smooth sliding motion with 5-second explicitly set intervals
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

  // Filter out any potential undefined/null banners
  const activeBanners = (showRest ? [firstBanner, ...restBanners] : [firstBanner]).filter(Boolean);

  // Inform Embla when we add the remaining slides to the DOM so it loops properly
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, activeBanners.length]);

  if (!firstBanner) return null;

  return (
    <section className="position-relative w-100" style={{ backgroundColor: '#f0f0f0' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .embla { overflow: hidden; width: 100%; aspect-ratio: 16/9; }
        @media (min-width: 768px) { .embla { aspect-ratio: 192/85; } }
        .embla__container { display: flex; height: 100%; }
        .embla__slide { flex: 0 0 100%; min-width: 0; position: relative; }
        .banner-media { object-fit: cover; width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
        
        .banner-overlay { 
            position: absolute; 
            z-index: 10; 
            inset: 0; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            padding: 5%; 
            pointer-events: none;
            text-shadow: 0px 2px 10px rgba(0,0,0,0.6); 
        }

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
            const isVideo = banner?.banner_image?.endsWith(".mp4");
            const isFirstSlide = index === 0;

            {/* 🌟 FIXED: Media is permanently rendered so Embla creates perfect clones for a seamless loop */}
            return (
              <div className="embla__slide" key={banner.id || index}>
                {isVideo ? (
                  <video
                    className="banner-media"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster={banner?.banner_image_poster || ""}
                  >
                    <source src={banner?.banner_image} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={banner?.banner_image ?? "/images/home-banner-1.png"}
                    className="banner-media"
                    alt={banner?.title?.trim() || "High Creation Interior"}
                    fill
                    priority={true} // Prioritize rendering so the loop doesn't snap to an unloaded image
                    sizes="100vw"
                  />
                )}

                <div className="banner-overlay text-white carousel-caption d-md-block text-start pt-0">
                  <div className="fw-lighter fs-3 home_subhead">{banner?.top_slogan}</div>
                  <div className="d-lg-flex">
                    <div>
                      {isFirstSlide ? (
                        <h1 className="letheading home_banner_heading">{banner?.title}</h1>
                      ) : (
                        <h2 className="letheading home_banner_heading">{banner?.title}</h2>
                      )}
                      <div className="font_stylish_home">{banner?.sub_title}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isMounted && activeBanners.length > 1 && (
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