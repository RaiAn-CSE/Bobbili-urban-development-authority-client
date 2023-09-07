import React from "react";
import { Link, Outlet } from "react-router-dom";
import sidebarStyle from "../Style/dashboardSidebar.module.css";
import Navbar from "../Pages/Shared/Navbar";
import LtpSidebar from "./LtpSidebar/LtpSidebar";
import PsSidebar from "./PsSidebar/PsSidebar";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

const DashboardLayout = () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <>
      <Navbar />
      <div className={sidebarStyle.dashboardSection}>
        <aside className={`basis-[20%] px-[20px] ${sidebarStyle.sidebar}`}>
          <div className={sidebarStyle.logo}>
            {/* <img src={logo} alt="logo" /> */}
            <h3 className="">Dashboard</h3>
          </div>
          <ul className={`${sidebarStyle.links}`}>
            {/* sidebar menus  */}
            {(currentUser?.role === "LTP" && <LtpSidebar />) ||
              (currentUser?.role === "PS" && <PsSidebar />) ||
              ((currentUser?.role === "Admin1" ||
                currentUser?.role === "Admin2") && <AdminSidebar />)}
          </ul>
        </aside>

        <div className="basis-[80%]">
          <Outlet></Outlet>
        </div>
      </div>

      {/* another 
       <Navbar />
      <div className="drawer drawer-mobile lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">

          <Outlet />
        </div>
        <div className="drawer-side shadow-md ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul className="menu p-4 w-full md:w-80 bg-green-400 font-bold text-[#3e363f]">
         

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
          <div className="p-4 w-full md:w-80 bg-green-400 font-bold text-[#3e363f]">


            {CurrentUser === "LTP" && <LtpSidebar /> || CurrentUser === "PS" && <PsSidebar /> || CurrentUser === "Admin" && <AdminSidebar />}
          </div>
        </div>
      </div>  */}
    </>
  );
};

export default DashboardLayout;
