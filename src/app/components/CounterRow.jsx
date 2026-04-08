"use client";

import CountUp from "react-countup";
import Image from "next/image";

const CounterRow = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row mx-0">
          <div className="col-lg-6">
            {props.ImgCounter && (
              <Image
                src={props.ImgCounter}
                className={props.ImgCounterClass}
                alt={props.imgAltCounter || props.titleHeadingCounter || "Celebrating Excellence Statistics"} // 🌟 SEO FIX
                width={600}
                height={400}
                priority={true} 
                style={{ height: "auto", width: "100%" }}
              />
            )}
          </div>

          <div className="col-lg-6 px-0">
            <div className={props.divClassCounter}>
{/* 🌟 SEO FIX: Changed h3 to h2 */}
<h2 className="h3 font_about">
  {props.titleHeadingCounter}
  <span className={props.subHeadingClassCounter}>
    {props.subHeadingCounter}
  </span>
</h2>

              <div className="d-flex row justify-content-end pb-3 pt-3 mt-3 pt-lg-5">
                <CounterBlock
                  end={props.counterEnd}
                  duration={props.counterDuration}
                  suffix={props.counterSuffix}
                  label={`Renovations\nAccomplished`}
                />
                <CounterBlock
                  end={props.counterEnd2}
                  duration={props.counterDuration2}
                  suffix={props.counterSuffix2}
                  label={`Delighted\nCustomers`}
                />
                <CounterBlock
                  end={props.counterEnd3}
                  duration={props.counterDuration3}
                  suffix={props.counterSuffix3}
                  label={`Staff`}
                />
                <CounterBlock
                  end={props.counterEnd4}
                  duration={props.counterDuration4}
                  suffix={props.counterSuffix4}
                  label={`Years of\nProficiency`}
                />
              </div>

              <p className="team_description text-start">{props.descriptionCounter}</p>

              <div className="mt-3 mt-lg-5 d-flex justify-content-end">
                {props.btnLink && (
                  <a 
                    className={props.textAboutBtnCLass} 
                    href={props.btnLink}
                    aria-label={props.textAboutBtnCounter} // 🌟 SEO FIX
                  >
                    {props.textAboutBtnCounter}
                  </a>
                )}

                {props.btnLink2 && (
                  <a 
                    className={props.textAboutBtnCLass2} 
                    href={props.btnLink2}
                    aria-label={props.textAboutBtnCounter2} // 🌟 SEO FIX
                  >
                    {props.textAboutBtnCounter2}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterBlock = ({ end, duration, suffix, label }) => {
  let safeEnd = 0;
  try {
    if (end !== undefined && end !== null) {
      const sanitized = String(end).replace(/,/g, '');
      const parsed = parseInt(sanitized, 10);
      if (!isNaN(parsed)) safeEnd = parsed;
    }
  } catch (error) {
    safeEnd = 0;
  }

  return (
    <div className="pe-4 col-lg-3 col-md-3 col-6">
      <CountUp
        className="fs-2 fw-bolder counter_number"
        start={0}
        end={safeEnd}
        duration={Number(duration) || 2.5}
        suffix={suffix || ""}
        enableScrollSpy={true} 
        scrollSpyOnce={true}   
      />
      <p className="team_designation">
        {label && label.split("\n").map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </p>
    </div>
  );
};

export default CounterRow;