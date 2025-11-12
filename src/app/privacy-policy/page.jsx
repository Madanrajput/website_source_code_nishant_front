"use client";
import { useCallback, useEffect, useState } from "react";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import Head from "next/head";
// export const metadata = {
//   title: "Privacy Policy",
//   description:
//     "Read the Privacy Policy of High Creation Interior to understand how we protect your personal information. Learn about data collection, usage, and your rights.",
// };
const Privacy = () => {
  const [pageData, setPageData] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("Title of your modal");
  const [desc, setDesc] = useState("You description goes here");

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/privacy_policy", {});
      if (response.data && response.data.json_content) {
        setPageData(response.data?.json_content?.html);
      }
      setLoading(false);
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContentManagerPages();
  }, [fetchContentManagerPages]);

  return (
    <div>
      <head>
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="Read the Privacy Policy of High Creation Interior to understand how we protect your personal information. Learn about data collection, usage, and your rights."
        />
         <link rel="canonical" href="https://hcinterior.in/privacy-policy" />	
      </head>
      {/* <Head>
      <title>
          iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple
        </title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head> */}
      <MainLayout>
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper privacy_policy_banner"}
          sectionBgHeading="Privacy Policy"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Get all the information you need"
          secBgDesClass={"text-center text-white"}
        />
        <section className="privacy my-5">
          <div className="container">
            <div className=" row mx-0">
              <div>
                <h2>High Creation Interior</h2>
                <h3>
                  <span className="font_stylish" style={{ color: "#ff914d" }}>
                    Privacy Policy
                  </span>
                </h3>
              </div>
              <div dangerouslySetInnerHTML={{ __html: pageData }} />
            </div>
          </div>
        </section>
        <hr />
      </MainLayout>
    </div>
  );
};

export default Privacy;
