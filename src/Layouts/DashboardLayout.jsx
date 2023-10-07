import React from "react";
import { Outlet } from "react-router-dom";
import sidebarStyle from "../Style/dashboardSidebar.module.css";
import Navbar from "../Pages/Shared/Navbar";
import LtpSidebar from "./LtpSidebar/LtpSidebar";
import PsSidebar from "./PsSidebar/PsSidebar";
import SecondAdminSidebar from "./AdminSidebar/SecondAdminSidebar";
import FirstAdminSidebar from "./AdminSidebar/FirstAdminSidebar";
import { MdOutlineMenuOpen } from "react-icons/md";

const DashboardLayout = () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <>
      <Navbar />
      <div className="drawer h-full relative transition-all duration-700">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
        <div className="drawer-content p-2 dark:bg-[#000]">
          {/* <!-- Page content here --> */}

          <label
            htmlFor="my-drawer-2"
            className="btn btn-sm md:btn-md m-2 bg-violetLight shadow-md shadow-violetLight text-white border-0 drawer-button transition-all duration-700 hover:bg-black hover:shadow-black "
          >
            <MdOutlineMenuOpen size={24} />
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side shadow-md z-10">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul
            className={`ps-3 w-full md:w-80 pt-4 h-screen bg-black font-roboto font-bold text-base  md:text-xl text-white fixed top-14 md:top-16`}
          >
            {/* <!-- Sidebar content here --> */}
            <li className="absolute right-2 top-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-sm btn-circle bg-black text-white hover:bg-violetDark hover:border-0 "
              >
                ✕
              </label>
            </li>
            {(currentUser?.role === "LTP" && <LtpSidebar />) ||
              (currentUser?.role === "PS" && <PsSidebar />) ||
              (currentUser?.role === "Admin1" && <FirstAdminSidebar />) ||
              (currentUser?.role === "Admin2" && <SecondAdminSidebar />)}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
