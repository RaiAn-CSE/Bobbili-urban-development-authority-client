import React from "react";
// import Lottie from "lottie-react";
// import LoadingAnimation from "../../assets/loading.json";

const Loading = () => {
  return (
    // <div className="flex flex-col justify-center items-center">
    //   <Lottie
    //     animationData={LoadingAnimation}
    //     loop={true}
    //     className="w-[50%] lg:w-[30%]"
    //   />
    //   <p className="text-xl lg:text-2xl font-bold">Loading...</p>
    // </div>
    <>
      <div className="spinnerContainer">
        <div className="spinner"></div>
        <div className="loader font-bold">
          <p>Loading</p>
          <div className="words">
            <span className="word">icons</span>
            <span className="word">values</span>
            <span className="word">images</span>
            <span className="word">charts</span>
            <span className="word">colors</span>
          </div>
        </div>
        <div className="typing-indicator">
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
