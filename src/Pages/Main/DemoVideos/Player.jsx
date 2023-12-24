import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import ReactPlayer from "react-player";

const Player = ({ videoUrl = "https://www.youtube.com/watch?v=LXb3EKWsInQ", videoTitle = "COSTA RICA IN 4K 60fps HDR (ULTRA HD)" }) => {

  return (
    <div className="w-full h-full">
      <div className="w-full h-[75%] rounded-lg overflow-hidden">
        <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
      </div>

      <p className="font-bold text-start mt-4 text-black text-xl z-10">
        {videoTitle}
      </p>

      <p className="text-sm font-bold text-start flex items-center gap-1 text-normalViolet">
        <span>Bobbili Urban Development Authority</span>
        <FaCheckCircle size={12} />
      </p>

      {/* <p className="text-xs text-start">Residential Building Plan Approva</p> */}
    </div>
  );
};

export default Player;
