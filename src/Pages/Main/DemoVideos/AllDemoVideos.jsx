import React from "react";

const AllDemoVideos = ({ videoInfo, setActiveVideo }) => {
  console.log(videoInfo, "Video info");
  return (
    <div
      className="flex flex-col mb-3 bg-white rounded-md overflow-hidden font-serif cursor-pointer"
      onClick={() => setActiveVideo(videoInfo)}
    >
      {/* image part  */}
      <div className="w-full">
        <img
          src={videoInfo.thumbnailImg}
          alt={videoInfo.title}
          className="object-cover"
        />
      </div>
      {/* description part  */}
      <div className="text-base text-black text-start w-full font-titleFont capitalize p-3">
        {videoInfo.title}
      </div>
    </div>
  );
};

export default AllDemoVideos;
