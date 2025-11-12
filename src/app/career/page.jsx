"use client";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import BoxIcon from "../components/BoxIcon";
import { FaCheck, FaArrowRightLong } from "react-icons/fa6";
import MainLayout from "../layouts/MainLayout";
import { useCallback, useEffect, useState } from "react";
import api from "@/utils/api";
import moment from "moment";
const Career = () => {
  const [jobPostList, setJobPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = useCallback(async () => {
    try {
      const response = await api.get("/manage-job/active", {});

      setJobPostList(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch queries form data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  return (
    <div>
      <head>
        <title>Career - High Creation Interior	</title>
        <meta
          name="description"
          content="Know about careers in High Creation Interior Noida. High Creation Interior opens doors for professional growth and development in Interior Designing.	"
        />
        <link rel="canonical" href="https://hcinterior.in/career" />	
      </head>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper   career_page_banner"}
            sectionBgHeading="Career"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />
          <section className="my-5">
            <div className="container">
              <div className="row g-4 justify-content-center mx-0">
                <center>
                  <h3 className="pb-4">
                  Where passion for design meets innovation.

                  </h3>
                  <p className="team_description px-lg-5">
                  Where passion for design meets innovation, we create spaces that inspire and elevate. By blending creativity with the latest technology, we craft personalized interiors that are both beautiful and functional. Our team is dedicated to pushing boundaries, offering cutting-edge solutions that transform ideas into reality. With every project, we strive to deliver designs that not only captivate but also enhance the way you live and work.

                  </p>
                </center>
                <div className="col-lg-10">
                  <div className="row g-4 mx-0">
                    <div className="col-lg-4 col-md-4 col-12">
                      <BoxIcon
                        iconImage="/images/career/icon/growth.png"
                        iconAlt="ssddd"
                        iconClass="object-fit-contain"
                        IconBoxHeading="Growth Opportunities & Career Development"
                        IconBoxDescription="We offer continuous learning, skill enhancement, and clear career pathways—empowering every team member to grow, evolve, and achieve their fullest professional potential with us."
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <BoxIcon
                        iconImage="/images/career/icon/work_culture.png"
                        iconAlt="ssddd"
                        iconClass="object-fit-contain"
                        IconBoxHeading="Work Culture & Team Environment"
                        IconBoxDescription="We foster a collaborative, supportive, and inclusive work culture where every voice matters, ideas thrive, and teamwork drives growth, innovation, and shared success."
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <BoxIcon
                        iconImage="/images/career/icon/employee_success.png"
                        iconAlt="ssddd"
                        iconClass="object-fit-contain"
                        IconBoxHeading="Employee Success Stories"
                        IconBoxDescription="Employee Success Stories highlight inspiring journeys of growth, dedication, and achievement—showcasing how our people evolve, thrive, and make a lasting impact within our organization."
                      />
                    </div>
                    <div className="col-lg-2 col-md-2 col-12">
                     
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <BoxIcon
                        iconImage="/images/career/icon/learning.png"
                        iconAlt="ssddd"
                        iconClass="object-fit-contain"
                        IconBoxHeading="Learning & Skill Enhancement Programs"
                        IconBoxDescription="We empower our team with continuous learning, hands-on training, workshops, and skill development programs to foster growth, innovation, and professional excellence at every level."
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                      <BoxIcon
                        iconImage="/images/career/icon/award.png"
                        iconAlt="ssddd"
                        iconClass="object-fit-contain"
                        IconBoxHeading="Recognition & Rewards"
                        IconBoxDescription="We celebrate dedication and excellence through performance rewards, appreciation programs, and recognition that motivates our team to grow, thrive, and feel truly valued every day."
                      />
                    </div>
                    {/* <div className="col-lg-4 col-md-4 col-12">
                      <BoxIcon
                        iconImage="/images/career/icon/6.png"
                        iconAlt="ssddd"
                        iconClass="object-fit-contain"
                        IconBoxHeading="We work"
                        IconBoxDescription="we don’t deal on problems
we find solutions"
                      />
                    </div> */}

                    {/* <div className="row pt-4">
                      <h4>Benefits and Perks</h4>
                      <div className="col-lg-5 col-md-4 col-12">
                        <ul className="list-unstyled ">
                          <h5>Health Benefits:</h5>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Health insuarance
                            with accident cover.
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Health insuarance
                            with accident cover.
                          </li>
                          <h5 className="pt-4">Health Benefits:</h5>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Health insuarance
                            with accident cover.
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Health insuarance
                            with accident cover.
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 col-md-4 col-12">
                        <ul className="list-unstyled ">
                          <h5>Health Benefits:</h5>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Sick days
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Paid holidays
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" />
                            Unpaid extended leave
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" />
                            Sabbatical
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" />
                            Breveament Leave
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12">
                        <ul className="list-unstyled mb-0">
                          <h5>Health Benefits:</h5>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Sick days
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" /> Paid holidays
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" />
                            Unpaid extended leave
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" />
                            Sabbatical
                          </li>
                          <li className="ps-0">
                            <FaCheck className="pe-2 fs-4" />
                            Breveament Leave
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pb-5">
            <div className="container">
              <div className="row justify-content-center mx-0">
                <div className="col-lg-10">
                  <table>
                    <thead>
                      <tr>
                        <th>Job Posting</th>
                        <th>Experience</th>
                        <th>No of Opening</th>
                        <th>Location</th>
                        <th>Posted On</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobPostList?.map((job, index) => (
                        <tr key={index}>
                          <td>{job?.title ?? "-"}</td>
                          <td>{job?.experience_required ?? "-"}</td>
                          <td>{job?.job_opening ?? "-"}</td>
                          <td>{job?.location ?? "-"}</td>
                          <td>
                            {moment(job?.created_at).format("DD/MM/YYYY")}
                          </td>
                          <td>
                            <a
                              href={`/career/career-form?jobId=${job.id}`}
                              className="text-muted"
                            >
                              <FaArrowRightLong className="fs-4" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
          <hr className="pt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default Career;
