import React from "react";
import backgroundImageUrl from '../../assets/images/404page.svg';

const Error = () => {
  return (
    <div className="bg-cover bg-center h-screen font-sans" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="min-h-screen relative">
        <div className="">
          <h1 className="text-[100px] text-gray-400 font-bold text-center pt-32">404</h1>
          <p className="text-2xl text-gray-400 font-bold text-center">You are lost</p>
        </div>
        <div className="planet right-[200px] top-[75px]">
        </div>
      </div>
    </div>
  );
};

export default Error;
