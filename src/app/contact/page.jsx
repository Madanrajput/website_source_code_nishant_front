import MainLayout from "../layouts/MainLayout";
import ContactForm from "./ContactForm";
import MapSection from "../components/MapSection"; // <-- Import your new client component

// --- CONFIGURATION ---
export const revalidate = 60; 

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch SEO Data ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/contact" ||
          tag.page_name?.endsWith("/contact")
      );
    }
    return null;
  } catch (err) {
    console.error("SEO Fetch Error:", err);
    return null;
  }
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata() {
  const seoData = await getSeoData();

  const defaultTitle = "Book Free Consultation With High Creation Interior Noida";
  const defaultDesc =
    "Make a call on +91 7070701373 for top notch interior designing services in Noida. Address : H-56, 1st Floor, Sector-63, Noida, Uttar Pradesh- 201301";
  const defaultCanonical = "https://hcinterior.in/contact";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    openGraph: {
      title: seoData?.title || defaultTitle,
      description: seoData?.meta_description || defaultDesc,
      url: seoData?.page_name || defaultCanonical,
      type: "website",
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default function Contact() {
  return (
    <MainLayout>
      <main>
        <section className="contact_wrapper banner_contact">
          <div className="container">
            <div className="row mx-0">
              <div className="py-5 col-lg-8 d-flex align-item-center">
                <div className="pe-lg-5">
                  <h1 className="mt-4 text-white">Contact Us</h1>
                  <p className="text-white">
                    For inquiries regarding Any interior design service or expert{" "}
                    <br />
                    advice please reach out to us using the following contact{" "}
                    <br />
                    information
                  </p>
                  <p className="text-white">
                    Email Id :{" "}
                    <a href="mailto:info@hcinterior.in" className="text-white">
                      info@hcinterior.in{" "}
                    </a>
                    ,
                    <a href="mailto:care@hcinterior.in" className="text-white">
                      {" "}
                      care@hcinterior.in
                    </a>
                  </p>
                  <p className="text-white">
                    For Inquiry :{" "}
                    <a href="tel:7070701373" className="text-white">
                      +91 7070701373
                    </a>
                  </p>
                  <p className="text-white">
                    Customer care :{" "}
                    <a href="tel:1800-1200-532" className="text-white">
                      1800-1200-532
                    </a>
                  </p>

                  <h6 className="fw-bolder">Branch Office</h6>
                  <p className="text-white">
                    H101, LGF, Sector-63, Noida, <br />
                    Uttar Pradesh- 201301
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                {/* Client Component for Form Logic */}
                <ContactForm mapSrc="https://www.google.com/maps?q=H101,+LGF,+Sector-63,+Noida,+Uttar+Pradesh-+201301&output=embed" />
              </div>
            </div>
          </div>
        </section>

        {/* Replaced static HTML with the interactive map component */}
        <MapSection />
        
      </main>
      <hr />
    </MainLayout>
  );
}