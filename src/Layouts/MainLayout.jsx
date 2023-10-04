import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Login from "../Pages/Main/Login/Login";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";

import customScroll from "../Style/Scrollbar.module.css";

const MainLayout = () => {
  const path = useLocation().pathname;
  const menu = (
    <>
      <Link
        to="/applicationSearch"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg ${
          path.includes("applicationSearch") ? "bg-violetLight" : ""
        }`}
      >
        Application Search
      </Link>
      <Link
        to="/onlinePayment"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium border-b border-gray-200  hover:bg-violetLight ${
          path.includes("onlinePayment") ? "bg-violetLight" : ""
        }`}
      >
        Online Payment
      </Link>
      <Link
        to="/listOfLTP"
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-violetLight ${
          path.includes("listOfLTP") ? "bg-violetLight" : ""
        }`}
      >
        List of LTP's
      </Link>
      <Link
        type="button"
        className={`relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium rounded-b-lg border-b hover:bg-violetLight ${
          path.includes("demoVideos") ? "bg-violetLight" : ""
        }`}
      >
        Demo Videos
      </Link>
      <Link
        type="button"
        className="relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium rounded-b-lg border-b hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        Privacy Policy
      </Link>
      <Link
        type="button"
        className="relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium rounded-b-lg border-b hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        Menu Item
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
    <div className="mx-10 ">
      {/* upper part  */}
      <div className="mt-4 mb-14 flex justify-between items-center">
        <div className="basis-3/4">
          <p className="text-2xl text-gray-400 font-bold font-sofadi">
            Bobbili Urban Development Authority
          </p>
          <p className="text-4xl mt-2 font-notSerif font-bold">
            Residential Building Plan Approval
          </p>
        </div>

        <div className="basis-[20%] flex justify-end space-x-6">
          <Link
            to="http://localhost:5173"
            className="w-12 h-12 bg-violetLight shadow-md shadow-violetDark rounded-full flex justify-center items-center"
          >
            <AiOutlineHome className="text-2xl text-white" />
          </Link>
          <div className="w-12 h-12 cursor-pointer transition-all duration-700 border border-violetLight rounded-full flex justify-center items-center hover:bg-violetLight hover:text-white hover:shadow-md hover:shadow-violetDark ">
            <MdOutlineDashboard className="text-2xl" />
          </div>
        </div>
      </div>

      {/* lower part  */}
      <div className="grid grid-cols-[200px_minmax(700px,_1fr)_1fr]">
        {/* sidebar menus  */}
        <div className="w-full h-[400px] flex flex-col justify-between  bg-black text-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-lg">
          {menu}
        </div>

        {/* Scrollable content */}
        <div
          className={`${customScroll.customScrolling}  bg-base-100 shadow-md border rounded-lg mx-4`}
        >
          <Outlet />
        </div>

        <Login />
      </div>
    </div>
  );
};

export default MainLayout;
