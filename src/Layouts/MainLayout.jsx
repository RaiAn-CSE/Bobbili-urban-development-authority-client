import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Login from "../Pages/Main/Login/Login";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineDashboard } from "react-icons/md";

import customScroll from "../Style/Scrollbar.module.css";
import { FiSun } from "react-icons/fi";

const MainLayout = () => {
  const path = useLocation().pathname;
  console.log(path);
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const active = "font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500";

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

  const menu = (
    <>
      <Link
        to="/"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:${gradientColor} ${
          path.length === 1 && path.includes("/") ? active : ""
        }`}
      >
        Application Search
      </Link>
      <Link
        to="/onlinePayment"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b border-gray-200  hover:${gradientColor} ${
          path.includes("onlinePayment") ? active : ""
        }`}
      >
        Online Payment
      </Link>
      <Link
        to="/listOfLTP"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm  border-b border-gray-200 hover:${gradientColor} ${
          path.includes("listOfLTP") ? active : ""
        }`}
      >
        List of LTP's
      </Link>
      <Link
        to="/demoVideos"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b hover:${gradientColor} ${
          path.includes("demoVideos") ? active : ""
        }`}
      >
        Demo Videos
      </Link>
      <Link
        to="/privacyPolicy"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm  border-b hover:${gradientColor} ${
          path.includes("privacyPolicy") ? active : ""
        }`}
      >
        Privacy Policy
      </Link>
      <Link
        to="/defaultDrawingFormat"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm border-b hover:${gradientColor} ${
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
            className={`w-12 h-12 ${gradientColor} shadow-md shadow-violetDark rounded-full flex justify-center items-center`}
          >
            <AiOutlineHome className="text-2xl text-white" />
          </Link>
          <div
            className={`w-12 h-12 cursor-pointer transition-all duration-700 border border-violetLight rounded-full flex justify-center items-center hover:text-white hover:shadow-md hover:shadow-violetDark  hover:${gradientColor}`}
          >
            <MdOutlineDashboard className="text-2xl dark:text-white" />
          </div>

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
      <div className="grid grid-cols-[200px_minmax(700px,_1fr)_1fr] pt-10">
        {/* sidebar menus  */}
        <div className="w-full h-full text-base flex flex-col justify-between  bg-black text-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-lg">
          {menu}
        </div>

        {/* Scrollable content */}
        <div
          className={`${customScroll.customScrolling} bg-base-100 shadow-md rounded-lg mx-4  flex items-center`}
        >
          <Outlet />
        </div>

        <Login />
      </div>
    </div>
  );
};

export default MainLayout;
