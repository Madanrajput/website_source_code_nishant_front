import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import BackgroundImageRow from "../components/BackgroundImageRow";
import TeamGallery from "../components/TeamGallery";
import MainLayout from "../layouts/MainLayout";
export const metadata = {
  title: "Step Into The Team's Gallery Of High Creation Interior",
  description:
    "Team of expert interior designers in Noida & Delhi NCR · High Creation Interior Team · Noida & Delhi NCR",
};

const TeamGallerys = () => {
  return (
    <div>
      <head>
        <title>
        Step Into The Teams Gallery Of High Creation Interior	
        </title>
        <meta
          name="description"
          content="Team of expert interior designers in Noida & Delhi NCR · High Creation Interior Team · Noida & Delhi NCR	"
        />
        <link rel="canonical" href="https://hcinterior.in/team" />	
      </head>
      <MainLayout>
        <main>
          {/* <BackgroundImageWithHeading 
          
            sectionBgImages={"contact_wrapper teamsImage"}
            sectionBgHeading="Behind every success story is a passionate team — meet the people who bring our vision to life every day"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          /> */}

<BackgroundImageRow
            sectionBgImages={"sectionbg teamsImage"}
            sectionBgHeading="Teams"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription="Behind every success story is a passionate team — meet the people who bring our vision to life every day
"
            secBgDesClass="secbgbesclass"
          />

          <TeamGallery />
        </main>
      </MainLayout>
    </div>
  );
};

export default TeamGallerys;
