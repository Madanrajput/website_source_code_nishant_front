"use client";
import { useEffect, useState } from "react";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import { useSelector } from "react-redux";
import api from "@/utils/api";

const Page = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 

  const fetchQueries =  async () => {
    try {
        const response = await api.get("/cms-content/faqs", {
        });
        if (response.data?.length > 0) {
          setFaqData(response.data ?? []);
          console.log('response.data', response.data);
        }
        setLoading(false);
    } catch (err) {
        toast.error(err.message ?? "Failed to fetch team data. Please try again.");
        setLoading(false);
    }
};

useEffect(() => {
    fetchQueries();
}, [fetchQueries]);
  


 

  return (
    <div>
      <head>
        <title>
        Here Know About FAQs Of High Creation Interior | Policy	
        </title>
        <meta
          name="description"
          content="Find answers to common questions about High Creation Interior. Our FAQ page covers design process, pricing, project timelines, cancellation policy, and more to help you understand our services	"
        />
        <link rel="canonical" href="https://hcinterior.in/faq" />	
      </head>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages="contact_wrapper faq_banner"
            sectionBgHeading="Frequently Asked Questions"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription="Get all the information you need"
            secBgDesClass="text-center text-white"
          />

          <section className="privacy my-5">
            <div className="container">
              <div className="text-center">
                <h2>High Creation Interior</h2>
                <h3>
                  <span className="font_stylish" style={{ color: "#ff914d" }}>
                    Frequently Asked Questions
                  </span>
                </h3>

                {loading ? (
                  <p>Loading FAQs...</p>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : (
                  <div className="row justify-content-center mx-0">
                    <div className="col-lg-12">
                      <div className="accordion" id="faqAccordion">
                        {faqData.map((faq, index) => (
                          <div className="accordion-item" key={index}>
                            <h2 className="accordion-header">
                              <button
                                className={`accordion-button ${
                                  index === 0 ? "" : "collapsed"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded={index === 0 ? "true" : "false"}
                                aria-controls={`collapse${index}`}
                              >
                                {faq.json_content.title}
                              </button>
                            </h2>
                            <div
                              id={`collapse${index}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              data-bs-parent="#faqAccordion"
                            >
                              <div className="accordion-body ps-0">
                                {faq.json_content.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default Page;
