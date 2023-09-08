import React from "react";
import { Outlet } from "react-router-dom";
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
      <div className={`flex w-full`}>
        <div className="basis-[20%] h-screen relative">
          <aside
            className={`bg-[#2AB5A4] px-[20px] fixed top-[67px] z-10 left-0 h-screen bg-opacity-20 border-r  pt-10`}
          >
            <ul className={`${sidebarStyle.links} `}>
              {/* sidebar menus  */}
              {(currentUser?.role === "LTP" && <LtpSidebar />) ||
                (currentUser?.role === "PS" && <PsSidebar />) ||
                ((currentUser?.role === "Admin1" ||
                  currentUser?.role === "Admin2") && <AdminSidebar />)}
            </ul>
          </aside>
        </div>

        <div className="basis-[80%]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
