// import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
// import MainLayout from "../layouts/MainLayout";

// // --- CONFIGURATION ---
// export const revalidate = 60; // Regenerate page every 60 seconds

// // --- HELPER: Base URL Logic ---
// const getBaseUrl = () => {
//   return process.env.NODE_ENV === "development"
//     ? process.env.NEXT_PUBLIC_API_DEV_URL
//     : process.env.NEXT_PUBLIC_API_BASE_URL;
// };

// // --- HELPER: Fetch Cancellation Policy Content ---
// async function getCancellationPolicyContent() {
//   try {
//     const baseURL = getBaseUrl();
    
//     // Fetching the array of policy data
//     const res = await fetch(`${baseURL}/cms-content/cancellation_policy`, {
//       next: { revalidate: 60 }
//     });

//     if (!res.ok) {
//       console.error(`Failed to fetch cancellation policy: ${res.status}`);
//       return [];
//     }

//     const data = await res.json();
    
//     // Ensure we are returning an array
//     if (Array.isArray(data)) {
//       // Sort by ID ascending so that "Project Booking" (id 18) appears before "Phase 4" (id 21)
//       return data;
//     }
    
//     return [];
//   } catch (err) {
//     console.error("Cancellation Policy Content Fetch Error:", err);
//     return [];
//   }
// }

// // --- HELPER: Fetch SEO Data ---
// async function getSeoData() {
//   try {
//     const baseURL = getBaseUrl();
//     const res = await fetch(`${baseURL}/seo-tag`, {
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) return null;

//     const allTags = await res.json();

//     if (Array.isArray(allTags)) {
//       return allTags.find(
//         (tag) =>
//           tag.page_name === "https://hcinterior.in/cancelletion-policy" ||
//           tag.page_name === "https://hcinterior.in/cancellation-policy" ||
//           tag.page_name?.endsWith("/cancelletion-policy") ||
//           tag.page_name?.endsWith("/cancellation-policy")
//       );
//     }
//     return null;
//   } catch (err) {
//     console.error("SEO Fetch Error:", err);
//     return null;
//   }
// }

// // --- DYNAMIC METADATA GENERATION ---
// export async function generateMetadata() {
//   const seoData = await getSeoData();

//   const defaultTitle = "Cancellation Policy - High Creation Interior";
//   const defaultDesc =
//     "Understand the terms and conditions for canceling design projects, including timelines, fees, and other important information.";
//   const defaultCanonical = "https://hcinterior.in/cancelletion-policy";

//   return {
//     title: seoData?.title || defaultTitle,
//     description: seoData?.meta_description || defaultDesc,
//     alternates: {
//       canonical: seoData?.page_name || defaultCanonical,
//     },
//     openGraph: {
//       title: seoData?.title || defaultTitle,
//       description: seoData?.meta_description || defaultDesc,
//       url: seoData?.page_name || defaultCanonical,
//       type: "website",
//     },
//   };
// }

// // --- MAIN SERVER COMPONENT ---
// export default async function CancelletionPolicy() {
//   const policyData = await getCancellationPolicyContent();

//   return (
//     <MainLayout>
//       <BackgroundImageWithHeading
//         sectionBgImages={"contact_wrapper cancelation_policy_banner"}
//         sectionBgHeading="Cancellation Policy"
//         secBgHeadingClass="sec_bgheading_lass"
//         sectionBgDescription="Get all the information you need"
//         secBgDesClass={"text-center text-white"}
//       />
//       <section className="privacy my-5">
//         <div className="container">
//           <div className="text-center row mx-0">
//             <h2>High Creation Interior</h2>
//             <h3>
//               <span className="font_stylish" style={{ color: "#ff914d" }}>
//                 Cancellation Policy
//               </span>
//             </h3>
            
//             <div className="col-12 mt-4 text-start">
//               {policyData.length > 0 ? (
//                 <div className="table-responsive shadow-sm rounded">
//                   <table className="table table-bordered table-striped table-hover align-middle mb-0">
//                     <thead className="table-light">
//                       <tr>
//                         <th scope="col" className="py-3 px-4">Phase</th>
//                         <th scope="col" className="py-3 px-4">Time Period</th>
//                         <th scope="col" className="py-3 px-4">Eligibility / Details</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {policyData.map((item) => (
//                         <tr key={item.id}>
//                           <td className="py-3 px-4 fw-bold text-secondary">
//                             {item.json_content?.phase || "N/A"}
//                           </td>
//                           <td className="py-3 px-4">
//                             {item.json_content?.time_period || "N/A"}
//                           </td>
//                           <td className="py-3 px-4">
//                             {item.json_content?.eligibility || "N/A"}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="alert alert-info text-center" role="alert">
//                   No cancellation policy details are currently available. Please check back later.
//                 </div>
//               )}
//             </div>
            
//           </div>
//         </div>
//       </section>
//       <hr />
//     </MainLayout>
//   );
// }
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";

// --- CONFIGURATION ---
export const revalidate = 60;

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch SEO Data ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const allTags = await res.json();
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name?.endsWith("/cancelletion-policy") ||
          tag.page_name?.endsWith("/cancellation-policy")
      );
    }
    return null;
  } catch (err) {
    console.error("SEO Fetch Error:", err);
    return null;
  }
}

export async function generateMetadata() {
  const seoData = await getSeoData();
  const defaultTitle = "Cancellation Policy - High Creation Interior";
  const defaultDesc =
    "Understand our transparent cancellation and refund terms for your interior design projects.";
  const defaultCanonical = "https://hcinterior.in/cancelletion-policy";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: { canonical: seoData?.page_name || defaultCanonical },
  };
}

export default async function CancelletionPolicy() {
  return (
    <MainLayout>
      <BackgroundImageWithHeading
        sectionBgImages={"contact_wrapper cancelation_policy_banner"}
        sectionBgHeading="Cancellation Policy"
        secBgHeadingClass="sec_bgheading_lass"
        sectionBgDescription="Transparent policies for a trusted partnership"
        secBgDesClass={"text-center text-white"}
      />

      <section className="policy-content my-5 py-4">
        <div className="container">
          {/* Introduction & Trust Section */}
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">High Creation Interior</h2>
            <h3 className="mb-4">
              <span className="font_stylish" style={{ color: "#ff914d" }}>
                Our Cancellation & Refund Terms
              </span>
            </h3>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <p className="text-muted lead">
                  All charges are applicable due to resource allocation, design
                  efforts, and operational planning already undertaken by the
                  company to ensure the highest quality for your project.
                </p>
              </div>
            </div>
          </div>

          {/* Part 1: Full Cancellation Phases (Modern UI) */}
          <h4 className="border-bottom pb-2 mb-4 fw-bold">
            1. Full Cancellation Overview
          </h4>
          <div className="row g-4 mb-5">
            {/* Case 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-3">
                <div className="mb-3">
                  <span className="badge bg-success-subtle p-3 rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#198754"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7Z" />
                    </svg>
                  </span>
                </div>
                <h5 className="fw-bold">Early Request</h5>
                <p className="small text-secondary">
                  Within 7 days of booking (Before Designer alignment)
                </p>
                <div className="mt-auto">
                  <span className="h4 fw-bold text-success">100% Refund</span>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-3">
                <div className="mb-3">
                  <span className="badge bg-warning-subtle p-3 rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#ffc107"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg>
                  </span>
                </div>
                <h5 className="fw-bold">Project Handover</h5>
                <p className="small text-secondary">
                  After 7 days or Site Handover (Whichever is earlier)
                </p>
                <div className="mt-auto">
                  <span className="h5 fw-bold text-warning">
                    10% Non-Refundable
                  </span>
                  <p className="x-small text-muted mb-0">
                    of total project value
                  </p>
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-3">
                <div className="mb-3">
                  <span className="badge bg-danger-subtle p-3 rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#dc3545"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                      <path d="M9 3v1h4v2h-1v11c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V6H2V4h4V3h3zM4 6v10h7V6H4z" />
                    </svg>
                  </span>
                </div>
                <h5 className="fw-bold">Design Phase</h5>
                <p className="small text-secondary">
                  While design work is in progress
                </p>
                <div className="mt-auto">
                  <span className="h5 fw-bold text-danger">
                    20% Non-Refundable
                  </span>
                  <p className="x-small text-muted mb-0">
                    Design Consultancy Charges
                  </p>
                </div>
              </div>
            </div>

            {/* Case 4 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 bg-dark text-white text-center p-3">
                <div className="mb-3">
                  <span className="badge bg-secondary p-3 rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#fff"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </span>
                </div>
                <h5 className="fw-bold">Execution Phase</h5>
                <p className="small text-white-50">Site execution has commenced</p>
                <div className="mt-auto">
                  <span className="h5 fw-bold">No Refund</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-5" />

          {/* Part 2: Exact PDF Details Section */}
          <div className="pdf-exact-details bg-white p-4 p-md-5 rounded border shadow-sm">
            <h4 className="fw-bold mb-4 text-dark border-bottom pb-3">
              Official Policy Details & Conditions
            </h4>

            <div className="table-responsive mb-5">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: "30%" }}>Scenario</th>
                    <th scope="col" style={{ width: "40%" }}>Condition</th>
                    <th scope="col" style={{ width: "30%" }}>Applicable charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">Case 1: Cancellation requested within seven (7) days of booking amount receipt.</td>
                    <td>Cancellation request is received within 7 days of booking (Only Applicable if designer and operation team does not aligned for Project)</td>
                    <td>A full (100%) refund of the amount paid will be refund</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Case 2: Cancellation Requested after 7 Days or Site Handover (whichever is earlier)</td>
                    <td>Project has been handed over to Design/Ops team or 7 days has been completed</td>
                    <td>10% of the total project value is non-refundable</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Case 3: Design Phase in Progress</td>
                    <td>Design work is in progress</td>
                    <td>Twenty percent (20%) of the total project value shall be non-refundable as design consultancy charges.</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Case 4: Cancellation during the execution phase</td>
                    <td>Site execution has commenced and client requests cancellation</td>
                    <td>No refund shall be applicable.</td>
                  </tr>
                  
                  {/* Sub-header for Partial Cancellation */}
                  <tr className="table-secondary">
                    <td colSpan="3" className="fw-bold text-center">Partial cancellation - After Starting of design phase</td>
                  </tr>
                  
                  <tr>
                    <td className="fw-bold">Removal of items from the initially finalized BOQ by the client</td>
                    <td>Applicable only where the final BOQ remains equal to or greater than the initially finalized BOQ</td>
                    <td>No charges shall be applicable</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Removal of items from the initially finalized BOQ by the client.</td>
                    <td>Applicable where the final BOQ value is less than the initially finalized BOQ.</td>
                    <td>A service charge of twenty percent (20%) of the value of the removed line items shall be applicable</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Case 3: removal of existing or any additional items from the BOQ during discussion of design phase</td>
                    <td>Applicable only (3d design or 2D drawings any one of them should be done)</td>
                    <td>A design consultancy of 20% on the value of the removed items shall be applicable</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exact Examples from PDF */}
            <h5 className="fw-bold mb-4">Examples:</h5>
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light h-100">
                  <h6 className="fw-bold text-primary">Ex case 1:-</h6>
                  <p className="mb-2">Client books an order worth ₹15 lakh. Before design work (2D/3D) starts, the client:</p>
                  <ul className="mb-2">
                    <li>Removes work worth 5 lakh, and</li>
                    <li>Adds new work of ₹5 lakh or more.</li>
                  </ul>
                  <p className="fw-bold mb-1">Result: No service charge will be applied.</p>
                  <p className="text-muted small mb-0">Note: This applies only if 2D drawings or 3D designs have not been started yet.</p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light h-100">
                  <h6 className="fw-bold text-primary">Ex case 2: Order value: ₹15 lakh</h6>
                  <p className="mb-2">Design phase has already started design work (2D/3D) starts,</p>
                  <p className="mb-2">Client removes work worth ₹5 lakh</p>
                  <p className="fw-bold text-danger mb-0">Service Charge: 1 lakh (20% of ₹5 lakh) will be charged separately.</p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light h-100">
                  <h6 className="fw-bold text-primary">Ex Case 3: Initial order value: ₹15 lakh</h6>
                  <p className="mb-2">During design phase (2D/3D completed), BOQ increases to ₹20 lakh. If the client removes any item after this</p>
                  <p className="fw-bold text-danger mb-2">Service Charge: 20% of the removed item value will be charged separately.</p>
                  <p className="text-muted small mb-0">Note: In this case, Example 1 and Example 2 will not apply.</p>
                </div>
              </div>
            </div>

            {/* Final PDF Notes */}
            <div className="alert alert-warning border-warning" role="alert">
              <p className="mb-1">
               { "All charges are applicable due to resource allocation, design efforts, and operational planning already undertaken by the company."
}</p>
              <p className="mb-0 fw-bold">
 {               "Discount is not applicable in any type of either partial or full cancellation"
    }    </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}