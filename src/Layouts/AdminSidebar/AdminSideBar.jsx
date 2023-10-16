import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { BiSolidUserPlus } from "react-icons/bi";
import { FaUsersGear } from "react-icons/fa6";

const AdminSideBar = () => {
  const path = useLocation().pathname;

  const { handleLogOut, decideActiveColor, decideHoverColor, isDark } =
    useContext(AuthContext);

  const [activeColor, setActiveColor] = useState("");
  const [hoverColor, setHoverColor] = useState("");

  useEffect(() => {
    const getActiveColor = decideActiveColor();
    const getHoverColor = decideHoverColor();
    setActiveColor(getActiveColor);
    setHoverColor(getHoverColor);
  }, [isDark]);
  return (
    <>
      <li
        className={`${
          path === "/dashboard" && activeColor
        } mt-24 lg:mt-0 mb-1 ps-4  flex items-center ${hoverColor}`}
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
          path === "/dashboard/addUser" && activeColor
        }  ps-4 mb-1 flex items-center  ${hoverColor}`}
      >
        <span>
          <BiSolidUserPlus size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/addUser">
          Add User
        </Link>
      </li>
      <li
        className={`${
          path === "/dashboard/allUser" && activeColor
        }  ps-4 mb-1 flex items-center  ${hoverColor}`}
      >
        <span>
          <FaUsersGear size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/allUser">
          All Users
        </Link>
      </li>
    </>
  );
};

export default AdminSideBar;
