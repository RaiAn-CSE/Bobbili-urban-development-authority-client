import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import customScroll from "../../../Style/Scrollbar.module.css";

const Home = () => {
  const path = useLocation().pathname;
  console.log(path);
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const hoverGradientColor =
    "hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500";

  const active = "font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500";
  const menu = (
    <>
      <Link
        to="/"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg ${hoverGradientColor} ${
          path.length === 1 && path.includes("/") ? active : ""
        }`}
      >
        Application Search
      </Link>
      <Link
        to="/onlinePayment"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b border-gray-200  ${hoverGradientColor} ${
          path.includes("onlinePayment") ? active : ""
        }`}
      >
        Online Payment
      </Link>
      <Link
        to="/listOfLTP"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm  border-b border-gray-200 ${hoverGradientColor} ${
          path.includes("listOfLTP") ? active : ""
        }`}
      >
        List of LTP's
      </Link>
      <Link
        to="/demoVideos"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b ${hoverGradientColor} ${
          path.includes("demoVideos") ? active : ""
        }`}
      >
        Demo Videos
      </Link>
      <Link
        to="/privacyPolicy"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm  border-b ${hoverGradientColor} ${
          path.includes("privacyPolicy") ? active : ""
        }`}
      >
        Privacy Policy
      </Link>
      <Link
        to="/defaultDrawingFormat"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b ${hoverGradientColor} ${
          path.includes("defaultDrawingFormat") ? active : ""
        }`}
      >
        Default Drawing Format
      </Link>
      <Link
        type="button"
        className="relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        Menu Item
      </Link>
    </>
  );
  return (
    <div className="grid grid-cols-[200px_minmax(700px,_1fr)_284px] pt-10">
      {/* sidebar menus  */}
      <div className="w-full h-full text-base flex flex-col justify-between  bg-black text-white border border-gray-200 rounded-lg">
        {menu}
      </div>

      {/* Scrollable content */}
      <div
        className={`${customScroll.customScrolling} bg-base-100 shadow-md rounded-lg mx-4  flex items-center dark:bg-white`}
      >
        <Outlet />
      </div>

      <Login />
    </div>
  );
};

export default Home;
