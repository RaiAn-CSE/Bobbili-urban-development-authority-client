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
      <div className={`${sidebarStyle.dashboardSection} min-h-screen`}>
        <aside className={`basis-[20%] px-[20px] sticky top-[67px] ${sidebarStyle.sidebar}`}>
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
    </>
  );
};

export default DashboardLayout;
