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
            <img src="/images/circle_play.png" width={30} alt="play" />
          </button>
        </div>
      )}
      <style jsx>{`
        /* styles/VideoThumbnail.module.css */
        .video-thumbnail {
          position: relative;
          width: 100%;
          margin: 0 auto;
          height: 350px !important;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
          top: 50%;
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

        .video-frame {
          width: 100%;
          height: 100%;
          border: none;
        }
        @media screen and (max-width: 767px) {
          .thumbnail {
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoThumbnail;
