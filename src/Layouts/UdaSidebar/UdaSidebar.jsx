import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const UdaSidebar = () => {
  const path = useLocation().pathname;
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
  return (
    <>
      <li
        className={`${
          path === "/dashboard" && gradientColor
        } mt-10 mb-1 ps-4 rounded-l-lg flex items-center hover:${gradientColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard">
          Dashboard
        </Link>
      </li>
    </>
  );
};

export default UdaSidebar;
