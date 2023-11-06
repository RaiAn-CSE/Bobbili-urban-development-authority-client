import React from "react";
import { Outlet } from "react-router-dom";
import sidebarStyle from "../Style/dashboardSidebar.module.css";
import Navbar from "../Pages/Shared/Navbar";
import LtpSidebar from "./LtpSidebar/LtpSidebar";
import PsSidebar from "./PsSidebar/PsSidebar";
import { MdOutlineMenuOpen } from "react-icons/md";
import AdminSideBar from "./AdminSidebar/AdminSideBar";
import UdaSidebar from "./UdaSidebar/UdaSidebar";

const DashboardLayout = () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedUser"));

  const darkGradientColor =
    "dark:bg-gradient-to-b dark:from-violet-500 dark:to-fuchsia-500";

  return (
    <div className="bg-bgColor">
      <Navbar />
      <div className="drawer dark:bg-grad lg:drawer-open min-h-[calc(100vh-69px)] relative transition-all duration-700">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
        <div className="drawer-content w-full overflow-hidden lg:drawer-open dark:bg-white">
          {/* <!-- Page content here --> */}

          <label
            htmlFor="my-drawer-2"
            className="btn btn-sm md:btn-md m-2 lg:hidden bg-violetLight shadow-md shadow-violetLight text-white border-0 drawer-button transition-all duration-700 hover:bg-black hover:shadow-black "
          >
            <MdOutlineMenuOpen size={24} />
          </label>
          <Outlet />
        </div>
        <div className="drawer-side shadow-md w-full md:min-w-[208px] h-full z-10 ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul
            className={`nm_Container w-full md:w-52 h-full bg-bgColor font-roboto font-bold text-xl md:text-base text-black pt-10 lg:fixed `}
          >
            {/* <!-- Sidebar content here --> */}
            <li className="absolute right-2 top-20 lg:hidden">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-sm btn-circle bg-black text-white hover:bg-violetDark hover:border-0 "
              >
                ✕
              </label>
            </li>
            {(currentUser?.role === "LTP" && <LtpSidebar />) ||
              (currentUser?.role === "PS" && <PsSidebar />) ||
              (currentUser?.role === "UDA" && <UdaSidebar />) ||
              ((currentUser?.role === "Admin1" ||
                currentUser?.role === "Admin2" ||
                currentUser?.role === "Super Admin") && <AdminSideBar />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
