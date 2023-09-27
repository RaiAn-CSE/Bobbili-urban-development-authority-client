import React from "react";
import { Link, Outlet } from "react-router-dom";
import Login from "../Pages/Main/Login/Login";
import Logo from "../assets/images/logo.png";

const MainLayout = () => {
  const menu = (
    <>
      <Link
        to="/applicationSearch"
        type="button"
        className="relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        Application Search
      </Link>
      <Link
        type="button"
        className="relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        Online Payment
      </Link>
      <Link
        type="button"
        className="relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        List of LTP's
      </Link>
      <Link
        type="button"
        className="relative inline-flex items-center w-full h-full px-4 py-2 text-sm font-medium rounded-b-lg border-b hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
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
    <div className="mx-10">
      {/* image  */}
      <div className="mb-8">
        <img
          className="h-[18vw] md:h-[12vw] lg:h-[5vw] mx-auto my-4"
          src={Logo}
          alt="The website logo"
        />
        <h1 className="text-3xl text-center font-bold Roboto">
          Bobbili Urban Development Authority
        </h1>
      </div>
      <div className="grid grid-cols-[200px_minmax(700px,_1fr)_1fr]">
        {/* sidebar menus  */}
        <div className="w-full h-[400px] flex flex-col justify-between text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-lg">
          {menu}
        </div>

        {/* Scrollable content */}
        <div className="">
          <Outlet />
        </div>

        <Login />
      </div>
    </div>
  );
};

export default MainLayout;
