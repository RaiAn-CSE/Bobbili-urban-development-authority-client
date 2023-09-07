import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ltpDashboardCss from '../Style/LtpDashboard.module.css'
import { MdDeveloperMode, MdOutlineLogout, MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { BsFillPostcardFill } from 'react-icons/bs';
import { SiAltiumdesigner } from 'react-icons/si';
import { FiSettings } from 'react-icons/fi';
import Navbar from '../Pages/Shared/Navbar';

const DashboardLayout = () => {
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
    </>
  );
};

export default DashboardLayout;
