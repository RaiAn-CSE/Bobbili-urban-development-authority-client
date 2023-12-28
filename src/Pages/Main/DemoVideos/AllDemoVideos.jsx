import React from "react";

const AllDemoVideos = ({ videoInfo, setActiveVideo }) => {

  return (
    <div
      className="flex mb-3 flex-col bg-white rounded-md overflow-hidden font-serif cursor-pointer"
      onClick={() => setActiveVideo(videoInfo)}
    >
      {/* image part  */}
      <div className="w-full">
        <img
          src={videoInfo.thumbnailImg}
          alt={videoInfo.title}
          className="object-cover rounded-lg"
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
