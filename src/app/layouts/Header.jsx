// import { IoIosCall } from "react-icons/io";
// import Toggle from "../components/Toggle";
// import Image from "next/image";
// // import "../globals.css";

// const Header = () => {
//   return (
//     <>
//       <div className="hedaer_wrapper fixed-top">
//         <div className="px-3 container-fluid">
//           <div className="d-flex justify-content-between align-items-center">
//             <nav className="navbar navbar-expand-lg p-0 ">
//               <div className="container-fluid">
//                 <a className="navbar-brand me-lg-3 me-0" href="/" aria-label="Home">
//                   <Image
//                     src="/images/new_hc_logo.png"
//                     width={90}
//                     height={90}
//                     alt="High Creation Interior Logo"
//                     className="p-2"
//                     priority
//                     style={{ width: '90px', height: '90px', objectFit: 'contain' }}
//                   />
//                 </a>
//                 <button
//                   className="navbar-toggler d-lg-none"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#navbarSupportedContent"
//                   aria-controls="navbarSupportedContent"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div
//                   className="collapse navbar-collapse"
//                   id="navbarSupportedContent"
//                 >
//                   <ul className="m-auto mb-2 text-center navbar-nav mb-lg-0 ms-0">
                    
//                     {/* Design Ideas */}
//                     <li className="nav-item dropdown">
//                       <a
//                         className="nav-link dropdown-toggle"
//                         href="#"
//                         role="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         Design Ideas
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="/design-idea/">
//                             Design Gallery
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/product/">
//                             Product
//                           </a>
//                         </li>
//                       </ul>
//                     </li>

//                     {/* Portfolio */}
//                     <li className="nav-item dropdown">
//                       <a
//                         className="nav-link dropdown-toggle"
//                         href="#"
//                         role="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         Portfolio
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a
//                             className="dropdown-item"
//                             href="/residential-projects/"
//                           >
//                             Residential Projects
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/luxury-projects/">
//                             Luxury Projects
//                           </a>
//                         </li>
//                       </ul>
//                     </li>

//                     {/* Experience Center */}
//                     <li className="nav-item dropdown">
//                       <a
//                         className="nav-link dropdown-toggle"
//                         href="#"
//                         role="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                        Experience Center
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="/experience-center/">
//                           Experience Center Noida
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/experience-center-gurugram/">
//                           Experience Center Gurugram
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/experience-center-faridabad/">
//                           Experience Center Faridabad
//                           </a>
//                         </li>
//                       </ul>
//                     </li>

//                     {/* Exclusive Design */}
//                     <li className="nav-item dropdown">
//                       <a
//                         className="nav-link dropdown-toggle"
//                         href="#"
//                         role="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         Exclusive Design
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a
//                             className="dropdown-item"
//                             href="/ready-togo-design/"
//                           >
//                             Ready To Go Design
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/wallpaper/">
//                             Wallpapers
//                           </a>
//                         </li>
//                         <li>
//                           <a
//                             className="dropdown-item"
//                             href="/spacesaving-furniture/"
//                           >
//                             {" "}
//                             Space-Saving Furniture
//                           </a>
//                         </li>
//                         <li>
//                           <a
//                             className="dropdown-item"
//                             href="/sustainable-furniture/"
//                           >
//                             Sustainable Furniture
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/furniture/">
//                             Furniture
//                           </a>
//                         </li>
//                       </ul>
//                     </li>

//                     {/* --- SERVICES DROPDOWN (MOVED HERE) --- */}
//                     <li className="nav-item dropdown">
//                       <a
//                         className="nav-link dropdown-toggle"
//                         href="#"
//                         role="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         Services
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-noida">
//                             Interior Designers In Noida
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-ghaziabad">
//                             Interior Designers in Ghaziabad
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-greater-noida">
//                             Interior Designers in Greater Noida
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-delhi">
//                             Interior Designers in Delhi
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-dwarka">
//                             Interior Designers in Dwarka
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-faridabad">
//                             Interior Designers in Faridabad
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-gurgaon">
//                             Interior Designers in Gurugram
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="/interior-designers-in-manesar">
//                             Interior Designers In Manesar
//                           </a>
//                         </li>

//                         <li>
//                           <a className="dropdown-item" href="/interior-designer-in-sohna-gurgaon">
//                             Interior Designers in Sohna
//                           </a>
//                         </li>
//                       </ul>
//                     </li>

//                     {/* Contact Us */}
//                     <li className="nav_item">
//                       <a
//                         className="nav-link"
//                         aria-current="page"
//                         href="/contact/"
//                       >
//                         Contact Us
//                       </a>
//                     </li>
//                     <li className="py-2">
//                       {/* Empty li placeholder */}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             <div>
//               <a href="/estimator-for-home" className="get_btn">
//                 Get Estimate <IoIosCall className="callicon" />
//               </a>
//             </div>
//             <div>
//               <Toggle />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;
"use client"; // 🌟 PERF FIX: Required for React State
import { useState, useEffect, useRef } from "react";
import { IoIosCall } from "react-icons/io";
import Toggle from "../components/Toggle";
import Image from "next/image";

const Header = () => {
  // 🌟 PERF FIX: Native React state to replace heavy Bootstrap JS
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdown = (e, menuName) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  // Automatically close dropdowns when clicking outside
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
      <div className="hedaer_wrapper fixed-top" ref={navRef}>
        <div className="px-3 container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <nav className="navbar navbar-expand-lg p-0 ">
              <div className="container-fluid">
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
                
                {/* 🌟 REACT FIX: Swapped data-bs-toggle for onClick */}
                <button
                  className="navbar-toggler d-lg-none"
                  type="button"
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                {/* 🌟 REACT FIX: Dynamic classes for mobile menu */}
                <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
                  <ul className="m-auto mb-2 text-center navbar-nav mb-lg-0 ms-0">
                    
                    {/* Design Ideas */}
                    <li className={`nav-item dropdown ${activeDropdown === 'design' ? 'show' : ''}`}>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        onClick={(e) => handleDropdown(e, 'design')}
                        aria-expanded={activeDropdown === 'design'}
                      >
                        Design Ideas
                      </a>
                      <ul className={`dropdown-menu ${activeDropdown === 'design' ? 'show' : ''}`}>
                        <li><a className="dropdown-item" href="/design-idea/">Design Gallery</a></li>
                        <li><a className="dropdown-item" href="/product/">Product</a></li>
                      </ul>
                    </li>

                    {/* Portfolio */}
                    <li className={`nav-item dropdown ${activeDropdown === 'portfolio' ? 'show' : ''}`}>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        onClick={(e) => handleDropdown(e, 'portfolio')}
                        aria-expanded={activeDropdown === 'portfolio'}
                      >
                        Portfolio
                      </a>
                      <ul className={`dropdown-menu ${activeDropdown === 'portfolio' ? 'show' : ''}`}>
                        <li><a className="dropdown-item" href="/residential-projects/">Residential Projects</a></li>
                        <li><a className="dropdown-item" href="/luxury-projects/">Luxury Projects</a></li>
                      </ul>
                    </li>

                    {/* Experience Center */}
                    <li className={`nav-item dropdown ${activeDropdown === 'experience' ? 'show' : ''}`}>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        onClick={(e) => handleDropdown(e, 'experience')}
                        aria-expanded={activeDropdown === 'experience'}
                      >
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
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        onClick={(e) => handleDropdown(e, 'exclusive')}
                        aria-expanded={activeDropdown === 'exclusive'}
                      >
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
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        onClick={(e) => handleDropdown(e, 'services')}
                        aria-expanded={activeDropdown === 'services'}
                      >
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

                    {/* Contact Us */}
                    <li className="nav_item">
                      <a className="nav-link" aria-current="page" href="/contact/">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div>
              <a href="/estimator-for-home" className="get_btn">
                Get Estimate <IoIosCall className="callicon" />
              </a>
            </div>
            <div>
              {/* <a href="/login" className="get_btn" style={{ marginLeft: "10px" }}>Login</a> */}
              <Toggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;