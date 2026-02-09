"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Optimized navigation for Next.js
import api from "@/utils/api";

const ContactUsPopUp = ({ onModalStateChange }) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        contact: "",
        email: "",
        place: "",
        query: "",
        termsAndConditions: false,
    });

    const [submissionError, setSubmissionError] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData((prevData) => ({ ...prevData, termsAndConditions: checked }));
    };

    const handleClose = () => {
        setShowModal(false);
        if (onModalStateChange) onModalStateChange(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.termsAndConditions) {
            setSubmissionError("You must agree to the Terms & Conditions before submitting.");
            return;
        }

        const formRequestData = {
            name: formData.fullName,
            email: formData.email,
            mobile: formData.contact,
            place: formData.place,
            query: formData.query,
        };

        try {
            const response = await api.post("/user-queries", formRequestData);
            if (response.status === 201) {
                setSubmissionMessage("Form submitted successfully!");
                setFormData({
                    fullName: "",
                    contact: "",
                    email: "",
                    place: "",
                    query: "",
                    termsAndConditions: false,
                });
                
                // Close modal immediately on success
                handleClose();

                // Redirect using Next.js router after a short delay
                setTimeout(() => {
                    router.push("/thank-you");
                }, 300);
            } else {
                setSubmissionError("Failed to submit form. Please try again.");
            }
        } catch (error) {
            setSubmissionError("Error submitting form. Please try again.");
        } finally {
            setTimeout(() => {
                setSubmissionError("");
                setSubmissionMessage("");
            }, 5000);
        }
    };

    useEffect(() => {
        // Trigger popup after 12 seconds
        const timer = setTimeout(() => {
            setShowModal(true);
            if (onModalStateChange) onModalStateChange(true);
        }, 12000);

        return () => clearTimeout(timer);
    }, [onModalStateChange]);

    // Don't render anything if modal is hidden (cleaner DOM)
    if (!showModal) return null;

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} // Added semi-transparent bg overlay
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content contact_form contact">
                    <div className="modal-body">
                        <h4 className="mb-3 text-black form_heading d-flex justify-content-between">
                            Let&apos;s Connect
                            <i
                                type="button"
                                className="btn-close fs-6"
                                onClick={handleClose}
                                aria-label="Close"
                            ></i>
                        </h4>
                        <p>Get Your Dream Home Interior. Let Our experts help you</p>
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
                            
                            {/* Form Fields */}
                            <div className="mb-3 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    placeholder="Contact No."
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
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
                                    value={formData.query}
                                    onChange={handleInputChange}
                                    placeholder="Query"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="terms_and_conditions"
                                        id="termsAndConditions"
                                        checked={formData.termsAndConditions}
                                        onChange={handleCheckboxChange}
                                        required
                                    />
                                    <label className="text-black form-check-label" htmlFor="termsAndConditions">
                                        Accept Terms & Condition
                                    </label>
                                    {!formData.termsAndConditions && submissionError.includes("agree") && (
                                        <div className="text-danger small">
                                            You must agree before submitting.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                                <button className="px-5 btn know_more" type="submit">
                                    SEND
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPopUp;