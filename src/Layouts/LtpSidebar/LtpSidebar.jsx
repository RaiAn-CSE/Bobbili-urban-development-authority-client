import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogout, MdSpaceDashboard } from "react-icons/md";
import { BiCheckDouble, BiSolidImageAdd } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { BsSendCheckFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";

const LtpSidebar = () => {
  const path = useLocation().pathname;

  console.log(location);
  return (
    <>
      <li className={`${path === "/dashboard" && "active"} mt-10`}>
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
          "active"
          }`}
      >
        <span>
          <BiSolidImageAdd size={22} />
        </span>
        <Link
          className="p-[10px]  font-medium "
          to="/dashboard/draftApplication"
        >
          Draft Application
        </Link>
      </li>

      <li className={`${path === "/dashboard/submitApplication" && "active"}`}>
        <span>
          <BsSendCheckFill size={19} />
        </span>
        <Link
          className="p-[10px]  font-medium "
          to="/dashboard/submitApplication"
        >
          Submitted App:
        </Link>
      </li>
      <li>
        <span>
          <BiCheckDouble size={23} />
        </span>
        <Link className="p-[10px]  font-medium " to="/#">
          Approved
        </Link>
      </li>

      <li>
        <span>
          <AiOutlineForm size={20} />
        </span>
        <Link className="p-[10px] font-medium " to="/#">
          Shortfall
        </Link>
      </li>
      <li>
        <span>
          <CgDanger size={22} />
        </span>
        <Link className="p-[10px]  font-medium " to="/#">
          Rejected
        </Link>
      </li>
      <li className="mt-5">
        <span>
          <MdOutlineLogout size={22} />
        </span>
        <Link className="p-[10px]  font-medium" to="/#">
          Logout
        </Link>
      </li>
    </>
  );
};

export default LtpSidebar;
