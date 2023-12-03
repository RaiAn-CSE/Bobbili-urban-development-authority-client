import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiFillMessage, AiOutlineHome, AiTwotoneMessage } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import { FiSun } from "react-icons/fi";
import ParticleBg from "../Pages/Components/ParticleBg";
import CustomerSupport from "../assets/images/support.jpg";
import { useForm } from "react-hook-form";
import { LuMessagesSquare } from "react-icons/lu";

const MainLayout = () => {
  const path = useLocation().pathname;
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

  const { register, errors, handleSubmit } = useForm();

  const [toggleChat, setToggleChat] = useState(false);

  const onSubmit = (data) => console.log(data);

  return (
    <>
      {/* particle  */}

      {!path.includes("/statistics") && <ParticleBg />}

      <div className="px-10 min-h-screen z-[10] bg-[#E8EAEC] relative">
        {/* upper part  */}
        <div className="py-3 flex justify-between items-center z-[10]">
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

          <div className="basis-[20%] z-[10] flex justify-end items-center space-x-6 dark:text-black">
            <Link
              to="/"
              className={`nm_Container w-12 h-12 cursor-pointer transition-all duration-700 border  rounded-full flex justify-center items-center  ${
                path === "/" ||
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
              className={`nm_Container w-12 h-12 cursor-pointer transition-all duration-700 border  rounded-full flex justify-center items-center ${
                path.includes("/statistics") ? active : ` ${notActive}`
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
          <div className="absolute bottom-[70px] right-8 z-10 h-[80vh] w-96 bg-white rounded-lg shadow-md message-box">
            <div className="flex flex-col items-center mt-5">
              <button class="logo-btn mt-5" data-text="Awesome">
                <span class="actual-text text-4xl">&nbsp;BUDA&nbsp;</span>
                <span aria-hidden="true" class="hover-text text-4xl">
                  &nbsp;BUDA&nbsp;
                </span>
              </button>

              <LuMessagesSquare
                size={70}
                className="nm_Container text-[#6c5ce7] mt-4"
              />
            </div>
            <form
              className="flex flex-col items-center space-y-6 mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label htmlFor="name" className="inline-block font-bold">
                  Your Name
                </label>
                <input
                  className="input input-bordered  w-full max-w-xs focus:outline-none"
                  placeholder="Enter your name ..."
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
              </div>

              <div>
                <label htmlFor="mobile" className="inline-block font-bold">
                  Mobile No
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs focus:outline-none"
                  placeholder="Enter your mobile no..."
                  {...register("mobileNo", { required: true })}
                />
              </div>
              {/* errors will return when field validation fails  */}
              {errors?.mobileNo && (
                <span className="text-red-500">This field is required</span>
              )}

              <input
                className="nm_Container capitalize p-2 px-4 text-lg rounded-full text-white bg-[#8980FD] cursor-pointer"
                type="submit"
                value={"Sent request"}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default MainLayout;
