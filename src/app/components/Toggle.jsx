"use client";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import api from "@/utils/api";

const Toggle = () => {
  const [lookMenu, setLookMenu] = useState([]);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    setLoading(true);
    const fetchLookMenu = async () => {
      try {
        const response = await api.get("/look-menu");
        setLookMenu(response.data); 
      } catch (err) {
        console.error("Error fetching design idea:", err);
        setError("Failed to load design ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLookMenu();
  }, []);

  return (
    <div>
      {/* 🌟 STYLING: Injected Custom CSS for premium hover effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        .menu-toggle-btn {
          transition: all 0.3s ease;
          color: #333;
        }
        .menu-toggle-btn:hover {
          transform: scale(1.15);
          color: #ff914d; /* Brand Orange */
        }
        .sidebar-close-btn {
          transition: transform 0.4s ease, color 0.3s ease;
          color: #ffffff;
        }
        .sidebar-close-btn:hover {
          transform: rotate(90deg) scale(1.2);
          color: #ff914d;
        }
        .offcanvas_heading {
          background: -webkit-linear-gradient(45deg, #fff, #ff914d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .stylish-section-title {
          color: #ff914d;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 145, 77, 0.3);
          display: inline-block;
        }
        .offcanvas_anchor {
          transition: color 0.3s ease, transform 0.3s ease;
          color: #d1d1d1;
          text-decoration: none;
          display: inline-block;
        }
        .offcanvas_anchor:hover {
          color: #ff914d;
          transform: translateX(8px); /* Adjusted hover for centered text */
        }
      `}} />

      {/* Button to open sidebar */}
      <button 
        className="btn border-0 d-block p-0 ms-3" 
        onClick={openSidebar} 
        aria-label="Open sidebar menu"
      >
        <FaBars className="fs-2 mt-1 menu-toggle-btn" />
      </button>

      {/* Sidebar */}
      <div
        id="mySidebar"
        style={{
          width: isOpen ? "100%" : "0", 
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(15, 15, 15, 0.98)", 
          backdropFilter: "blur(12px)", 
          overflowX: "hidden",
          overflowY: "auto", 
          height: "100%",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)", 
          zIndex: 1055, 
        }}
      >
        <div className="d-flex justify-content-between align-items-center container-fluid px-4 px-lg-5 pt-3">
          {/* <div className="logo">
            <a href="/" className="d-block d-lg-none" aria-label="Home">
              <img
                src="/images/new_hc_logo.png" 
                className="mt-2"
                width={70}
                height={70}
                alt="hc-logo"
                style={{ objectFit: 'contain' }}
                decoding="async"  
                loading="lazy" 
              />
            </a>
          </div> */}
          <div className="close">
            <button
              type="button"
              onClick={closeSidebar}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Close sidebar"
            >
              <IoCloseCircleOutline className="fs-1 sidebar-close-btn" />
            </button>
          </div>
        </div>

        <div style={{ padding: "20px 10px", color: "white" }}>
          <div className="container">
            <div className="row mt-3">
              {/* Left Column Intro (Desktop only) */}
              <div className="col-lg-5 mb-5 mb-lg-0 pe-lg-5 d-none d-lg-block">
                <h2 className="offcanvas_heading fw-bold mb-3">
                  High Creation Interior
                </h2>
                <p className="offcanvas_description" style={{ color: '#a3a3a3', lineHeight: '1.8' }}>
                  If you are looking out for a beautiful home that fits in your
                  budget, Yes! You are at the right place, we will make your
                  dream home come true.
                </p>
              </div>

              {/* Right Column Links */}
              <div className="col-lg-7">
                <div className="row g-4 g-lg-5">
                  
                  {/* Exclusive Design & Centers - Side by Side on Mobile */}
                  <div className="col-6 col-md-4 text-center text-lg-start">
                  <h5 className="mb-4 pb-1 stylish-section-title fs-4">Design Ideas</h5>
                    {/* Headers hidden or omitted in your screenshot design, adjusting list directly */}
                    <ul className="list-unstyled mb-0 gap-3 d-flex flex-column mt-2">
                      <li><a href="/furniture/" className="offcanvas_anchor">Furniture</a></li>
                      <li><a href="/ready-togo-design/" className="offcanvas_anchor">Ready To Go</a></li>
                      <li><a href="/sustainable-furniture/" className="offcanvas_anchor">Sustainable</a></li>
                      <li><a href="/spacesaving-furniture/" className="offcanvas_anchor">Space-Saving</a></li>
                      <li><a href="/wallpaper/" className="offcanvas_anchor">Wallpapers</a></li>
                    </ul>
                  </div>

                  <div className="col-6 col-md-4 text-center text-lg-start">
                  <h5 className="mb-4 pb-1 stylish-section-title fs-4">Experience Center</h5>
                    <ul className="list-unstyled mb-0 gap-3 d-flex flex-column mt-2">
                      <li><a href="/experience-center/" className="offcanvas_anchor">Noida Center</a></li>
                      <li><a href="/experience-center-gurugram/" className="offcanvas_anchor">Gurugram Center</a></li>
                      <li><a href="/experience-center-faridabad/" className="offcanvas_anchor">Faridabad Center</a></li>
                    </ul>
                  </div>

                  {/* Looks - Centered Full Width on Mobile */}
                  <div className="col-12 col-md-4 text-center text-lg-start mt-5 mt-md-0">
                    <h5 className="mb-4 pb-1 stylish-section-title fs-4">Looks</h5>
                    <ul className="list-unstyled mb-0 gap-3 d-flex flex-column align-items-center align-items-lg-start">
                      {loading ? (
                        <li className="text-muted small">Loading...</li>
                      ) : lookMenu.map((item) => (
                        <li key={item.id}>
                          <a href={item.web_url} className="offcanvas_anchor">{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cities - Centered Full Width on Mobile */}
                  <div className="col-12 col-md-4 text-center text-lg-start mt-5 mt-md-0">
                    <h5 className="mb-4 pb-1 stylish-section-title fs-4">Cities</h5>
                    <ul className="list-unstyled mb-0 gap-3 d-flex flex-column align-items-center align-items-lg-start">
                      <li><a href="/interior-designers-in-noida" className="offcanvas_anchor">Designers In Noida</a></li>
                      <li><a href="/interior-designers-in-ghaziabad" className="offcanvas_anchor">Designers in Ghaziabad</a></li>
                      <li><a href="/interior-designers-in-greater-noida" className="offcanvas_anchor">Designers in Greater Noida</a></li>
                      <li><a href="/interior-designers-in-delhi" className="offcanvas_anchor">Designers in Delhi</a></li>
                      <li><a href="/interior-designers-in-dwarka" className="offcanvas_anchor">Designers in Dwarka</a></li>
                      <li><a href="/best-interior-designers-in-faridabad" className="offcanvas_anchor">Designers in Faridabad</a></li>
                      <li><a href="/interior-designers-in-gurgaon" className="offcanvas_anchor">Designers in Gurugram</a></li>
                      <li><a href="/interior-designers-in-manesar" className="offcanvas_anchor">Designers In Manesar</a></li>
                      <li><a href="/interior-designer-in-sohna-gurgaon" className="offcanvas_anchor">Designers In Sohna</a></li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;