import React from "react";
import LtpSidebar from "./LtpSidebar/LtpSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import PsSidebar from "./PsSidebar/PsSidebar";

const DashboardLayout = () => {
  const User = "LTP";
  return (
    <>
      <Navbar />
      <div className="drawer drawer-mobile lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">
          {/* <!-- Page content here --> */}

          <label
            htmlFor="my-drawer-2"
            className="btn btn-xs bg-boldGreen border-0 drawer-button lg:hidden mb-5"
          >
            Sidebar
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side shadow-md ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul className="menu p-4 w-full md:w-80 bg-green-400 font-bold text-[#3e363f]">
            {/* <!-- Sidebar content here --> */}
            {User === "LTP" && <LtpSidebar />}
            {User === "Admin" && <AdminSidebar />}
            {User === "PS" && <PsSidebar />}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
