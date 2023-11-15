import React from "react";
import backgroundImageUrl from '../../assets/images/404page.svg';

const Error = () => {
  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="relative">
        <div className="planet right-[200px] top-[75px]">
        </div>
      </div>
    </div>
  );
};

export default Error;
