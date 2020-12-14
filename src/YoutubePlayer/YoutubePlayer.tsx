/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// https://stackoverflow.com/questions/63247149/emotion-styled-hover-on-an-svg-component
// https://codesandbox.io/s/svg-gradient-react-button-1w26i?from-embed=&file=/src/index.js:923-946

const SvgYouTube: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="68" height="48" viewBox="0 0 68 48" {...props}>
    <path
      className="video__button-shape"
      d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
    ></path>
    <path className="video__button-icon" d="M 45,24 27,14 27,34"></path>
  </svg>
);

export const StyledSvgYouTube = styled(SvgYouTube)`
  .video__button-shape {
    fill: #212121;
    fill-opacity: 0.6;
  }
  .video__button-icon {
    fill: #ffffff;
  }
`;

export const StyledVideoBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background-color: #000000;

  .video__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .video__media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .video__button {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;

    padding: 0;
    width: 68px;
    height: 48px;
    border: none;
    background-color: transparent;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .video__button:focus {
    outline: none;
  }

  &:hover .video__button-shape,
  .video__button:focus .video__button-shape {
    fill: #ff0000;
    fill-opacity: 1;
  }

  .video--enabled {
    cursor: pointer;
  }

  .video--enabled .video__button {
    display: block;
  }
`;

interface VideoBoxFinProps {
  youtube_id: string;
  youtube_video_name: string;
}

export const VideoBoxFin: React.FC<VideoBoxFinProps> = ({
  youtube_id,
  youtube_video_name,
}) => {
  const [showVideo, setShowVideo] = useState(false);

  function clickHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    setShowVideo(true);
  }

  function generateURL() {
    const query = "?rel=0&showinfo=0&autoplay=1";

    return "https://www.youtube.com/embed/" + youtube_id + query;
  }

  return (
    <React.Fragment>
      {showVideo && (
        <StyledVideoBox className="video">
          <iframe
            className="video__media"
            allowFullScreen
            allow="autoplay"
            src={generateURL()}
          ></iframe>
        </StyledVideoBox>
      )}
      {!showVideo && (
        <StyledVideoBox className="video">
          <a
            className="video__link"
            href={"https://youtu.be/" + youtube_id}
            onClick={clickHandler}
          >
            <picture>
              <source
                srcSet={
                  "https://i.ytimg.com/vi_webp/" +
                  youtube_id +
                  "/maxresdefault.webp"
                }
                type="image/webp"
              />
              <img
                className="video__media"
                src={
                  "https://i.ytimg.com/vi/" + youtube_id + "/maxresdefault.jpg"
                }
                alt={youtube_video_name}
              />
            </picture>
          </a>
          <button
            className="video__button"
            aria-label="Запустить видео"
            onClick={clickHandler}
          >
            <StyledSvgYouTube />
          </button>
        </StyledVideoBox>
      )}
    </React.Fragment>
  );
};

export const BoxedVideoDiv = styled.div`
  width: 600px;
`;

/*
<img src="//img.youtube.com/vi/JMJXvsCLu6s/default.jpg" width="120" height="90">
<img src="//img.youtube.com/vi/JMJXvsCLu6s/mqdefault.jpg" width="320" height="180">
<img src="//img.youtube.com/vi/JMJXvsCLu6s/hqdefault.jpg" width="480" height="360">
<img src="//img.youtube.com/vi/JMJXvsCLu6s/sddefault.jpg" width="640" height="480">
<img src="//img.youtube.com/vi/JMJXvsCLu6s/maxresdefault.jpg">


Полный список обложек youtube:
http://img.youtube.com/vi//default.jpg
http://img.youtube.com/vi//hqdefault.jpg
http://img.youtube.com/vi//mqdefault.jpg
http://img.youtube.com/vi//sddefault.jpg
http://img.youtube.com/vi//maxresdefault.jpg
 */
