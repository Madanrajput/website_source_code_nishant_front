"use client"; 
import { useState, useEffect, useRef } from "react";
import { IoIosCall } from "react-icons/io";
import Toggle from "../components/Toggle";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleDropdown = (e, menuName) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  useEffect(() => {
    window.addEventListener('toggleMobileMenu', toggleMenu);
    return () => window.removeEventListener('toggleMobileMenu', toggleMenu);
  }, []);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, []);

  return (
    <>
      <div className="hedaer_wrapper fixed-top bg-white" ref={navRef}>
        <div className="px-3 container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            
            {/* Added w-100 to nav so it takes full available space for proper centering */}
            <nav className="navbar navbar-expand-lg p-0 w-100">
              <div className="container-fluid p-0">
                <a className="navbar-brand me-lg-3 me-0" href="/" aria-label="Home">
                  <Image
                    src="/images/new_hc_logo.png"
                    width={90}
                    height={90}
                    alt="High Creation Interior Logo"
                    className="p-2"
                    priority
                    style={{ width: '90px', height: '90px', objectFit: 'contain' }}
                  />
                </a>
                
                <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
                  {/* CHANGED THIS LINE: Used mx-auto and removed ms-0 */}
                  <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
                    
                    {/* Design Ideas */}
                    <li className={`nav-item dropdown ${activeDropdown === 'design' ? 'show' : ''}`}>
                      <a className="nav-link dropdown-toggle" href="#" onClick={(e) => handleDropdown(e, 'design')} aria-expanded={activeDropdown === 'design'}>
                        Design Ideas
                      </a>
                      <ul className={`dropdown-menu ${activeDropdown === 'design' ? 'show' : ''}`}>
                        <li><a className="dropdown-item" href="/design-idea/">Design Gallery</a></li>
                        <li><a className="dropdown-item" href="/product/">Product</a></li>
                      </ul>
                    </li>

                    {/* Portfolio */}
                    <li className={`nav-item dropdown ${activeDropdown === 'portfolio' ? 'show' : ''}`}>
                      <a className="nav-link dropdown-toggle" href="#" onClick={(e) => handleDropdown(e, 'portfolio')} aria-expanded={activeDropdown === 'portfolio'}>
                        Portfolio
                      </a>
                      <ul className={`dropdown-menu ${activeDropdown === 'portfolio' ? 'show' : ''}`}>
                        <li><a className="dropdown-item" href="/residential-projects/">Residential Projects</a></li>
                        <li><a className="dropdown-item" href="/luxury-projects/">Luxury Projects</a></li>
                      </ul>
                    </li>

                    {/* Experience Center */}
                    <li className={`nav-item dropdown ${activeDropdown === 'experience' ? 'show' : ''}`}>
                      <a className="nav-link dropdown-toggle" href="#" onClick={(e) => handleDropdown(e, 'experience')} aria-expanded={activeDropdown === 'experience'}>
                       Experience Center
                      </a>
                      <ul className={`dropdown-menu ${activeDropdown === 'experience' ? 'show' : ''}`}>
                        <li><a className="dropdown-item" href="/experience-center/">Experience Center Noida</a></li>
                        <li><a className="dropdown-item" href="/experience-center-gurugram/">Experience Center Gurugram</a></li>
                        <li><a className="dropdown-item" href="/experience-center-faridabad/">Experience Center Faridabad</a></li>
                      </ul>
                    </li>

                    {/* Exclusive Design */}
                    <li className={`nav-item dropdown ${activeDropdown === 'exclusive' ? 'show' : ''}`}>
                      <a className="nav-link dropdown-toggle" href="#" onClick={(e) => handleDropdown(e, 'exclusive')} aria-expanded={activeDropdown === 'exclusive'}>
                        Exclusive Design
                      </a>
                      <ul className={`dropdown-menu ${activeDropdown === 'exclusive' ? 'show' : ''}`}>
                        <li><a className="dropdown-item" href="/ready-togo-design/">Ready To Go Design</a></li>
                        <li><a className="dropdown-item" href="/wallpaper/">Wallpapers</a></li>
                        <li><a className="dropdown-item" href="/spacesaving-furniture/">Space-Saving Furniture</a></li>
                        <li><a className="dropdown-item" href="/sustainable-furniture/">Sustainable Furniture</a></li>
                        <li><a className="dropdown-item" href="/furniture/">Furniture</a></li>
                      </ul>
                    </li>

                    {/* Services */}
                    <li className={`nav-item dropdown ${activeDropdown === 'services' ? 'show' : ''}`}>
                      <a className="nav-link dropdown-toggle" href="#" onClick={(e) => handleDropdown(e, 'services')} aria-expanded={activeDropdown === 'services'}>
                        Services
                      </a>
                      <ul className={`dropdown-menu ${activeDropdown === 'services' ? 'show' : ''}`}>
                        <li><a className="dropdown-item" href="/interior-designers-in-noida">Interior Designers In Noida</a></li>
                        <li><a className="dropdown-item" href="/interior-designers-in-ghaziabad">Interior Designers in Ghaziabad</a></li>
                        <li><a className="dropdown-item" href="/interior-designers-in-greater-noida">Interior Designers in Greater Noida</a></li>
                        <li><a className="dropdown-item" href="/interior-designers-in-delhi">Interior Designers in Delhi</a></li>
                        <li><a className="dropdown-item" href="/interior-designers-in-dwarka">Interior Designers in Dwarka</a></li>
                        <li><a className="dropdown-item" href="/interior-designers-in-faridabad">Interior Designers in Faridabad</a></li>
                        <li><a className="dropdown-item" href="/interior-designers-in-gurgaon">Interior Designers in Gurugram</a></li>
                        <li><a className="dropdown-item" href="/interior-designers-in-manesar">Interior Designers In Manesar</a></li>
                        <li><a className="dropdown-item" href="/interior-designer-in-sohna-gurgaon">Interior Designers in Sohna</a></li>
                      </ul>
                    </li>

                    {/* 🌟 NEW: "More" Dropdown (Replaces standalone Contact Us) */}
                    <li className={`nav-item dropdown ${activeDropdown === 'more' ? 'show' : ''}`}>
                      <a 
                        className="nav-link dropdown-toggle" 
                        href="#" 
                        onClick={(e) => handleDropdown(e, 'more')} 
                        aria-expanded={activeDropdown === 'more'}
                      >
                        More
                      </a>
                      <ul className={`dropdown-menu dropdown-menu-end shadow-sm border-0 ${activeDropdown === 'more' ? 'show' : ''}`} style={{ minWidth: '180px' }}>
                        <li><a className="dropdown-item py-2" href="/about-us/">About Us</a></li>
                        <li><a className="dropdown-item py-2" href="/how-its-works/">How It Works</a></li>
                        <li><a className="dropdown-item py-2" href="/services/">Services</a></li>
                        <li><a className="dropdown-item py-2" href="/team/">Team</a></li>
                        <li><a className="dropdown-item py-2" href="/contact/">Contact Us</a></li>
                        <li><a className="dropdown-item py-2" href="/blog/">Blogs</a></li>
                        <li><a className="dropdown-item py-2" href="/award-gallery/">Awards Gallery</a></li>
                      </ul>
                    </li>

                  </ul>
                </div>
              </div>
            </nav>
            
            <div className="d-flex align-items-center">
              <div className="d-none d-lg-block ms-3">
                <a href="/estimator-for-home" className="get_btn text-nowrap">
                  Get Estimate <IoIosCall className="callicon" />
                </a>
              </div>
              {/* <div>
                <Toggle />
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;