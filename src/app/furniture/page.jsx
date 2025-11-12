"use client";
import { useCallback, useEffect, useState } from "react";
import WallpaperCard from "../components/WallpaperCard";
import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { defaultAltText } from "@/utils/helper";
const Furniture = () => {
  const [exclusiveDesignData, setExclusiveDesignData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get(`/cms-parent-child/furniture`, {});

      if (response.status === 200) {
        setExclusiveDesignData(response.data);
      }
    } catch (err) {
      setError(
        err.message ?? "Failed to load furnitire items. Please try again."
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
        <title>Explore customized furniture design for your dream home	</title>
        <meta
          name="description"
          content="Discover customized furniture designs tailored for your dream home, blending style, functionality, and personalization to create spaces you’ll love.	"
        />
        <link rel="canonical" href="https://hcinterior.in/furniture" />	
      </head>
      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="text-center mb-5 row mx-0">
              <h1 className="wallpaperHeading">Furniture</h1>
              <p className="px-lg-5">
                Create the perfect home with customized furniture designs that
                are designed to your needs. We combine style, functionality, and
                personalization to craft pieces that fit seamlessly into your
                space. Whether you&apos;re updating a single room or redesigning your
                entire home, our furniture is designed to enhance both form and
                function. Each item is made with attention to detail, ensuring
                it complements your style while making everyday life easier.
                Discover furniture that not only looks great but works for you,
                turning your house into a space you’ll truly love to live in.
                Let us bring your dream home to life.
              </p>
            </div>
            {/* <div className="row g-4 mx-0">
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/furniture/sofas.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="sofa"
                  portfolioTitle="Cofee Table"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Size"
                  secondValue="12feet"
                  textBtnWallpaper="View Design"
                       btnHrefWallpaper="/gallery-inner"
                />
              </div>
              </div> */}

            <div className="row g-4 mx-0">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {exclusiveDesignData?.map((design, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/furniture/gallery?id=${design?.id}`}
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
                    btnHrefWallpaper={`/furniture/gallery?id=${design?.id}`}
                  />
                </div>
              ))}
            </div>

            {/* <div className="row g-4 mx-0">
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/bed.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="bed"
                  portfolioTitle="Bed"
                  wallpaperDescriptiion="
Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/kids-bed.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="Kidsbed"
                  portfolioTitle="Kids Bed"
                  wallpaperDescriptiion="Playful kids' bed with a sturdy frame, colorful accents, and safety rails for comfort and fun."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/sofa.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="singlesofa"
                  portfolioTitle="Sofa"
                  wallpaperDescriptiion="Stylish sofa with plush cushions, modern design, and durable frame."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/chair.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="chair"
                  portfolioTitle="Chair"
                  wallpaperDescriptiion="Ergonomic chair with adjustable features and cushioned seating for comfort and support."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/center-table.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="centertable"
                  portfolioTitle="Center Table"
                  wallpaperDescriptiion="Elegant center table with a sleek design and sturdy base."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/cofee_table.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="coffee"
                  portfolioTitle="Coffee Table"
                  wallpaperDescriptiion="Chic coffee table with a minimalist design, sturdy frame, and smooth top."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/side-table.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="side-table"
                  portfolioTitle="Side Table"
                  wallpaperDescriptiion="Versatile side table with a sleek design, compact surface, and sturdy build."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/dressing-table.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="dressing-table"
                  portfolioTitle="Dressing Unit"
                  wallpaperDescriptiion="Stylish dressing unit with a spacious mirror, ample storage, and modern design."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/dining-chair-table.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="dining-table"
                  portfolioTitle="Dining Table & Unit"
                  wallpaperDescriptiion="Elegant dining table and chair set with a sturdy table and ergonomic chairs for style and comfort."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/mandir.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="mandir"
                  portfolioTitle="Mandir Unit"
                  wallpaperDescriptiion="Beautifully crafted mandir unit with intricate detailing and spacious shelves for idols and accessories."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/study-table.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="study-table"
                  portfolioTitle="Study table"
                  wallpaperDescriptiion="Functional study table with a spacious work surface and integrated shelves for books and supplies."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/tv-unit.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="tv"
                  portfolioTitle="TV Unit"
                  wallpaperDescriptiion="Modern TV unit with sleek design, ample storage, and open shelves for a clutter-free look."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/bar.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="bar"
                  portfolioTitle="Bar Unit"
                  wallpaperDescriptiion="Stylish bar unit with shelves for bottles and glasses, plus a sleek countertop for drinks."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/sofa.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="cough"
                  portfolioTitle="Couch"
                  wallpaperDescriptiion="Cozy couch with plush cushions and stylish design, offering comfort and durability."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/puffy.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="puffy"
                  portfolioTitle="Puffy"
                  wallpaperDescriptiion="Puffy seating option with a soft, cushioned surface for lounging or extra seating."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/chester-unit.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="chester-unit"
                  portfolioTitle="Chester Unit"
                  wallpaperDescriptiion="Elegant Chester unit with deep button tufting and plush upholstery for sophisticated seating."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/shoe-rack.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="shoe-rack"
                  portfolioTitle="Shoe Rack"
                  wallpaperDescriptiion="Stylish shoe rack with multiple tiers for organizing footwear in any entryway."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/breakfast-counter.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="breakfast-counter"
                  portfolioTitle="Breakfast Counter"
                  wallpaperDescriptiion="Modern breakfast counter with a sleek surface and bar-style seating for quick meals."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/crockry.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="crockry"
                  portfolioTitle="Crockry"
                  wallpaperDescriptiion="Elegant crockery unit with glass doors and spacious shelves for displaying dishware."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/way-window.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="way-window"
                  portfolioTitle="Way Window"
                  wallpaperDescriptiion="Charming bay window unit with a cozy nook for seating and display."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/book-shelf.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="book-shelf"
                  portfolioTitle="Bookshelf"
                  wallpaperDescriptiion="Stylish bookshelf with multiple tiers for storing and displaying books and decor."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/gallery-inner"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/products/balcony-chair-table.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="balcony-chair-table"
                  portfolioTitle="Balcony Chair & Table"
                  wallpaperDescriptiion="Charming balcony chair and table set, weather-resistant and stylish for outdoor use."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View Design"
                  btnHrefWallpaper="/gallery-inner"
                />
              </div>
            </div> */}
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default Furniture;
