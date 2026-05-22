"use client";

import CountUp from "react-countup";
import Image from "next/image";

const CounterRow = (props) => {
  return (
    <div className="modern-excellence-wrapper w-100">
      <style dangerouslySetInnerHTML={{__html: `
        .modern-excellence-wrapper { padding: 1rem 0; }
        
        .excellence-image-container {
            position: relative; width: 100%; height: 100%; min-height: 400px;
            border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .excellence-img { object-fit: cover; object-position: center; }
        
        .excellence-content {
            display: flex; flex-direction: column; justify-content: center;
            height: 100%; padding-left: 2rem;
        }
        .excellence-desc {
            font-size: 1.1rem; line-height: 1.6; color: #444; margin-bottom: 2.5rem; text-align: left !important;
        }
        
        .stat-grid {
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 2.5rem;
        }
        .stat-card {
            background: #ffffff; padding: 1.5rem; border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid #f0f0f0;
            transition: transform 0.3s ease, box-shadow 0.3s ease; text-align: left;
        }
        .stat-card:hover {
            transform: translateY(-5px); box-shadow: 0 10px 25px rgba(255,145,77,0.15); border-color: #ffe0cc;
        }
        .stat-number {
            color: #ff914d; font-size: 2.5rem; font-weight: 800; line-height: 1; margin-bottom: 0.5rem;
            font-family: var(--font-outfit), sans-serif;
        }
        .stat-label {
            color: #171717; font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
        }
        
        .excellence-actions { display: flex; gap: 1rem; }
        .btn-primary-modern {
            background: #ff914d; color: white !important; padding: 14px 32px; border-radius: 8px;
            font-weight: 600; text-decoration: none; transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 145, 77, 0.3);
        }
        .btn-primary-modern:hover { background: #e67d3c; transform: translateY(-2px); }
        .btn-outline-modern {
            background: transparent; color: #171717 !important; border: 2px solid #171717;
            padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none;
            transition: all 0.3s ease;
        }
        .btn-outline-modern:hover { background: #171717; color: white !important; transform: translateY(-2px); }

        @media (max-width: 991px) {
            .excellence-content { padding-left: 0; padding-top: 2rem; }
            .excellence-image-container { min-height: 350px; }
        }
        @media (max-width: 576px) {
            .excellence-actions { flex-direction: column; }
            .btn-primary-modern, .btn-outline-modern { text-align: center; width: 100%; }
            .stat-grid { grid-template-columns: 1fr; }
            .stat-card { text-align: center; }
            .excellence-desc { text-align: center !important; }
        }
      `}} />

      <div className="container">
        <div className="row align-items-stretch g-4 g-lg-5 mx-0">
          
          <div className="col-lg-6">
            <div className="excellence-image-container">
              {props.ImgCounter && (
                <Image
                  src={props.ImgCounter}
                  className={props.ImgCounterClass || "excellence-img"}
                  alt={props.imgAltCounter || props.titleHeadingCounter || "Celebrating Excellence Statistics"} 
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  quality={100}
                />
              )}
            </div>
          </div>

          <div className="col-lg-6 px-0">
            <div className="excellence-content">
              
              {/* 🌟 FIX: Restored Exact Heading Rendering */}
              <h2 className="h3 font_about fw-bolder mb-4">
                {props.titleHeadingCounter}
                <span className={props.subHeadingClassCounter}>
                  {props.subHeadingCounter}
                </span>
              </h2>

              <p className="excellence-desc">{props.descriptionCounter}</p>

              <div className="stat-grid">
                {/* 🌟 FIX: Hardcoded Labels exactly as requested to remove the # issue */}
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

              <div className="excellence-actions mt-3">
                {props.btnLink && (
                  <a 
                    className="btn-primary-modern" 
                    href={props.btnLink}
                    aria-label={props.textAboutBtnCounter} 
                  >
                    {props.textAboutBtnCounter}
                  </a>
                )}

                {props.btnLink2 && (
                  <a 
                    className="btn-outline-modern" 
                    href={props.btnLink2}
                    aria-label={props.textAboutBtnCounter2} 
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
    <div className="stat-card">
      <div className="stat-number">
        <CountUp
          start={0}
          end={safeEnd}
          duration={Number(duration) || 2.5}
          suffix={suffix || ""}
          enableScrollSpy={true} 
          scrollSpyOnce={true}   
        />
      </div>
      <div className="stat-label">
        {label && label.split("\n").map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </div>
    </div>
  );
};

export default CounterRow;