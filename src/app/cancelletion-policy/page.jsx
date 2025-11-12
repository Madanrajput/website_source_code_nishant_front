import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
export const metadata = {
  title: "Cancellation Policy - High Creation Interior",
  description:
    "Understand the terms and conditions for canceling design projects, including timelines, fees, and other important information.",
};
const CancelletionPolicy = () => {
  return (
    <div>
       <head>
        <title>Cancellation Policy - High Creation Interior	</title>
        <meta
          name="description"
          content="Understand the terms and conditions for canceling design projects, including timelines, fees, and other important information.	"
        />
          <link rel="canonical" href="https://hcinterior.in/cancelletion-policy" />	
      </head>

      <MainLayout>
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper cancelation_policy_banner"}
          sectionBgHeading="Cancelletion Policy"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Get all the information you need"
          secBgDesClass={"text-center text-white"}
        />
        <section className="privacy my-5">
          <div className="container">
            <div className="text-center row mx-0">
              <h2>High Creation Interior</h2>
              <h3>
                <span className="font_stylish" style={{ color: "#ff914d" }}>
                  Cancelletion Policy
                </span>
              </h3>
            <div className="pt-4 table">
            <table className="pt-4">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Time Period </th>
                    <th>Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Project Booking</td>
                    <td>
                      In the project cancellation request received within 48H
                      from order booking
                    </td>
                    <td>100% Refund</td>
                  </tr>
                  <tr>
                    <td>Design In Progress</td>
                    <td>
                      If cancellation request received after 48H from order
                      booking time
                    </td>
                    <td>
                      HCIPPL shall deduct 5% of project value as design PPT &
                      marketing cost. Balance amount shall be refund.
                    </td>
                  </tr>
                  <tr>
                    <td>Design In Progress</td>
                    <td>
                      If cancellation request received after 1week or starting
                      the design or designing team visit at site. (whichever is
                      earlier)
                    </td>
                    <td>
                      HCIPPL shall deduct all booking amount or 10% of project
                      value whichever is higher.
                    </td>
                  </tr>
                  <tr>
                    <td>Design In Progress /Site Work</td>
                    <td>
                      If cancellation request received after starting the site
                      work.
                    </td>
                    <td>
                      No Refund will be provided /Customer shall be obligated to
                      pay the balance of project Value if wooden work on
                      progress in factory.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </section>
        <hr />
      </MainLayout>
    </div>
  );
};

export default CancelletionPolicy;
