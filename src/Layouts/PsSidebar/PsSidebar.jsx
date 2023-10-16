import React, { useContext, useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

function PsSidebar() {
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
        className={`${path === "/dashboard" && activeColor
          } mt-24 lg:mt-0 flex items-center  ps-3 ${hoverColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard">
          Dashboard
        </Link>
      </li>

      <li
        className={`${(path === "/dashboard/inward" ||
          path === "/dashboard/draftApplication/buildingInfo" ||
          path === "/dashboard/draftApplication/applicantInfo" ||
          path === "/dashboard/draftApplication/applicationChecklist" ||
          path === "/dashboard/draftApplication/documents" ||
          path === "/dashboard/draftApplication/drawing" ||
          path === "/dashboard/draftApplication/payment") &&
          activeColor
          } mt-1  flex items-center  ps-3 ${hoverColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/inward">
          Inward Application
        </Link>
      </li>
      <li
        className={`${path === "/dashboard/outWard" && activeColor
          } mt-1 flex items-center  ps-3 ${hoverColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/outWard">
          Outward Application
        </Link>
      </li>
      <li
        className={`${path === "/dashboard/searchApplication" && activeColor
          } mt-1 flex items-center  ps-3 ${hoverColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link
          className={`p-[10px] font-medium `}
          to="/dashboard/searchApplication"
        >
          Search Application
        </Link>
      </li>
      <li
        className={`${path === "/dashboard/reValidation" && activeColor
          } mt-1 flex items-center  ps-3 ${hoverColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/reValidation">
          Re-validation
        </Link>
      </li>

      {/* <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
      <Link to="/dashboard/Inward">
        <button>Inward Applications</button>
      </Link>
      <Link to="/dashboard/outwardApplication">
        <button>Outward Application</button>
      </Link>
      <Link to="/dashboard/searchApplication">
        <button>Search Application</button>
      </Link>
      <Link to="/dashboard/reValidation">
        <button>Re-validation</button>
      </Link> */}
    </>
  );
}

export default PsSidebar;
