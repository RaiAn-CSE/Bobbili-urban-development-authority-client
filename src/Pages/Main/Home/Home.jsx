import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import customScroll from "../../../Style/Scrollbar.module.css";

const Home = () => {
  const path = useLocation().pathname;
  console.log(path);
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  // const hoverGradientColor =
  //   "hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500";

  const hoverGradientColor = "hover:bg-[#8B5BF6] hover:text-white";

  const active = "nm_Container font-bold bg-[#8B5BF6] text-white";
  const menu = (
    <>
      <Link
        to="/"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-base border-b border-gray-200 rounded-t-lg ${hoverGradientColor} ${path.length === 1 && path.includes("/") ? active : ""
          }`}
      >
        Application Search
      </Link>
      <Link
        to="/onlinePayment"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-base border-b border-gray-200  ${hoverGradientColor} ${path.includes("onlinePayment") ? active : ""
          }`}
      >
        Online Payment
      </Link>
      <Link
        to="/listOfLTP"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-base  border-b border-gray-200 ${hoverGradientColor} ${path.includes("listOfLTP") ? active : ""
          }`}
      >
        List of LTP's
      </Link>
      <Link
        to="/demoVideos"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-base border-b ${hoverGradientColor} ${path.includes("demoVideos") ? active : ""
          }`}
      >
        Demo Videos
      </Link>
      <Link
        to="/privacyPolicy"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-base  border-b ${hoverGradientColor} ${path.includes("privacyPolicy") ? active : ""
          }`}
      >
        Privacy Policy
      </Link>
      <Link
        to="/defaultDrawingFormat"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-base border-b ${hoverGradientColor} ${path.includes("defaultDrawingFormat") ? active : ""
          }`}
      >
        Default Drawing Format
      </Link>
    </>
  );
  return (
    <div className="w-full grid lg:grid-cols-[200px_minmax(700px,_1fr)_284px] pt-6">
      {/* sidebar menus  */}
      <div className="nm_Container hidden lg:flex lg:flex-col z-[10] w-full text-base justify-between bg-[#E8EAEC] text-black border border-gray-200 rounded-lg">
        {menu}
      </div>

      {/* Scrollable content */}
      <div
        className={`${customScroll.customScrolling} nm_Container hidden lg:flex lg:h-[410px] rounded-lg mx-4 z-[10] items-center bg-[#E8EAEC]`}
      >
        <Outlet />
      </div>

      <div className="nm_Container z-[10] h-full overflow-hidden bg-[#E8EAEC]">
        <Login />
      </div>
    </div>
  );
};

export default Home;
