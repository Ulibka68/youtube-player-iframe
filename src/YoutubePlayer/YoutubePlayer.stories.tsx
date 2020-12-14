import React from "react";
import { StyledSvgYouTube, VideoBoxFin, BoxedVideoDiv } from "./YoutubePlayer";

export default {
  title: "YoutubePlayer",
};

export const StyledSvgDemo = () => <StyledSvgYouTube />;
export const StyledVideoBoxDemo = () => (
  <BoxedVideoDiv>
    <VideoBoxFin youtube_id="0XxjHcz7yHo" youtube_video_name="девушки" />;
  </BoxedVideoDiv>
);
