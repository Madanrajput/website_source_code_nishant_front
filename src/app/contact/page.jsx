"use client";
import api from "@/utils/api";
import MainLayout from "../layouts/MainLayout";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNo: "",
    email: "",
    place: "",
    query: "",
    termsAccepted: false,
  });

  // State to handle errors and success messages
  const [submissionError, setSubmissionError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({ ...prevData, termsAccepted: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if terms are accepted
    if (!formData.termsAccepted) {
      setSubmissionError(
        "You must agree to the Terms & Conditions before submitting."
      );
      return;
    }

    // console.log("Form Data being submitted: ", formData);  // Log data to check format
    const formRequestData = {
      name: formData.fullName,
      mobile: formData.contactNo,
      email: formData.email,
      place: formData.place,
      query: formData.query,
    };

    try {
      // Send POST request to save form data
      const response = await api.post("/user-queries", formRequestData);

      // Handle success response
      if (response.status === 201) {
        setSubmissionMessage("Form submitted successfully!");
        setFormData({
          fullName: "",
          contactNo: "",
          email: "",
          place: "",
          query: "",
          termsAccepted: false,
        });
        setTimeout(() => {
          window.location.href = "/thank-you";

      }, 300); 
      } else {
        setSubmissionError("Failed to submit form. Please try again.");
      }
    } catch (error) {
      setSubmissionError("Error submitting form. Please try again.");
      console.error("Error:", error);
    } finally {
      // Clear error message after some time
      setTimeout(() => {
        setSubmissionError("");
        setSubmissionMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      <head>
        <title>Book Free Consultation With High Creation Interior Noida </title>
        <meta
          name="description"
          content="Make a call on +91 98105 03881 for top notch interior designing services in Noida. Address : H-56, 1st Floor, Sector-63, Noida, Uttar Pradesh- 201301"
        />
        <link rel="canonical" href="https://hcinterior.in/contact" />	
      </head>
      <MainLayout>
        <main>
          <section className="contact_wrapper banner_contact">
            <div className="container">
              <div className="row mx-0">
                <div className="py-5 col-lg-8 d-flex align-item-center">
                  <div className="pe-lg-5">
                    <h1 className="mt-4 text-white">Contact Us</h1>
                    <p className="text-white">
                      For inquiries regarding Any interior design service or
                      expert <br />
                      advice please reach out to us using the following contact{" "}
                      <br />
                      information
                    </p>
                    <p className="text-white">
                      Email Id :{" "}
                      <a href="mailto:info@hcinterior.in" className="text-white">info@hcinterior.in </a>, 

                       <a href="mailto:care@hcinterior.in" className="text-white"> care@hcinterior.in</a> 
                    </p>
                    <p className="text-white">
                      For Inquiry : <a href="tel:9810506301" className="text-white">+91-9810506301</a>
                    </p>
                    <p className="text-white">
                      Customer care :{" "}
                      <a href="tel:1800-1200-532" className="text-white">1800-1200-532</a>
                    </p>

                    <h6 className="fw-bolder">Branch Office</h6>
                    <p className="text-white">
                      H101, LGF, Sector-63, Noida, <br />
                      Uttar Pradesh- 201301
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="contact_form contact">
                    <h4 className="mb-3 text-black form_heading">
                      Let’s Connect
                    </h4>
                    <form className="row" onSubmit={handleSubmit}>
                      {submissionMessage && (
                        <div className="text-center alert alert-success alert-dismissible fade show">
                          {submissionMessage}
                        </div>
                      )}
                      {submissionError && (
                        <div className="text-center alert alert-danger alert-dismissible fade show">
                          {submissionError}
                        </div>
                      )}

                      <div className="mb-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="contactNo"
                          placeholder="Contact No."
                          value={formData.contactNo}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-3 col-md-12">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3 col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          name="place"
                          value={formData.place}
                          onChange={handleInputChange}
                          placeholder="Place"
                          required
                        />
                      </div>

                      <div className="mb-3 col-md-12">
                        <textarea
                          className="form-control"
                          name="query"
                          placeholder="Query"
                          rows="3"
                          value={formData.query}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="invalidCheck"
                            checked={formData.termsAccepted}
                            onChange={handleCheckboxChange}
                            required
                          />
                          <label
                            className="text-black form-check-label"
                            htmlFor="invalidCheck"
                          >
                            Accept Terms & Conditions
                          </label>
                          <div className="text-black invalid-feedback">
                            You must agree before submitting.
                          </div>
                        </div>
                      </div>

                      <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                        <button className="px-5 know_more" type="submit">
                          SEND
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container my-5 map">
            <div className="row mx-0">
              <div className="col-lg-6">
                <h2 className="pb-4">Explore us on Map</h2>
                <h5>Branch Office</h5>
                <p><b>H101, LGF, Sector-63, Noida, Uttar Pradesh- 201301</b></p>
                <p><b>H-56, 1st Floor, Sector-63, Noida, Uttar Pradesh- 201301</b></p>
                {/* <p>17, Vikas Vihar, Mohanpuri, Meerut, Uttar Pradesh- 250001</p> */}
                <p><b>
                4th Floor, Jmd Galleria Mall, Unit Nos. 402, Sector-47 & 48, Sohna - Gurgaon Rd, Gurugram, Haryana 122001
                </b></p>
                <h5 className="pt-2">Workshop</h5>
                <p><b>
                  Plot No-3, Sorkha Village , Sector-115, Noida, Uttar Pradesh-
                  201301</b>
                </p>
              </div>
              <div className="col-lg-6">
                <div className="">
                  <div className="rounded map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.086690960129!2d77.3736059745727!3d28.62716378432606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce935de2f5987%3A0x4333ffee08ad5270!2sHigh%20Creation%20Interior%20-%20Best%20Home%20And%20Office%20Interior%20Designer%20In%20Noida!5e0!3m2!1sen!2sin!4v1727021310878!5m2!1sen!2sin"
                      width="100%"
                      height="500"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <hr />
      </MainLayout>
      <style jsx>{`
        .contact_wrapper  p {
        font-size:16px;
        }
      `}</style>

    </div>
  );
};

export default Contact;
