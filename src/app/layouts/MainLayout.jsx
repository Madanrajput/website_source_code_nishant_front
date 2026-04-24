import dynamic from "next/dynamic";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Footer from "./footer";
import Header from "./Header";
import MobileBottomBar from "../components/MobileBottomBar";

const ContactUsPopUp = dynamic(() => import("../components/ContactUsPopUp"), { 
  ssr: false, 
});

const MainLayout = ({ children }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .global-floating-widget {
          position: fixed;
          right: 10px;
          bottom: 70px; /* Pinned to the bottom instead of the middle */
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .widget-btn {
          width: 35px; height: 35px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none;
        }
        .widget-btn:hover { 
          transform: translateY(-5px); /* Pops up slightly on hover */
          color: white; 
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        .widget-btn.call { background: var(--hc-primary, #ff914d); }
        .widget-btn.whatsapp { background: #25D366; }
      `}} />

      <Header />
      
      <main>{children}</main>

      {/* Global Floating Icons - Restored Original WA Number */}
      <div className="global-floating-widget">
        
        <a href="tel:+917070701373" className="widget-btn call" aria-label="Call Us">
          <FaPhoneAlt size={18} />
        </a>
        <a href="https://wa.me/919560277787" target="_blank" rel="noopener noreferrer" className="widget-btn whatsapp" aria-label="WhatsApp Us">
          <FaWhatsapp size={18} />
        </a>
      </div>

      <ContactUsPopUp />
      <MobileBottomBar />
      <Footer />
    </>
  );
};

export default MainLayout;