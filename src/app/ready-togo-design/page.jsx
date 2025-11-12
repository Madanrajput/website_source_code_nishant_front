"use client";
import { useCallback, useEffect, useState } from "react";
import WallpaperCard from "../components/WallpaperCard";
import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { defaultAltText } from "@/utils/helper";

const ReadyToGoDesign = () => {
  const [exclusiveDesignData, setExclusiveDesignData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get(
        `/cms-parent-child/ready_to_go_design`,
        {}
      );

      if (response.status === 200) {
        setExclusiveDesignData(response.data);
      }
    } catch (err) {
      setError(
        err.message ?? "Failed to load ready to go design. Please try again."
      );
      toast.error(err.message || "Failed to fetch data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContentManagerPages();
  }, [fetchContentManagerPages]);

  return (
    <div>
      <head>
        <title>Ready To Go Interior Design : High Creation Interior	</title>
        <meta
          name="description"
          content="Explore our Ready-To-Go Interior Design solutions, offering stylish, pre-designed spaces that blend functionality and aesthetics for a hassle-free transformation.	"
        />

<link rel="canonical" href="https://hcinterior.in/ready-togo-design" />	
      </head>

      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="text-center mb-5 mx-0 row">
              <h1 className="pb-3">Ready To Go Design</h1>
              <p className="px-lg-5 team_description">
                Ready-To-Go Interior Design solutions, crafted to bring you
                beautifully designed spaces with ease. These pre-designed setups
                combine style and practicality, giving your home or office a
                fresh, modern look without the stress of planning. Whether
                you’re updating a single room or transforming an entire space,
                our solutions are tailored to meet your needs. Each design is
                thoughtfully created to balance aesthetics with functionality,
                ensuring a space that’s both visually appealing and practical.
                Let us take the hassle out of interior design so you can enjoy a
                seamless transformation that reflects your taste and lifestyle.
              </p>
            </div>
            <div className="row g-4 mx-0">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {exclusiveDesignData?.map((design, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/ready-togo-design/gallery?id=${design?.id}`}
                    wallpaperCard="wallpapercard"
                    imgWallpaper={
                      design?.child_content?.image ?? "/images/Bhk/1bhk.png"
                    }
                    wallpaperImgClass="wallpaperclass"
                    altWallpaper={
                      design?.child_content?.title ?? defaultAltText
                    }
                    portfolioTitle={design?.child_content?.title}
                    wallpaperDescriptiion={design?.child_content?.description}
                    descriptionClass="team_description mb-0"
                    textBtnWallpaper="View Design"
                    btnHrefWallpaper={`/ready-togo-design/gallery?id=${design?.id}`}
                  />
                </div>
              ))}
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default ReadyToGoDesign;
