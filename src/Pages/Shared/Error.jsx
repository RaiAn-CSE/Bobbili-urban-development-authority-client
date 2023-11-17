import React from "react";
import backgroundImageUrl from '../../assets/images/404page.svg';
import errorPageCss from '../../Style/Error404.module.css'

const Error = () => {
  return (
    <div className="bg-cover bg-center h-screen font-sans" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="min-h-screen relative">

        <div className={`${errorPageCss.ErrorContainer} absolute left-[250px] top-[12px]`}>
          {[...Array(21)].map((_, i) => (
            <div key={i} className={errorPageCss.ErrorItem} style={{ '--i': i }}></div>
          ))}
        </div>

        <div className={`${errorPageCss.planet} right-[200px] top-[75px]`}></div>

        <div className="flex flex-col items-center">
          <h1 className="text-[100px] text-violet-300 font-bold pt-[80px]">404</h1>
          <button className={`${errorPageCss.errorBtn} max-w-[200px] max-h-[70px]`}>Way to home</button>
        </div>

        <p className="text-2xl border rounded-lg border-violet-600 p-2 text-gray-200 font-bold absolute left-[170px] top-[100px]">You are lost</p>

      </div>
    </div>
  );
};

export default Error;
