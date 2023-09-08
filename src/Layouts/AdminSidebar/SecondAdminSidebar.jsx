import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const SecondAdminSidebar = () => {
  const path = useLocation().pathname;

  return (
    <>
      <li className={`${path === "/dashboard" && "active"}`}>
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
    </>
  );
};

export default SecondAdminSidebar;
