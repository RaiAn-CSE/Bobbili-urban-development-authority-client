import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/loading.json";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        animationData={LoadingAnimation}
        loop={true}
        className="w-[50%] lg:w-[30%]"
      />
      <p className="text-xl lg:text-2xl font-bold">Loading...</p>
    </div>
  );
};

export default Loading;
