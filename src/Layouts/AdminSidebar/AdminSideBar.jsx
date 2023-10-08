import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";

const AdminSideBar = () => {
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
      <li
        className={`${
          path === "/dashboard/addUser" && gradientColor
        }  ps-4 mb-1 flex items-center rounded-l-lg hover:${gradientColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/addUser">
          Add User
        </Link>
      </li>
      <li
        className={`${
          path === "/dashboard/allUser" && gradientColor
        }  ps-4 mb-1 flex items-center rounded-l-lg hover:${gradientColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/allUser">
          All Users
        </Link>
      </li>
    </>
  );
};

export default AdminSideBar;
