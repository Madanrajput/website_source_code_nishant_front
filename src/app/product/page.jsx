"use client";
import MainLayout from "../layouts/MainLayout";
import WallpaperCard from "../components/WallpaperCard";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
const Product = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchProductListData = async () => {
      try {
        const response = await api.get("/cms-parent-child/product");
        setProductList(response.data);
      } catch (err) {
        toast.error(
          err.message ?? "Failed to load design idea. Please try again."
        );
        console.error("Error fetching design idea:", err);
        setError(
          err.message ?? "Failed to load design idea. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductListData();
  }, []);

  return (
    <div>
      <head>
        <title>
          {seoData?.title ??
            "High Creation Interior - Customized Products design for your Home	"}
        </title>
        <meta
          name="title"
          content={
            seoData?.metaTitle ??
            " High Creation Interior - Customized Products design for your Home	"
          }
        />
        <meta
          name="description"
          content={
            seoData?.metaDescription ??
            "Explore customized Interior products gallery for your home , designed by Top interior designers at High Creation Interior.	"
          }
        />
        <meta name="keywords" content={seoData?.metaKeywords ?? ""} />
        <link rel="canonical" href="https://hcinterior.in/product" />	
      </head>

      <MainLayout>
        <main>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center alert alert-danger">{error}</div>
          ) : (
            <section className="container my-5">
              <div className="text-center mb-5 row mx-0">
                <h1 className="wallpaperHeading">Our Product</h1>
                <p className="px-lg-5">
                  Explore a curated selection of premium living room interior
                  designs and décor ideas at High Creation. We offer
                  customizable, functional, and stylish solutions to elevate
                  your living space. From modular TV units to wall art and
                  innovative wall designs, find all the inspiration you need to
                  transform your living room. Start browsing today to discover
                  designs that perfectly reflect your personal style.
                </p>
              </div>
              <div className="row g-4 mx-0">
                {productList.map((product) => (
                  <div className="col-lg-6 col-md-6 col-12" key={product.id}>
                    <WallpaperCard
                      linkTagWallpaper={`/product/gallery?id=${product.id}`}
                      wallpaperCard="wallpapercard"
                      imgWallpaper={product?.child_content?.image}
                      wallpaperImgClass="wallpaperclass"
                      altWallpaper={product?.child_content.title}
                      portfolioTitle={product?.child_content?.title}
                      wallpaperDescriptiion={
                        product?.child_content?.description
                      }
                      descriptionClass="team_description mb-0 pb-2 pb-lg-0"
                      textBtnWallpaper="View Design"
                      btnHrefWallpaper={`/product/gallery?id=${product.id}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default Product;
