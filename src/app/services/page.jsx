"use client";
import MainLayout from "../layouts/MainLayout";
import BackgroundImageRow from "../components/BackgroundImageRow";
import RowImage from "../components/RowImage";
import ServicesRowLeft from "../components/ServicesRowLeft";
import ServicesRightRow from "../components/ServicesRightRow";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { defaultAltText } from "@/utils/helper";
const Services = () => {
  const [pageDataList, setPageDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchServiceData = async () => {
      try {
        const response = await api.get("/cms-city");
        setPageDataList(response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message ?? "Failed to load services. Please try again.");
        toast.error(
          err.message ?? "Failed to load services. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  return (
    <div>
      <head>
        <title>
        Our Taganting Site Services Page	
        </title>
        <meta
          name="description"
          content="Our Taganting Site Services Page	"
        />
        <link rel="canonical" href="https://hcinterior.in/services" />	
      </head>
      <MainLayout>
        <main>
          <BackgroundImageRow
            sectionBgImages={"sectionbg services"}
            sectionBgHeading="Services"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription="Explore a curated selection of premium living room interior designs and décor ideas at High Creation.
We offer customizable, functional, and stylish solutions to elevate your living space. From modular TV
units to wall art and innovative wall designs, find all the inspiration you need to transform your living
room. Start browsing today to discover designs that perfectly reflect your personal style.
"
            secBgDesClass="secbgbesclass"
          />

          <ServicesRowLeft
            column1={"col-lg-6 d-flex align-items-center"}
            ServicesImgUrl={
              pageDataList[0]?.location_image ?? "/images/services/1-min.png"
            }
            servicesImgAlt={pageDataList[0]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            column2={"col-lg-6"}
            ServicesHeading={pageDataList[0]?.main_title ?? ""}
            ServicesDescription={pageDataList[0]?.main_description ?? ""}
            textBtnServices="Read More"
            linkBtnServices={`services-detail?city=${pageDataList[0]?.city_type}`}
          />

          <ServicesRightRow
            sectionServices={"services_sec_wrapper1"}
            colum1="col-lg-6"
            ServicesImgUrlRight={
              pageDataList[1]?.location_image ?? "/images/services/2-min.png"
            }
            servicesImgAltRight={pageDataList[1]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            colum2={"col-lg-6 align-items-center d-flex"}
            ServicesHeadingRight={pageDataList[1]?.main_title ?? ""}
            ServicesDescriptionRight={pageDataList[1]?.main_description ?? ""}
            descrClass={"team_description"}
            textBtnServicesRight="Read More"
            linkBtnServices={`services-detail?city=${pageDataList[1]?.city_type}`}
          />

          <ServicesRowLeft
            column1={"col-lg-6 d-flex align-items-center"}
            ServicesImgUrl={
              pageDataList[2]?.location_image ?? "/images/services/3-min.png"
            }
            servicesImgAlt={pageDataList[2]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            column2={"col-lg-6"}
            ServicesHeading={pageDataList[2]?.main_title ?? ""}
            ServicesDescription={pageDataList[2]?.main_description ?? ""}
            textBtnServices="Read More"
            linkBtnServices={`services-detail?city=${pageDataList[2]?.city_type}`}
          />
          <ServicesRightRow
            sectionServices={"services_sec_wrapper1"}
            colum1="col-lg-6"
            ServicesImgUrlRight={
              pageDataList[3]?.location_image ?? "/images/services/4-min.png"
            }
            servicesImgAltRight={pageDataList[3]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            colum2={"col-lg-6 align-items-center d-flex"}
            ServicesHeadingRight={pageDataList[3]?.main_title ?? ""}
            ServicesDescriptionRight={pageDataList[3]?.main_description ?? ""}
            descrClass={"team_description  "}
            textBtnServicesRight="Read More"
            linkBtnServices={`services-detail?city=${pageDataList[3]?.city_type}`}
          />

          <ServicesRowLeft
            column1={"col-lg-6 d-flex align-items-center"}
            ServicesImgUrl={
              pageDataList[4]?.location_image ?? "/images/services/5-min.png"
            }
            servicesImgAlt={pageDataList[4]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            column2={"col-lg-6"}
            ServicesHeading={pageDataList[4]?.main_title ?? ""}
            ServicesDescription={pageDataList[4]?.main_description ?? ""}
            textBtnServices="Read More"
            linkBtnServices={`services-detail?city=${pageDataList[4]?.city_type}`}
          />

          <ServicesRightRow
            sectionServices={"services_sec_wrapper1"}
            colum1="col-lg-6"
            ServicesImgUrlRight={
              pageDataList[5]?.location_image ?? "/images/services/6-min.png"
            }
            servicesImgAltRight={pageDataList[5]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            colum2={"col-lg-6 align-items-center d-flex"}
            ServicesHeadingRight={pageDataList[5]?.main_title ?? ""}
            ServicesDescriptionRight={pageDataList[5]?.main_description ?? ""}
            descrClass={"team_description"}
            textBtnServicesRight="Read More"
            linkBtnServices={`services-detail?city=${pageDataList[5]?.city_type}`}
          />

          <ServicesRowLeft
            column1={"col-lg-6 d-flex align-items-center"}
            ServicesImgUrl={
              pageDataList[6]?.location_image ?? "/images/services/8-min.png"
            }
            servicesImgAlt={pageDataList[6]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            column2={"col-lg-6"}
            ServicesHeading={pageDataList[6]?.main_title ?? ""}
            ServicesDescription={pageDataList[6]?.main_description ?? ""}
            textBtnServices="Read More"
          />
          <ServicesRightRow
            sectionServices={"services_sec_wrapper1"}
            colum1="col-lg-6"
            ServicesImgUrlRight={
              pageDataList[7]?.location_image ?? "/images/services/7-min.png"
            }
            servicesImgAltRight={pageDataList[7]?.main_title ?? defaultAltText}
            servicesImgClass="services_img"
            colum2={"col-lg-6 align-items-center d-flex"}
            ServicesHeadingRight={pageDataList[7]?.main_title ?? ""}
            ServicesDescriptionRight={pageDataList[7]?.main_description ?? ""}
            descrClass={"team_description "}
            textBtnServicesRight="Read More"
            linkBtnServices={`services-detail?city=${pageDataList[7]?.city_type}`}
          />
        </main>
      </MainLayout>
    </div>
  );
};

export default Services;
