"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

// Dynamically import the CKEditor to prevent server-side rendering issues
const CKEditorComponent = dynamic(() => import('@/app/components/CKEditorComponent'), { ssr: false });

const CmsPages = () => {
    const authToken = useSelector((state) => state.auth.authToken);
    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: "",
        writer_name: "", // NEW: Added writer name
        content: "",
        status: "Draft",
    });

    const [formSeoContentData, setFormSeoContentData] = useState({
        slug: "",
        canonical_url: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        custom_code: "",
    });
    
    const [selectedId, setSelectedId] = useState(null);

    const fetchPages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("/cms-pages", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setPagesList(response.data);
            setLoading(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error fetching pages. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        if (authToken) fetchPages();
    }, [fetchPages, authToken]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const setContentData = (data) => {
        setFormData((prevData) => ({ ...prevData, content: data }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/cms-pages", formData, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.status === 201 || response.status === 200) {
                fetchPages();
                toast.success("Page created successfully.");
                setFormData({ title: "", writer_name: "", content: "", status: "Draft" });
                document.getElementById('addNewpageModalClose').click();
            } else {
                toast.error("Error creating page.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error submitting form.");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch(`/cms-pages/${selectedId}`, formData, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.status === 200) {
                fetchPages();
                toast.success("Page updated successfully.");
                setFormData({ title: "", writer_name: "", content: "", status: "Draft" });
                document.getElementById('editNewpageModalClose').click();
            } else {
                toast.error("Error updating page.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating page.");
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this page? This action cannot be undone.")) {
            try {
                const response = await api.delete(`/cms-pages/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });

                if (response.status === 200) {
                    fetchPages();
                    toast.success("Page deleted successfully.");
                } else {
                    toast.error("Failed to delete page.");
                }
            } catch (error) {
                toast.error("Failed to delete page.");
            }
        }
    };

    const handleEditClick = (item) => {
        setSelectedId(item.id);
        setFormData({
            title: item.title,
            writer_name: item.writer_name || "", // Set writer name for editing
            content: item.content,
            status: item.status || "Draft",
        });
    };

    const handleManageSeoContentClick = (id, item) => {
        setSelectedId(id);
        setFormSeoContentData({
            slug: item?.slug || "",
            canonical_url: item?.canonical_url || "",
            meta_title: item?.meta_title || "",
            meta_description: item?.meta_description || "",
            meta_keywords: item?.meta_keywords || "",
            custom_code: item?.custom_code || "",
        });
    };

    const handleSeoContentInputChange = (e) => {
        const { name, value } = e.target;
        setFormSeoContentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSeoContentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch(`/cms-pages/seo-content/${selectedId}`, formSeoContentData, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.status === 200) {
                fetchPages();
                toast.success("SEO Content saved successfully.");
                document.getElementById('seoContentModalClose').click();
            } else {
                toast.error("Error saving SEO content.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error saving SEO content.");
        }
    }

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Website Pages</h1>
                            <button
                                onClick={() => setFormData({ title: "", writer_name: "", content: "", status: "Draft" })}
                                type="button"
                                className="btn btn-primary px-4 shadow-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#addNewpageModal"
                            >
                                + Add New Page
                            </button>
                        </div>
                        
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                                <div className="mt-2 text-muted">Loading pages...</div>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle border" style={{ width: "100%" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th width="5%">SN</th>
                                            <th width="30%">Title</th>
                                            <th width="15%">Author</th> {/* NEW HEADER */}
                                            <th width="15%">Status</th>
                                            <th width="15%">SEO Settings</th>
                                            <th width="20%" className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagesList && pagesList.length > 0 ? pagesList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="fw-bold text-muted">{index + 1}</td>
                                                <td className="fw-semibold text-dark">{item.title}</td>
                                                <td className="text-muted">{item.writer_name || 'N/A'}</td> {/* DISPLAY AUTHOR */}
                                                <td>
                                                    <span className={`badge rounded-pill px-3 py-2 ${item.status === 'Published' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                        {item.status || 'Draft'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button 
                                                        onClick={() => handleManageSeoContentClick(item.id, item.seo_content || item)} 
                                                        className="btn btn-outline-info btn-sm" 
                                                        type="button" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#seoContentModal"
                                                    >
                                                        Manage SEO
                                                    </button>
                                                </td>
                                                <td className="text-end">
                                                    <button 
                                                        onClick={() => handleEditClick(item)} 
                                                        type="button" 
                                                        className="btn btn-sm btn-primary me-2 shadow-sm" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#editNewpageModal"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-danger shadow-sm" 
                                                        onClick={() => deleteHandler(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <td colSpan="6" className="text-center py-4 text-muted">
    No pages found. Click &quot;Add New Page&quot; to get started!
</td>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add New Page Modal */}
            <div className="modal fade" id="addNewpageModal" tabIndex="-1" aria-hidden="true" data-bs-focus="false">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold">Create New Page</h5>
                            <button type="button" id="addNewpageModalClose" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleAddSubmit}>
                            <div className="modal-body p-4 row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Page Title *</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="title"
                                        placeholder="e.g. About Our Company"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-bold">Author Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="writer_name"
                                        placeholder="e.g. Mukul"
                                        value={formData.writer_name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-bold">Visibility Status</label>
                                    <select 
                                        className="form-select form-select-lg" 
                                        name="status" 
                                        value={formData.status} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="Draft">Draft (Hidden)</option>
                                        <option value="Published">Published (Live)</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mt-4">
                                    <label className="form-label fw-bold">Page Content</label>
                                    <div className="border rounded">
                                        <CKEditorComponent pageData={formData.content} setPageData={setContentData} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary px-5" type="submit">Publish Page</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit Page Modal */}
            <div className="modal fade" id="editNewpageModal" tabIndex="-1" aria-hidden="true" data-bs-focus="false">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold">Edit Page</h5>
                            <button type="button" id="editNewpageModalClose" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-body p-4 row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Page Title *</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="title"
                                        placeholder="Page Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-bold">Author Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="writer_name"
                                        placeholder="e.g. Manish"
                                        value={formData.writer_name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-bold">Visibility Status</label>
                                    <select 
                                        className="form-select form-select-lg" 
                                        name="status" 
                                        value={formData.status} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="Draft">Draft (Hidden)</option>
                                        <option value="Published">Published (Live)</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mt-4">
                                    <label className="form-label fw-bold">Page Content (WordPress Editor)</label>
                                    <div className="border rounded">
                                        <CKEditorComponent pageData={formData.content} setPageData={setContentData} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary px-5" type="submit">Update Page</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* SEO Content Modal (Unchanged) */}
            <div className="modal fade" id="seoContentModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-info text-white">
                            <h5 className="modal-title fw-bold">Search Engine Optimization (SEO)</h5>
                            <button type="button" id="seoContentModalClose" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleSeoContentSubmit}>
                            <div className="modal-body p-4 row g-3">
                                <div className="col-md-12">
                                    <label className="form-label fw-bold">URL Slug</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light text-muted small">/</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="slug"
                                            placeholder="about-us"
                                            value={formSeoContentData.slug}
                                            onChange={handleSeoContentInputChange}
                                            required
                                        />
                                    </div>
                                    <small className="text-muted">This will be the page link (e.g. hcinterior.in/about-us)</small>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Meta Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_title"
                                        placeholder="Title shown on Google"
                                        value={formSeoContentData.meta_title}
                                        onChange={handleSeoContentInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Meta Description</label>
                                    <textarea
                                        className="form-control"
                                        name="meta_description"
                                        placeholder="Short description for search results"
                                        value={formSeoContentData.meta_description}
                                        onChange={handleSeoContentInputChange}
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Meta Keywords</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_keywords"
                                        placeholder="e.g. interior, design, home"
                                        value={formSeoContentData.meta_keywords}
                                        onChange={handleSeoContentInputChange}
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Canonical URL (Optional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="canonical_url"
                                        placeholder="https://..."
                                        value={formSeoContentData.canonical_url}
                                        onChange={handleSeoContentInputChange}
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Custom Head Scripts (Optional)</label>
                                    <textarea
                                        className="form-control"
                                        name="custom_code"
                                        placeholder="<script>...</script>"
                                        value={formSeoContentData.custom_code}
                                        onChange={handleSeoContentInputChange}
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer bg-light">
                                <button className="btn btn-info px-5 text-white fw-bold" type="submit">
                                    Save SEO Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthMainLayout>
    );
};

export default CmsPages;