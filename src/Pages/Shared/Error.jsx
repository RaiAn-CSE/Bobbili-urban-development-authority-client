import React from "react";
import Lottie from "lottie-react";
import ErrorAnimation from "../../assets/error.json";

const Error = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={ErrorAnimation} loop={true} />
    </div>
  );
};

export default Error;
