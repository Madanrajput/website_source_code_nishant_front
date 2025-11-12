"use client";
import { useCallback, useEffect, useState } from "react";
import ResidentialCard from "../components/ResidentialCard";
import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";

const LuxuryProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get(
        `/portfolio-project/active/luxury_projects/page/${currentPage}/limit/20`,
        {}
      );

      if (response.status === 200) {
        setProjects(response.data.data);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch data. Please try again.");
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchContentManagerPages();
  }, [fetchContentManagerPages]);

  return (
    <div>
      <head>
        <title>
        Luxury Interior Project Interior Portfolio : High creation Interior	
        </title>
        <meta
          name="description"
          content="Discover High Creation Interior's luxury interior project portfolio, featuring exquisite designs and elegant solutions crafted to transform spaces into timeless masterpieces.	"
        />
        <link rel="canonical" href="https://hcinterior.in/luxury-projects" />	
      </head>
      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="text-center mb-5">
              <h1 className="wallpaperHeading">Luxury Projects</h1>
              <p className="px-lg-5 team_description">
                Explore a curated selection of premium living room interior
                designs and décor ideas at High Creation. We offer customizable,
                functional, and stylish solutions to elevate your living space.
                From modular TV units to wall art and innovative wall designs,
                find all the inspiration you need to transform your living room.
                Start browsing today to discover designs that perfectly reflect
                your personal style.
              </p>
            </div>
          </section>
          <section className="resi_card">
            <div className="container">
              {/* <div className="row mx-0 g-4">
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/1.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Royal Living Room Design With Yellow
Sofas and Nesting Table
"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/2.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Spacious Contemporary Living Room Design
With Sofas, Bench & Lounge Chairs"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/3.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Modern Living Room Design With Grey L
Shape Sofa and Coffee Table"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/4.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Royal Living Room Design With Yellow
Sofas and Nesting Table
"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/5.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Spacious Contemporary Living Room Design
With Sofas, Bench & Lounge Chairs"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/6.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Modern Living Room Design With Grey L
Shape Sofa and Coffee Table"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/7.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Royal Living Room Design With Yellow
Sofas and Nesting Table
"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/8.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Spacious Contemporary Living Room Design
With Sofas, Bench & Lounge Chairs"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/9.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Modern Living Room Design With Grey L
Shape Sofa and Coffee Table"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/10.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Royal Living Room Design With Yellow
Sofas and Nesting Table
"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/11.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Spacious Contemporary Living Room Design
With Sofas, Bench & Lounge Chairs"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/12.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Modern Living Room Design With Grey L
Shape Sofa and Coffee Table"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/13.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Royal Living Room Design With Yellow
Sofas and Nesting Table
"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/14.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Spacious Contemporary Living Room Design
With Sofas, Bench & Lounge Chairs"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <ResidentialCard
                    cardNameResid="card_product"
                    resiImgUrl="/images/corporate/10.jpg"
                    resiImgALt="resi"
                    resiImgClass={"resi_img"}
                    residentialTitle="Modern Living Room Design With Grey L
Shape Sofa and Coffee Table"
                    residentialTitleClass="product_heading"
                    residentialDescriptiion="Luxurious bed with a plush mattress and sleek, durable frame for stylish comfort"
                    residentialClassCss="team_designation mb-0"
                    residentialButton="View More"
                  />
                </div>
              </div> */}
              <div className="row mx-0 g-4">
                {projects?.map((project, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-12">
                    <ResidentialCard
                      projectCardLink={`/luxury-projects/project-gallery?id=${project.id}`}
                      cardNameResid="card_product"
                      resiImgUrl={project.image}
                      resiImgALt={project.title ?? defaultAltText}
                      resiImgClass={"resi_img"}
                      residentialTitle={project.title}
                      residentialTitleClass="product_heading"
                      residentialDescriptiion={project.description}
                      residentialClassCss="team_designation mb-0"
                      residentialButton="View More"
                      residentialButtonUrl={`/luxury-projects/project-gallery?id=${project.id}`}
                    />
                  </div>
                ))}
              </div>
              <nav aria-label="Page navigation example mt-5 pt-5">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default LuxuryProjects;
