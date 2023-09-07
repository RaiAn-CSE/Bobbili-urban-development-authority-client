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
      <div className={`${sidebarStyle.dashboardSection} flex w-full bg-cover bg-center min-h-screen relative`}>
        <aside className={`basis-[20%] px-[20px] sticky top-[67px] z-10 left-0 w-64 h-screen bg-opacity-20 backdrop-blur-xl border-r border-opacity-70`}>
          <div className='flex items-center px-10 py-5'>
            {/* <img className="w-11 h-11 rounded-full" src={logo} alt="logo" /> */}
            <h3 className="text-lg font-semibold ml-2 mt-3">Dashboard</h3>
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
    </>
  );
};

export default DashboardLayout;
