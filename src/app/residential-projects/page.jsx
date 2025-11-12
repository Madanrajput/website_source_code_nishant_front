"use client";
import { useCallback, useEffect, useState } from "react";
import ResidentialCard from "../components/ResidentialCard";
import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";

const ResidentialProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get(
        `/portfolio-project/active/residential_projects/page/${currentPage}/limit/20`,
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
        Residential Project Interior Portfolio : High creation Interior	
        </title>
        <meta
          name="title"
          content="Residential Project Interior Portfolio : High creation Interior	"/>
        <meta
          name="description"
          content=
            "Explore High Creation Interior's stunning residential project portfolio showcasing luxurious and functional designs. Discover inspiring interiors tailored to elevate your living spaces.	"/>
      <link rel="canonical" href="https://hcinterior.in/residential-projects" />	
      </head>

      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="text-center mb-5">
              <h1 className="wallpaperHeading">Residential Projects</h1>
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
              <div className="row mx-0 g-4">
                {projects?.map((project, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-12">
                    <ResidentialCard
                      projectCardLink={`/residential-projects/project-gallery?id=${project.id}`}
                      cardNameResid="card_product"
                      resiImgUrl={project.image}
                      resiImgALt={project.title ?? defaultAltText}
                      resiImgClass={"resi_img"}
                      residentialTitle={project.title}
                      residentialTitleClass="product_heading"
                      residentialDescriptiion={project.description}
                      residentialClassCss="team_designation mb-0"
                      residentialButton="View More"
                      residentialButtonUrl={`/residential-projects/project-gallery?id=${project.id}`}
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

export default ResidentialProjects;
