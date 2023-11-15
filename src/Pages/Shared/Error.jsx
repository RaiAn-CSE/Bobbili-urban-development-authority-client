import React from "react";
import backgroundImageUrl from '../../assets/images/404page.svg';
import errorPageCss from '../../Style/Error404.module.css'

const Error = () => {
  return (
    <div className="bg-cover bg-center h-screen font-sans" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="min-h-screen relative">

        <div className={`${errorPageCss.planet} right-[200px] top-[75px]`}></div>

        <div className="flex flex-col items-center">
          <h1 className="text-[100px] text-violet-300 font-bold pt-[80px]">404</h1>
          <button className={`${errorPageCss.errorBtn} max-w-[200px] max-h-[70px]`}>Way to home</button>
        </div>

        <p className="text-2xl text-violet-400 font-bold absolute right-[190px] top-[220px]">You are lost</p>

      </div>
    </div>
  );
};

export default Error;
