"use client";
import { toast } from "react-toastify";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import { useCallback, useEffect, useState } from "react";
import api from "@/utils/api";
// export const metadata = {
//   title: "terms - My Website",
//   description: "Learn more about our company, team, and values.",
// };
const Terms = () => {
  const [pageData, setPageData] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/term_and_condition", {});
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
        <title>Terms & Conditions - High Creation Interior	</title>
        <meta
          name="description"
          content="Read our terms & conditions ( customer's do's & don't ) including Terms of Use, Livspace Quality Promise, Cancellation Policy, Return, Exchange & Refunds Policy.	"
        />
          <link rel="canonical" href="https://hcinterior.in/term-and-condition" />	
      </head>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper   terms_and_condition"}
            sectionBgHeading="Terms & Condition"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription="Get all the information you need"
            secBgDesClass={"text-center text-white"}
          />

          <section className="privacy my-5">
            <div className="container">
              <div className="  row mx-0">
                <h2>High Creation Interior</h2>
                <h3>
                  <span className="font_stylish" style={{ color: "#ff914d" }}>
                    Terms & Condition
                  </span>
                </h3>

                <div dangerouslySetInnerHTML={{ __html: pageData }} />
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default Terms;
