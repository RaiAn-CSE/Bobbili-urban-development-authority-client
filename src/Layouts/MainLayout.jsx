import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineDashboard } from "react-icons/md";

import { FiSun } from "react-icons/fi";

const MainLayout = () => {
  const path = useLocation().pathname;
  console.log(path);
  const active =
    "bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-md shadow-violetDark text-white border-none ";

  const notActive =
    "hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:text-white border border-violetLight";

  // const active = "font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    // console.log("theme" in localStorage);

    if (
      theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("dark:bg-black");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("dark:bg-black");
      localStorage.setItem("theme", "light");

      // console.log(theme);
    }
    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("dark:bg-black");
      localStorage.setItem("theme", "light");
    };
  }, [theme]);

<<<<<<< HEAD
=======
  const menu = (
    <>
      <Link
        to="/"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg ${hoverGradientColor} ${path.length === 1 && path.includes("/") ? active : ""
          }`}
      >
        Application Search
      </Link>
      <Link
        to="/onlinePayment"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b border-gray-200  ${hoverGradientColor} ${path.includes("onlinePayment") ? active : ""
          }`}
      >
        Online Payment
      </Link>
      <Link
        to="/listOfLTP"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm  border-b border-gray-200 ${hoverGradientColor} ${path.includes("listOfLTP") ? active : ""
          }`}
      >
        List of LTP's
      </Link>
      <Link
        to="/demoVideos"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b ${hoverGradientColor} ${path.includes("demoVideos") ? active : ""
          }`}
      >
        Demo Videos
      </Link>
      <Link
        to="/privacyPolicy"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm  border-b ${hoverGradientColor} ${path.includes("privacyPolicy") ? active : ""
          }`}
      >
        Privacy Policy
      </Link>
      <Link
        to="/defaultDrawingFormat"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b ${hoverGradientColor} ${path.includes("defaultDrawingFormat") ? active : ""
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
>>>>>>> raian
  return (
    <div className="px-10 min-h-screen dark:bg-black">
      {/* upper part  */}
      <div className="py-3 flex justify-between items-center">
        <div className="basis-3/4">
          <p className="text-2xl text-gray-400 font-bold font-sofadi">
            Bobbili Urban Development Authority
          </p>
          <p className="text-4xl mt-2 text-black font-notSerif font-bold dark:text-white">
            Residential Building Plan Approval
          </p>
        </div>

        <div className="basis-[20%] flex justify-end items-center space-x-6">
          <Link
            to="/"
            className={`w-12 h-12 cursor-pointer transition-all duration-700 border  rounded-full flex justify-center items-center  ${
              path.length === 1 && path.includes("/") ? active : ` ${notActive}`
            }`}
          >
            <AiOutlineHome size={25} className="text-2xl " />
          </Link>
          <Link
            to="/statistics"
            className={`w-12 h-12 cursor-pointer transition-all duration-700 border  rounded-full flex justify-center items-center ${
              path.includes("/statistics") ? active : ` ${notActive}`
            }`}
          >
            <MdOutlineDashboard
              size={25}
              className="text-2xl dark:text-white"
            />
          </Link>

          <div className="cursor-pointer">
            {theme === "dark" ? (
              <FiSun
                size={25}
                onClick={() => setTheme("light")}
                className="dark:text-white"
              />
            ) : (
              <MdOutlineDarkMode
                size={25}
                onClick={() => setTheme("dark")}
                className="dark:text-white"
              />
            )}
          </div>
        </div>
      </div>

      {/* lower part  */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
