"use client";
import GalleryDetail from "../../components/GalleryDetail";
import MainLayout from "../../layouts/MainLayout";
import { useHasMounted } from "@/utils/useHasMounted";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";
const ResidentialProjectsGallery = () => {
  const [portfolioData, setPortfolioData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentManagerPages = async () => {
      const portfolioProjectId = new URLSearchParams(window.location.search).get("id") ?? null;
      try {
        const response = await api.get(`/portfolio-project/${portfolioProjectId}`, {});

        if (response.data) {
          setPortfolioData(response.data);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.message ?? "Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchContentManagerPages();
  }, []);

  const images = portfolioData?.child_images ?? [];
  return (
    <div>
          {loading ? (
        <div className="loader-container">
          <div className="spinner">
            <img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_large.gif" /> 
          </div>
        </div>
      ) : (
      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="row g-4 mx-0">
              <h4 className="ps-3 mt-3">{portfolioData?.title ?? "Residentail Projects Gallery"}</h4>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={portfolioData?.child_images?.[0]?.image ?? "/images/detail-img/1.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                  images={images}
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={portfolioData?.child_images?.[1]?.image ?? "/images/detail-img/6.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                  images={images}
                />
              </div>
              <div className="col-lg-12">
                <GalleryDetail
                  imgGalUrl={portfolioData?.child_images?.[2]?.image ?? "/images/detail-img/3.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img2"
                  images={images}
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={portfolioData?.child_images?.[3]?.image ?? "/images/detail-img/4.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                  images={images}
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={portfolioData?.child_images?.[4]?.image ?? "/images/detail-img/5.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                  images={images}
                />
              </div>
              <div className="col-lg-12">
                <GalleryDetail
                  imgGalUrl={portfolioData?.child_images?.[5]?.image ?? "/images/detail-img/6.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img2"
                  images={images}
                />
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
  )}
    
    </div>
  );
};

export default ResidentialProjectsGallery;
