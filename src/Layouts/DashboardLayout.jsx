// import React from "react";
// import LtpSidebar from "./LtpSidebar/LtpSidebar";
// import { Outlet } from "react-router-dom";
// import Navbar from "../Pages/Shared/Navbar";
// import AdminSidebar from "./AdminSidebar/AdminSidebar";
// import PsSidebar from "./PsSidebar/PsSidebar";
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ltpDashboardCss from '../Style/LtpDashboard.module.css'
import { MdDeveloperMode, MdOutlineLogout, MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { GrMoney, GrOverview } from "react-icons/gr";
import { BsFillPostcardFill } from 'react-icons/bs';
import { SiAltiumdesigner, SiGoogleanalytics, SiGooglemessages } from 'react-icons/si';
import { FiSettings } from 'react-icons/fi';
import Navbar from '../Pages/Shared/Navbar';
import DraftApplication from './../Pages/LtpDashboard/DraftApplication/DraftApplication';

const DashboardLayout = () => {
  // const CurrentUser = "LTP";
  return (
    <>
      <Navbar />
      <div className={ltpDashboardCss.dashboardSection}>

        <aside className={`basis-[5%] px-[20px] ${ltpDashboardCss.sidebar}`}>
          <div className={ltpDashboardCss.logo}>
            {/* <img src={logo} alt="logo" /> */}
            <h3 className=''>Dashboard</h3>
          </div>
          <ul className={`${ltpDashboardCss.links}`}>
            <hr />
            <h4>Main Menu</h4>
            <li>
              <span><MdSpaceDashboard size={20} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/ltpDashboard/home'>Dashboard</Link>
            </li>
            <li>
              <span><BsFillPostcardFill size={20} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/ltpDashboard/draftApplication'>Draft App:</Link>
            </li>
            <li>
              <span><GrMoney size={20} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/ltpDashboard/submitApplication'>Submitted App:</Link>
            </li>
            <li>
              <span><TbReportAnalytics size={22} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/#'>Approved
              </Link>
            </li>
            <hr />
            <h4>Advanced</h4>
            <li>
              <span><SiAltiumdesigner size={22} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/#'>Shortfall</Link>
            </li>
            <li>
              <span><MdDeveloperMode size={22} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/#'>Rejected</Link>
            </li>
            <hr />
            <h4>Account</h4>
            <li>
              <span><FiSettings size={22} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/#'>Settings</Link>
            </li>
            <li className={ltpDashboardCss.logoutLink}>
              <span><MdOutlineLogout size={22} /></span>
              <Link className='p-[10px] text-black font-medium hidden' to='/#'>Logout</Link>
            </li>
          </ul>

        </aside>

        <div className='basis-[95%]'>
          <Outlet></Outlet>
        </div>
      </div>
      {/* <Navbar />
      <div className="drawer drawer-mobile lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">

          <Outlet />
        </div>
        <div className="drawer-side shadow-md ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <div className="p-4 w-full md:w-80 bg-green-400 font-bold text-[#3e363f]">


            {CurrentUser === "LTP" && <LtpSidebar /> || CurrentUser === "PS" && <PsSidebar /> || CurrentUser === "Admin" && <AdminSidebar />}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DashboardLayout;
