import React from "react";
import { FaMapLocation } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const UdaSidebar = () => {
  const path = useLocation().pathname;
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const hoverGradientColor =
    "hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500";
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
      <li
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
      </li>
    </>
  );
};

export default UdaSidebar;
