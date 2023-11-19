import React from "react";
import backgroundImageUrl from "../../assets/images/404page.svg";
import errorPageCss from "../../Style/Error404.module.css";
import Lottie from "lottie-react";
import ErrorAnim from "../../assets/Err.json";
import Space from "../../assets/images/lost-in-space-gif.webp";
import BlobImg from "../../assets/images/bloob.png";
import { Link, useNavigate } from "react-router-dom";
import emoji from "../../assets/user_logo/emoji404.svg";

const Error = () => {
  const navigate = useNavigate();
  return (
    // <div className="bg-cover bg-center h-screen font-sans" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
    //   <div className="min-h-screen relative">

    //     <div className={`${errorPageCss.ErrorContainer} absolute left-[250px] top-[12px]`}>
    //       {[...Array(21)].map((_, i) => (
    //         <div key={i} className={errorPageCss.ErrorItem} style={{ '--i': i }}></div>
    //       ))}
    //     </div>

    //     <div className={`${errorPageCss.planet} right-[200px] top-[75px]`}></div>

    //     <div className="flex flex-col items-center">
    //       <h1 className="text-[100px] text-violet-300 font-bold pt-[80px]">404</h1>
    //       <button className={`${errorPageCss.errorBtn} max-w-[200px] max-h-[70px]`}>Way to home</button>
    //     </div>

    //     <p className="text-2xl border rounded-lg border-violet-600 p-2 text-gray-200 font-bold absolute left-[170px] top-[100px]">You are lost</p>

    //   </div>
    // </div>

    <div className="flex min-h-screen items-center relative magicpattern text-black">
      <div className="basis-1/2 p-10">
        <p className="text-7xl font-sans font-bold">
          4
          <span className="inline-block text-[#8579F2] animate-bounce">
            <img className="w-14 h-14" src={emoji} alt="" />
          </span>
          4
        </p>
        <p className="font-poppins font-bold text-7xl">
          Lost in <span className="text-[#8579F2]">space</span>
        </p>
        <p className="w-[140px] h-[6px] mt-4 bg-[#001C46]"></p>
        <p className="text-gray-500 text-xl my-6">
          You have reached the edge of the universe. The page you requested
          could not be found. Don't worry and return to the previous page.
        </p>
        <div className="flex justify-end space-x-6 pt-20">
          <Link to={"/dashboard"} className="fancy-button rounded-full">
            go home
          </Link>
          <button
            className="px-8 outline outline-[#8579F2] save-btn rounded-full text-black  hover:bg-[#8579F2] hover:text-white"
            onClick={() => navigate(-1)}
          >
            back
          </button>
        </div>
      </div>
      <div className=" basis-1/2 h-screen flex">
        {/* <img src={BlobImg} className="absolute w-[100%] " /> */}
        {/* <img src={Space} className="w-[60%] h-[60%]" /> */}
        <Lottie animationData={ErrorAnim} loop={true} />
      </div>

      {/* circles  */}
      <div className="absolute top-0 left-1/2 w-[40px] h-[40px] rounded-full bg-[#8579F2]"></div>
      <div className="absolute top-2/3 right-3/4 w-[20px] h-[20px] rounded-full bg-[#8579F2]"></div>
      <div className="absolute top-1/2 right-0 w-[30px] h-[30px] rounded-full bg-[#8579F2]"></div>
      <div className="absolute bottom-9 left-3/4 w-[80px] h-[80px] rounded-full bg-[#8579F2]"></div>
      <div className="absolute top-10 right-2/3 w-[30px] h-[30px] rounded-full bg-[#8579F2]"></div>
    </div>
  );
};

export default Error;
