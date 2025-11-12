"use client";
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import BgImageCard from "../components/BgImageCard";
import BackgroundImageRow from "../components/BackgroundImageRow";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const Designidea = () => {
  const [designIdea, setDesignIdea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchDesignIdea = async () => {
      try {
        const response = await api.get("/cms-parent-child/designer_choice");
        setDesignIdea(response.data);
      } catch (err) {
        console.error("Error fetching design idea:", err);
        setError("Failed to load design ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignIdea();
  }, []);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await api.get("/content-manager/slug/design-idea");
        setSeoData(response.data);
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      }
    };

    fetchSeoData();
  }, []);

  // Sort records by ID in descending order (newest first)
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);

  // Get the 8 oldest records
  const staticRecords = sortedDesignIdea.slice(-5); // Last 8 records (oldest)

  // Get the latest records (excluding the last 8)
  const latestRecords = sortedDesignIdea.slice(0, -5); // Everything except last 8
 console.log('latestRecords',latestRecords);
  return (
    <div>
      <head>
        <title>{seoData?.title ?? "High Creation Interior - Interior Design Gallery"}</title>
        <meta name="title" content={seoData?.metaTitle ?? "High Creation Interior - Interior Design Gallery"} />
        <meta
          name="description"
          content={seoData?.metaDescription ?? "Explore Interior Design gallery designed by Top interior designers at High Creation Interior."}
        />
        <meta
          name="keywords"
          content={seoData?.metaKeywords ?? "design idea, living room interior, living room design, living room decor"}
        />
      </head>
      <MainLayout>
        <main>
        <div class="container">
        <div className="text-center mt-3 mx-0 row">
              <h1 className="wallpaperHeading">Designer Choice</h1>
              <p className="px-lg-5 team_description">
           Explore our curated selection of stunning interior designs, blending luxury, functionality, and innovation. From modern minimalism to timeless elegance, each space is crafted to inspire. Discover bespoke designs, premium materials, and expert craftsmanship that transform homes into masterpieces. Elevate your interiors with our exclusive designer choices.
              </p>
            </div>
            </div> 
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center alert alert-danger">{error}</div>
          ) : (
            <section className="container my-0">
              
                {/* Check if static records exist */}
                {staticRecords.length > 0 ? (
              <div className="mt-0 row g-4 mx-0">
              <div className="col-lg-5 col-md-6 col-12">
                <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[0]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[0]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[0]?.child_content?.title}
                  descriptionBg={staticRecords[0]?.child_content?.description}
                />
              </div>
              <div className="col-lg-7 col-md-6 col-12">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[1]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[1]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[1]?.child_content?.title}
                  descriptionBg={staticRecords[1]?.child_content?.description}
                />
              </div>
              <div className="col-lg-7 col-md-6 col-12">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[2]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[2]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[2]?.child_content?.title}
                  descriptionBg={staticRecords[2]?.child_content?.description}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[3]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[3]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[3]?.child_content?.title}
                  descriptionBg={staticRecords[3]?.child_content?.description}
                />
              </div>
              <div className="col-lg-12 ">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[4]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[4]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[4]?.child_content?.title}
                  descriptionBg={staticRecords[4]?.child_content?.description}
                />
              </div>
            </div>
                ) : (
                  <></>
                )}
             
             <div className="mt-4 row g-4 mx-0">
                  {latestRecords.map((item) => (
                    <div key={item.id} className="col-lg-6">

<BgImageCard
                 style={{
                  backgroundImage: `url(${item.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${item.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={item.child_content?.title}
                  descriptionBg={item.child_content?.description}
                />

                     
                    </div>
                  ))}
                </div>
            </section>
          )}
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default Designidea;
