import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineLogout, MdSpaceDashboard } from "react-icons/md";
import { BiCheckDouble, BiSolidImageAdd } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { BsSendCheckFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const LtpSidebar = () => {
  const path = useLocation().pathname;

  const navigate = useNavigate();

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

  const sidebarHoverClass = 'flex items-center ps-4 hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 mb-1'

  return (
    <>
      <li
        className={`${path === "/dashboard" && activeColor
          } mt-24 lg:mt-0 ${sidebarHoverClass}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard">
          Dashboard
        </Link>
      </li>

      <li
        className={`${(path === "/dashboard/draftApplication" ||
          path === "/dashboard/draftApplication/buildingInfo" ||
          path === "/dashboard/draftApplication/applicantInfo" ||
          path === "/dashboard/draftApplication/applicationChecklist" ||
          path === "/dashboard/draftApplication/documents" ||
          path === "/dashboard/draftApplication/drawing" ||
          path === "/dashboard/draftApplication/payment") &&
          activeColor
          } ${sidebarHoverClass}`}
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
        className={`${path === "/dashboard/submitApplication" && activeColor
          } ${sidebarHoverClass}`}
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
        className={`${path === "/dashboard/approvedApplication" && activeColor
          } ${sidebarHoverClass}`}
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
        className={`${path === "/dashboard/shortfallApplication" && activeColor
          } ${sidebarHoverClass}`}
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

      {/* <li className={`flex items-center ps-4 ${hoverColor}  mb-1`}>
        <span>
          <CgDanger size={22} />
        </span>
        <Link className="p-[10px]  font-medium " to="/#">
          Rejected
        </Link>
      </li> */}

      <li className={`mt-5 ${sidebarHoverClass}`}>
        <span>
          <MdOutlineLogout size={22} />
        </span>
        <Link
          className="p-[10px]  font-medium"
          onClick={() => handleLogOut(navigate)}
        >
          Logout
        </Link>
      </li>
    </>
  );
};

export default LtpSidebar;
