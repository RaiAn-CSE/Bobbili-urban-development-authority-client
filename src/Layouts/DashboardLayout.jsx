import React from "react";
import LtpSidebar from "./LtpSidebar/LtpSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import PsSidebar from "./PsSidebar/PsSidebar";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  let menus;

  return (
    <>
      <Navbar />
      <div className="drawer drawer-mobile lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">
          {/* <!-- Page content here --> */}
          <Outlet />
        </div>
        <div className="drawer-side shadow-md ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul className="menu p-4 w-full md:w-80 bg-green-400 font-bold text-[#3e363f]">
            {/* <!-- Sidebar content here --> */}

            {/* { CurrentUser === "LTP" && <LtpSidebar /> || CurrentUser === "PS" && <PsSidebar /> || CurrentUser === "Admin" && <AdminSidebar />} */}

            <li className="absolute top-2 right-2 lg:hidden ">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-sm btn-circle bg-boldGreen text-white"
              >
                ✕
              </label>
            </li>
            {menus}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
