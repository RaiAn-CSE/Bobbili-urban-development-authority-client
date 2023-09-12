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
      <div className="drawer lg:drawer-open h-full relative">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2">
          {/* <!-- Page content here --> */}

          <label
            htmlFor="my-drawer-2"
            className="btn btn-sm bg-[#10AC84] text-white border-0 drawer-button lg:hidden "
          >
            <MdOutlineMenuOpen />
            Sidebar
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side shadow-md z-10">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul
            className={`menu p-4 w-full md:w-60 pt-20 lg:pt-0 h-full bg-[#e5f4e3]  lg:bg-green-100 font-bold text-base relative`}
          >
            {/* <!-- Sidebar content here --> */}
            <div className="absolute right-2  lg:hidden">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-sm btn-circle bg-black  text-white"
              >
                ✕
              </label>
            </div>
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
