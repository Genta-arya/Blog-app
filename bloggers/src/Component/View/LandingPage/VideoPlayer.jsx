import React from "react";
import YouTube from "react-youtube";

const VideoPlayer = () => {
  // YouTube video options
  const opts = {
    height: "360", // Set the height of the video player (in pixels)
    width: "640", // Set the width of the video player (in pixels)
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <YouTube
        videoId="_jSZjyJsjTM" // Replace with your YouTube video ID
        opts={opts}
      />
    </div>
  );
};

export default VideoPlayer;
