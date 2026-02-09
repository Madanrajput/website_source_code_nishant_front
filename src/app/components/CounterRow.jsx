// import CountUp from "react-countup";
// const CounterRow = (props) => {
//   return (
//     <div>
//       <div className="container">
//         <div className="row mx-0">
//           <div className="col-lg-6">
//             <img
//               src={props.ImgCounter}
//               className={props.ImgCounterClass}
//               alt={props.imgAltCounter}
//               fetchPriority="high"
//               loading="eager"
//               data-no-lazy="1"
//             />
//           </div>
//           <div className="col-lg-6 px-0">
//             <div className={props.divClassCounter}>
//               {/* {props.CountUp ? ( */}
//               <h3 className="font_about">
//                 {props.titleHeadingCounter}
//                 <span className={props.subHeadingClassCounter}>
//                   {props.subHeadingCounter}
//                 </span>
//               </h3>
//               <div className="d-flex row justify-content-end pb-3 pt-3 mt-3 pt-lg-5">
//                <div className="pe-4 col-lg-3 col-md-3 col-6">
//                   <CountUp
//                     className="fs-2 fw-bolder counter_number"
//                     start={props.counterStart}
//                     end={props.counterEnd}
//                     duration={props.counterDuration}
//                     suffix={props.counterSuffix}
//                   />
//                   <p className="team_designation">
//                     Renovations <br />
//                     Accomplished
//                   </p>
//                 </div>
//             <div className="pe-4 col-lg-3 col-md-3 col-6">
//                   <CountUp
//                     className="fs-2 fw-bolder counter_number"
//                     start={props.counterStart2}
//                     end={props.counterEnd2}
//                     duration={props.counterDuration2}
//                     suffix={props.counterSuffix2}
//                   />
//                   <p className="team_designation">
//                     Delighted <br />
//                     Customers
//                   </p>
//                 </div>
//            <div className="pe-4 col-lg-3 col-md-3 col-6">
//                   <CountUp
//                     className="fs-2 fw-bolder counter_number"
//                     start={props.counterStart3}
//                     end={props.counterEnd3}
//                     duration={props.counterDuration3}
//                     suffix={props.counterSuffix3}
//                   />
//                   <p className="team_designation">
//                     Home <br />
//                     Renovations
//                   </p>
//                 </div>
//                 <div className="pe-4 col-lg-3 col-md-3 col-6">
//                   <CountUp
//                     className="fs-2 fw-bolder counter_number"
//                     start={props.counterStart4}
//                     end={props.counterEnd4}
//                     duration={props.counterDuration4}
//                     suffix={props.counterSuffix4}
//                   />
//                   <p className="team_designation">
//                     Years of <br />
//                     Proficiency
//                   </p>
//                 </div>
//               </div>

//               <p className="team_description">{props.descriptionCounter}</p>

//               <div className="mt-3 mt-lg-5 d-flex justify-content-end">
//                 <a className={props.textAboutBtnCLass} href={props.btnLink}>
//                   {props.textAboutBtnCounter}
//                 </a>

//                 <a className={props.textAboutBtnCLass2} href={props.btnLink2}>
//                   {props.textAboutBtnCounter2}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CounterRow;
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
                alt={props.imgAltCounter || "counter image"}
                width={600}
                height={400}
                priority
                style={{ height: "auto", width: "100%" }}
              />
            )}
          </div>

          <div className="col-lg-6 px-0">
            <div className={props.divClassCounter}>
              <h3 className="font_about">
                {props.titleHeadingCounter}
                <span className={props.subHeadingClassCounter}>
                  {props.subHeadingCounter}
                </span>
              </h3>

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
                  label={`Home\nRenovations`}
                />

                <CounterBlock
                  end={props.counterEnd4}
                  duration={props.counterDuration4}
                  suffix={props.counterSuffix4}
                  label={`Years of\nProficiency`}
                />
              </div>

              <p className="team_description">{props.descriptionCounter}</p>

              <div className="mt-3 mt-lg-5 d-flex justify-content-end">
                {props.btnLink && (
                  <a className={props.textAboutBtnCLass} href={props.btnLink}>
                    {props.textAboutBtnCounter}
                  </a>
                )}

                {props.btnLink2 && (
                  <a className={props.textAboutBtnCLass2} href={props.btnLink2}>
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

/* ---------------- SMALL SAFE COUNTER ---------------- */

const CounterBlock = ({ end, duration, suffix, label }) => {
  const safeEnd = Number(end) || 0;

  return (
    <div className="pe-4 col-lg-3 col-md-3 col-6">
      <CountUp
        className="fs-2 fw-bolder counter_number"
        start={0}
        end={safeEnd}
        duration={Number(duration) || 2}
        suffix={suffix || ""}
      />
      <p className="team_designation">
        {label.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

export default CounterRow;

