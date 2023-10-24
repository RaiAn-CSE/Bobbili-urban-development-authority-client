import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const AllDraftApplication = ({
  serialNo,
  applicationData,
  showDraftApplication,
  removeDraftApplication,
  navigate,
}) => {
  const { alertToConfirmDelete } = useContext(AuthContext);
  console.log(applicationData);
  const { applicationNo, buildingInfo, applicantInfo, createdDate } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  console.log(applicantInfo, "applicantInfo");

  const [tableInfo, setTableInfo] = useState(false);
  const handleTableInfo = () => {
    tableInfo ? setTableInfo(false) : setTableInfo(true);
  }

  return (
    <>
      <tr className="dark:text-black hidden md:table-row">
        <td>{serialNo + 1}</td>
        <td className="px-2">
          <button
            className="hover:underline"
            onClick={() => showDraftApplication(applicationNo, navigate, "draft")}
          >
            {applicationNo}
          </button>
        </td>
        <td className="px-2">
          {applicantDetails.length ? applicantDetails[0].name : "N/A"}
        </td>
        <td className="px-2">
          {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
        </td>
        <td className="px-1">
          {generalInformation.caseType !== ""
            ? generalInformation.caseType
            : "N/A"}
        </td>
        <td className="px-2">
          {" "}
          {generalInformation.village !== "" ? generalInformation.village : "N/A"}
        </td>
        <td className="px-2">
          {" "}
          {generalInformation.mandal !== "" ? generalInformation.mandal : "N/A"}
        </td>

        <td className="px-2">{createdDate ?? "N/A"}</td>

        <td className="p-5">
          <button
            className={`btn btn-sm text-white bg-red-500 hover:bg-red-600`}
            onClick={() =>
              alertToConfirmDelete(applicationNo, removeDraftApplication)
            }
          >
            <RiDeleteBin5Fill size={19} />
          </button>
        </td>
      </tr>


      <tr className="dark:text-black flex-coll md:hidden table-row">
        <details className="flex flex-coll">
          <summary className="flex items-center bg-gray-100" onClick={handleTableInfo}>
            <div className="" >
              {
                tableInfo ? <AiOutlineMinusCircle size={19} /> : <AiFillPlusCircle size={19} />
              }
            </div>
            <td className=""><span>Si.No: </span> {serialNo + 1}</td>
            <td className="px-2">
              <button
                className="hover:underline"
                onClick={() => showDraftApplication(applicationNo, navigate, "draft")}
              >
                <span>Application no: </span> {applicationNo}
              </button>
            </td>
          </summary>
          <td className="px-2">
            <span>Owner name: </span> {applicantDetails.length ? applicantDetails[0].name : "N/A"}
          </td>
          <td className="px-2">
            <span>Phone no.: </span> {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
          </td>
          <td className="px-1">
            <span>Case type: </span> {generalInformation.caseType !== ""
              ? generalInformation.caseType
              : "N/A"}
          </td>
          <td className="px-2">
            {" "}
            <span>Village: </span> {generalInformation.village !== "" ? generalInformation.village : "N/A"}
          </td>
          <td className="px-2">
            {" "}
            <span>Mandal: </span> {generalInformation.mandal !== "" ? generalInformation.mandal : "N/A"}
          </td>

          <td className="px-2"><span>Created date: </span> {createdDate ?? "N/A"}</td>

          <td className="p-5">
            <span>Action: </span>
            <button
              className={`btn btn-sm text-white bg-red-500 hover:bg-red-600`}
              onClick={() =>
                alertToConfirmDelete(applicationNo, removeDraftApplication)
              }
            >
              <RiDeleteBin5Fill size={19} />
            </button>
          </td>
        </details>
      </tr >
    </>
  );
};

export default AllDraftApplication;
