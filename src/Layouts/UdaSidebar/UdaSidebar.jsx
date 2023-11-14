import React from "react";
import { FaMapLocation, FaMoneyCheckDollar } from "react-icons/fa6";
import { MdSpaceDashboard, MdVerified } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const UdaSidebar = () => {
  const path = useLocation().pathname;
  const gradientColor =
    "text-normalViolet nm_Inset border-4 border-r-normalViolet";

  const hoverGradientColor = " hover:text-normalViolet";
  return (
    <>
      <li
        className={`${
          path === "/dashboard" && gradientColor
        } mb-1 flex ps-3 items-center ${hoverGradientColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard">
          Dashboard
        </Link>
      </li>
      {/* <li
        className={`${
          path === "/dashboard/location" && gradientColor
        } mb-1 ps-3 flex items-center ${hoverGradientColor}`}
      >
        <span>
          <FaMapLocation size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/location">
          Location
        </Link>
      </li> */}
      <li
        className={`${
          path === "/dashboard/plotDetails" && gradientColor
        } mb-1 ps-3 flex items-center ${hoverGradientColor}`}
      >
        <span>
          <AiOutlineAreaChart size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/plotDetails">
          Plot Details
        </Link>
      </li>
      <li
        className={`${
          path === "/dashboard/revenueReport" && gradientColor
        } mb-1 ps-3 flex items-center ${hoverGradientColor}`}
      >
        <span>
          <FaMoneyCheckDollar size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/revenueReport">
          Revenue Report
        </Link>
      </li>
      <li
        className={`${
          path === "/dashboard/verificationStatus" && gradientColor
        } mb-1 ps-3 flex items-center ${hoverGradientColor}`}
      >
        <span>
          <MdVerified size={20} />
        </span>
        <Link
          className={`p-[10px] font-medium `}
          to="/dashboard/verificationStatus"
        >
          Verification Status
        </Link>
      </li>
    </>
  );
};

export default UdaSidebar;
