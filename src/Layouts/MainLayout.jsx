import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiFillMessage, AiOutlineHome, AiTwotoneMessage } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import { FiSun } from "react-icons/fi";
import ParticleBg from "../Pages/Components/ParticleBg";
import CustomerSupport from "../assets/images/support.jpg";

import ChatBox from "../Pages/Shared/ChatBox";

const MainLayout = () => {
  const path = useLocation()?.pathname;
  console.log(path);
  const active =
    "bg-[#8B5BF6] shadow-md shadow-violetDark text-white border-none ";

  const notActive =
    "hover:bg-normalViolet text-[#8B5BF6] hover:text-white border border-violetLight";

  const gradientColor =
    "font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500";

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

  const [toggleChat, setToggleChat] = useState(false);

  return (
    <>
      {/* particle  */}

      {!path.includes("/statistics") && <ParticleBg />}

      <div className="px-10 min-h-screen z-[10] bg-[#E8EAEC] relative">
        {/* upper part  */}
        <div className="py-3 flex-col lg:flex-row flex justify-between items-center z-[10]">
          <div className="basis-3/4 z-[10] pt-2">
            <p
              // className="css-3d-text w-fit p-2 text-4xl text-gray-600 font-bold font-sofadi"
              className="w-fit italic tracking-wider p-2 text-5xl font-bold font-titleFont text-black"
            >
              Bobbili Urban Development Authority
            </p>
            <p
              // className={`css-3d-text w-fit p-2 text-2xl text-gray-600 font-bold font-sofadi`}
              className={`w-fit px-2 tracking-wider italic text-3xl text-gray-600 font-bold font-titleFont `}
            >
              Residential Building Plan Approval
            </p>
          </div>

          <div className="basis-[20%] mt-7 lg:mt-0 z-[10] flex justify-end items-center space-x-6 dark:text-black">
            <Link
              to="/"
              className={`nm_Container w-12 h-12 cursor-pointer transition-all duration-700 border  rounded-full flex justify-center items-center  ${path === "/" ||
                  path === "/onlinePayment" ||
                  path === "/listOfLTP" ||
                  path === "/demoVideos" ||
                  path === "/privacyPolicy" ||
                  path === "/defaultDrawingFormat"
                  ? active
                  : ` ${notActive}`
                }`}
            >
              <AiOutlineHome size={25} className="text-2xl " />
            </Link>
            <Link
              to="/statistics"
              className={`nm_Container w-12 h-12 cursor-pointer transition-all duration-700 border rounded-full flex justify-center items-center ${path.includes("/statistics") ? active : ` ${notActive}`
                }`}
            >
              <MdOutlineDashboard size={25} className="text-2xl" />
            </Link>

            {/* <div className="cursor-pointer">
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
                className=""
              />
            )}
          </div> */}
          </div>
        </div>

        {/* lower part  */}
        <Outlet />

        <div
          className="chatbox-wrapper"
          onClick={() => setToggleChat(!toggleChat)}
        >
          <div className="chatbox-toggle">
            <AiFillMessage size={30} />
          </div>
        </div>

        {toggleChat && (
          <div className="absolute bottom-[70px] right-8 z-10 h-[80vh] w-96 bg-white rounded-lg shadow-md ">
            <ChatBox />
          </div>
        )}
      </div>
    </>
  );
};

export default MainLayout;
