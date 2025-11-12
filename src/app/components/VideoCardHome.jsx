"use client";
import React, { useState } from "react";
const VideoThumbnail = ({ videoUrl, imageUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-thumbnail">
      {isPlaying ? (
        <iframe
          src={videoUrl}
          title="Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="video-frame"
        ></iframe>
      ) : (
        <div
          className="thumbnail"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <button onClick={handlePlay} className="play-button">
            {/* ▶️ */}
            <img src="/images/circle_play.png" width={40} alt="play"  fetchpriority="high"
  loading="eager"
  data-no-lazy="1" />
          </button>
        </div>
      )}

      <style jsx>{`
        .video-frame {
          width: 100%;
          height: 85vh;
          border: none;
          background: transparent;
        }

        .video-thumbnail {
          position: relative;
          width: 100%;
          margin: 0 auto;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          height: 580px;
        }

        .thumbnail {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          background-size: cover;
          background-position: center;
        }

        .play-button {
          position: absolute;
          top: 36%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          background: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        @media screen and (max-width: 767px) {
          .thumbnail {
            height: 400px;
          }
          .video-thumbnail {
            height: 400px;
          }
          .play-button {
            top: 45%;
          }
          .video-frame{
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoThumbnail;
