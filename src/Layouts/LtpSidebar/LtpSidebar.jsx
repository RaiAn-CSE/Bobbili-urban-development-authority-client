import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogout, MdSpaceDashboard } from "react-icons/md";
import { BiCheckDouble, BiSolidImageAdd } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { BsSendCheckFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import sidebarStyle from "../../Style/dashboardSidebar.module.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const LtpSidebar = () => {
  const path = useLocation().pathname;

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const hoverGradientColor =
    "hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500";

  const { handleLogOut } = useContext(AuthContext);

  // console.log(location);
  return (
    <>
      <li
        className={`${
          path === "/dashboard" && gradientColor
        } mt-24 lg:mt-0 flex items-center ps-4 ${hoverGradientColor} mb-1`}
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
          (path === "/dashboard/draftApplication" ||
            path === "/dashboard/draftApplication/buildingInfo" ||
            path === "/dashboard/draftApplication/applicantInfo" ||
            path === "/dashboard/draftApplication/applicationChecklist" ||
            path === "/dashboard/draftApplication/documents" ||
            path === "/dashboard/draftApplication/drawing" ||
            path === "/dashboard/draftApplication/payment") &&
          gradientColor
        } flex items-center ps-4 ${hoverGradientColor}  mb-1`}
      >
        <span>
          <BiSolidImageAdd size={22} />
        </span>
        <Link
          className="p-[10px] font-medium "
          to="/dashboard/draftApplication"
        >
          Draft Application
        </Link>
      </li>

      <li
        className={`${
          path === "/dashboard/submitApplication" && gradientColor
        } flex items-center ps-4 ${hoverGradientColor}  mb-1`}
      >
        <span>
          <BsSendCheckFill size={19} />
        </span>
        <Link
          className="p-[10px] font-medium"
          to="/dashboard/submitApplication"
        >
          Submitted App:
        </Link>
      </li>

      <li
        className={`${
          path === "/dashboard/approvedApplication" && gradientColor
        } flex items-center ps-4 ${hoverGradientColor}  mb-1`}
      >
        <span>
          <BiCheckDouble size={23} />
        </span>
        <Link
          className="p-[10px]  font-medium "
          to="/dashboard/approvedApplication"
        >
          Approved
        </Link>
      </li>

      <li
        className={`${
          path === "/dashboard/shortfallApplication" && gradientColor
        } flex items-center ps-4 ${hoverGradientColor}  mb-1`}
      >
        <span>
          <AiOutlineForm size={20} />
        </span>
        <Link
          className="p-[10px] font-medium "
          to="/dashboard/shortfallApplication"
        >
          Shortfall
        </Link>
      </li>

      <li className={`flex items-center ps-4 ${hoverGradientColor}  mb-1`}>
        <span>
          <CgDanger size={22} />
        </span>
        <Link className="p-[10px]  font-medium " to="/#">
          Rejected
        </Link>
      </li>

      <li className={`mt-5 flex items-center ps-4 ${hoverGradientColor}  mb-1`}>
        <span>
          <MdOutlineLogout size={22} />
        </span>
        <Link className="p-[10px]  font-medium" onClick={handleLogOut}>
          Logout
        </Link>
      </li>
    </>
  );
};

export default LtpSidebar;
