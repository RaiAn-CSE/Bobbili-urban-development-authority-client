import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import sidebarStyle from "../../Style/dashboardSidebar.module.css";

const SecondAdminSidebar = () => {
  const path = useLocation().pathname;

  return (
    <div className={`${sidebarStyle.links}`}>
      <li className={`${path === "/dashboard" && "active"} mt-10`}>
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className={`${path === "/dashboard/addUser" && "active"}`}>
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/addUser">
          Add User
        </Link>
      </li>
      <li className={`${path === "/dashboard/allUser" && "active"}`}>
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/allUser">
          All Users
        </Link>
      </li>
    </div>
  );
};

export default SecondAdminSidebar;
