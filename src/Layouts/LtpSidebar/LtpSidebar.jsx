import React from "react";
import { Link } from "react-router-dom";
import {
  MdDeveloperMode,
  MdOutlineLogout,
  MdSpaceDashboard,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { BsFillPostcardFill } from "react-icons/bs";
import { SiAltiumdesigner } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import sidebarStyle from "../../Style/dashboardSidebar.module.css";

const LtpSidebar = () => {
  return (
    <>
      <li>
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className="p-[10px] text-black font-medium " to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <span>
          <BsFillPostcardFill size={20} />
        </span>
        <Link
          className="p-[10px] text-black font-medium "
          to="/dashboard/draftApplication"
        >
          Draft App:
        </Link>
      </li>
      <li>
        <span>
          <GrMoney size={20} />
        </span>
        <Link className="p-[10px] text-black font-medium " to="">
          Submitted App:
        </Link>
      </li>
      <li>
        <span>
          <TbReportAnalytics size={22} />
        </span>
        <Link className="p-[10px] text-black font-medium " to="/#">
          Approved
        </Link>
      </li>

      <li>
        <span>
          <SiAltiumdesigner size={22} />
        </span>
        <Link className="p-[10px] text-black font-medium " to="/#">
          Shortfall
        </Link>
      </li>
      <li>
        <span>
          <MdDeveloperMode size={22} />
        </span>
        <Link className="p-[10px] text-black font-medium " to="/#">
          Rejected
        </Link>
      </li>
      <li className={sidebarStyle.logoutLink}>
        <span>
          <MdOutlineLogout size={22} />
        </span>
        <Link className="p-[10px] text-black font-medium " to="/#">
          Logout
        </Link>
      </li>
    </>
  );
};

export default LtpSidebar;
