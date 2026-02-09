import { notFound } from "next/navigation";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import ServicesRowLeft from "../components/ServicesRowLeft";
import { defaultAltText } from "@/utils/helper";
import api from "@/utils/api";
import DOMPurify from "isomorphic-dompurify";

// --- FIX: Dynamic Canonical Tag for Cities ---
export async function generateMetadata({ searchParams }) {
  const baseUrl = "https://hcinterior.in";
  // Check if city exists and isn't "undefined" string
  const city = searchParams?.city && searchParams.city !== "undefined" ? searchParams.city : "delhi";
  
  // Logic: If we have a specific city, point to that. Otherwise, point to main page.
  // Note: Adjust the URL structure below if you use specific routes for cities (e.g. /interior-designers-in-noida)
  const canonicalUrl = city && city !== 'delhi' 
    ? `${baseUrl}/services-detail?city=${city}`
    : `${baseUrl}/services-detail`;

  try {
    const response = await api.get(`cms-city/${city}`);
    const metaresult = response.data;

    return {
      title: metaresult?.seo_content?.meta_title ?? "Interior Design Services",
      description: metaresult?.seo_content?.meta_description ?? "Best Interior Design Services",
      keywords: metaresult?.seo_content?.meta_keywords ?? "",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    return {
      title: "Services - High Creation Interior",
      alternates: {
        canonical: `${baseUrl}/services-detail`,
      },
    };
  }
}

const ServicesDetailPage = async ({ searchParams }) => {
  const city = searchParams?.city && searchParams.city !== "undefined" ? searchParams.city : "delhi";

  try {
    const response = await api.get(`cms-city/${city}`);
    const pageData = response.data;

    const safeDescription = pageData?.main_description
      ? DOMPurify.sanitize(pageData.main_description)
      : "";

    return (
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading={pageData?.main_title}
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />

          <section className="my-5 mb-0">
            <div className="container">
              <div className="mx-0 row justify-content-center">
                <div className="col-lg-8 text-center">
                  <h3>{pageData?.main_title}</h3>
                  {/* Using div instead of p for HTML content to avoid nesting errors */}
                  <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
                  <div>
                    <img
                      src={pageData?.location_image ?? "/images/services/1-min.png"}
                      height={500}
                      width={700}
                      alt={pageData?.main_title ?? defaultAltText}
                      className="pt-0 pt-lg-5 w-100 object-fit-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ServicesRowLeft
            column1="col-lg-6"
            ServicesImgUrl={pageData?.side_image ?? "/images/services/2-min.png"}
            servicesImgAlt={pageData?.side_title ?? defaultAltText}
            servicesImgClass="interior_img2 mt-5 mt-lg-0"
            column2="col-lg-6"
            ServicesHeading={pageData?.side_title}
            ServicesDescription={pageData?.side_description}
            textBtnServices="Get a free consultation"
            linkBtnServices="/contact"
          />
            <section className="pb-3">
            <div className="container">
              <div className="mx-0 row g-4 justify-content-center">
                <div className="col-lg-10 col-11">
                  <div className="mx-0 row g-4 justify-content-center">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="interior_inner_card">
                        <img
                          src="/images/interior/icon1.png"
                          className="w-100 object-fit-contain"
                          height={150}
                          alt="team"
                        />
                        <div className="pt-3 text-center card-body">
                          <h4 className="px-4 py-3 text-center card-title card_Services_heading">
                            India&apos;s only full home warranty* up to 10-yrs
                            for products & services
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="interior_inner_card">
                        <img
                          src="/images/interior/icon2.png"
                          className="w-100 object-fit-contain"
                          height={150}
                          alt="team"
                        />
                        <div className="pt-3 text-center card-body">
                          <h4 className="px-4 py-3 text-center card-title card_Services_heading">
                            146 quality checks to give your home the best
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="interior_inner_card">
                        <img
                          src="/images/interior/icon3.png"
                          className="w-100 object-fit-contain"
                          height={150}
                          alt="team"
                        />
                        <div className="pt-3 text-center card-body">
                          <h4 className="px-4 py-3 text-center card-title card_Services_heading">
                            45-day installation swift kitchens, wardrobes &
                            storage
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </MainLayout>
    );
  } catch (error) {
    console.error("API Error:", error);
    notFound(); 
  }
};

export default ServicesDetailPage;