"use client";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns"; // Importing the format function
import api from "@/utils/api";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import Blogs from "../components/Blogs";
import { defaultAltText } from "@/utils/helper";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get(`/cms-blog`, {});

      if (response.status === 200) {
        setBlogs(response.data);
      }
    } catch (err) {
      setError(err.message ?? "Failed to load Blogs. Please try again.");
      toast.error(err.message || "Failed to fetch data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContentManagerPages();
  }, [fetchContentManagerPages]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd-MM-yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div>
      <head>
        <title>Latest News And Updates - High Creation Interior	</title>
        <meta
          name="description"
          content="Latest News & Updates From High Creation Interior In Noida. Discover interior design blogs.	"
        />
        <link rel="canonical" href="https://hcinterior.in/blog" />
      </head>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading="Blog"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />
          <div className="container my-5">
            <div className="row g-5 mx-0">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {blogs?.map((design, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <Blogs
                    blogCard={"blog_card_main border-0"}
                    imgSrcBlog={design?.image ?? "/images/Blog/blo_img1.webp"}
                    blogImglink={`/${
                      design?.seo_content?.slug ??
                      "blog-detail?id=" + design?.id
                    }`}
                    blogImgALt={design?.title ?? defaultAltText}
                    blogClassImg={"w-100 object-fit-cover blog_imgs"}
                    blogdate={formatDate(design?.published_on)} // Format date here
                    blogTitle={design?.title}
                    blogDescription={design?.description}
                    buttonBlog="Continue Reading"
                    blogBtnHref={`/${
                      design?.seo_content?.slug ??
                      "blog-detail?id=" + design?.id
                    }`}
                    writer_name={design?.writer_name}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
        <hr />
      </MainLayout>
    </div>
  );
};

export default Blog;
