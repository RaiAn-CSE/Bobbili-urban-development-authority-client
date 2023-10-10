import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function PsSidebar() {
  const path = useLocation().pathname;

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const hoverGradientColor =
    "hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500";

  return (
    <>
      <li
        className={`${
          path === "/dashboard" && gradientColor
        } mt-10 flex items-center rounded-l-lg ps-3 ${hoverGradientColor}`}
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
          (path === "/dashboard/inward" ||
            path === "/dashboard/draftApplication/buildingInfo" ||
            path === "/dashboard/draftApplication/applicantInfo" ||
            path === "/dashboard/draftApplication/applicationChecklist" ||
            path === "/dashboard/draftApplication/documents" ||
            path === "/dashboard/draftApplication/drawing" ||
            path === "/dashboard/draftApplication/payment") &&
          gradientColor
        } mt-1  flex items-center rounded-l-lg ps-3 ${hoverGradientColor}`}
      >
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/dashboard/inward">
          Inward Application
        </Link>
      </li>
      <li
        className={`${
          path === "/dashboard/searchApplication" && gradientColor
        } mt-1 flex items-center rounded-l-lg ps-3 ${hoverGradientColor}`}
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
        className={`${
          path === "/dashboard/reValidation" && gradientColor
        } mt-1 flex items-center rounded-l-lg ps-3 ${hoverGradientColor}`}
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
