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

  return (
    <>
      <li
<<<<<<< HEAD
        className={`${
          path === "/dashboard" && activeColor
        } mt-24 lg:mt-0 flex items-center ps-4 ${hoverColor} mb-1`}
=======
        className={`${path === "/dashboard" && gradientColor
          } mt-10 flex items-center ps-4 ${hoverGradientColor} rounded-l-lg mb-1`}
>>>>>>> raian
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
<<<<<<< HEAD
          activeColor
        } flex items-center ps-4 ${hoverColor}  mb-1`}
=======
          gradientColor
          } flex items-center ps-4 ${hoverGradientColor} rounded-l-lg mb-1`}
>>>>>>> raian
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
<<<<<<< HEAD
        className={`${
          path === "/dashboard/submitApplication" && activeColor
        } flex items-center ps-4 ${hoverColor}  mb-1`}
=======
        className={`${path === "/dashboard/submitApplication" && gradientColor
          } flex items-center ps-4 ${hoverGradientColor} rounded-l-lg mb-1`}
>>>>>>> raian
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
<<<<<<< HEAD
        className={`${
          path === "/dashboard/approvedApplication" && activeColor
        } flex items-center ps-4 ${hoverColor}  mb-1`}
=======
        className={`${path === "/dashboard/approvedApplication" && gradientColor
          } flex items-center ps-4 ${hoverGradientColor} rounded-l-lg mb-1`}
>>>>>>> raian
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
<<<<<<< HEAD
        className={`${
          path === "/dashboard/shortfallApplication" && activeColor
        } flex items-center ps-4 ${hoverColor}  mb-1`}
=======
        className={`${path === "/dashboard/shortfallApplication" && gradientColor
          } flex items-center ps-4 ${hoverGradientColor} rounded-l-lg mb-1`}
>>>>>>> raian
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

      <li className={`flex items-center ps-4 ${hoverColor}  mb-1`}>
        <span>
          <CgDanger size={22} />
        </span>
        <Link className="p-[10px]  font-medium " to="/#">
          Rejected
        </Link>
      </li>

      <li className={`mt-5 flex items-center ps-4 ${hoverColor}  mb-1`}>
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
