import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const AllDraftApplication = ({
  serialNo,
  applicationData,
  tableComponentProps,

  // tableComponentProps,
}) => {
  const { alertToConfirmDelete } = useContext(AuthContext);
  console.log(applicationData);

  const { showPageBasedOnApplicationType, removeDraftApplication, navigate } =
    tableComponentProps;

  // const { showDraftApplication, removeDraftApplication, navigate } =
  //   tableComponentProps;
  const { applicationNo, buildingInfo, applicantInfo, createdDate } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  console.log(applicantInfo, "applicantInfo");

  return (
    <tr className=" dark:text-black ">
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">{serialNo + 1}</p>
      </td>
      <td className="p-3  border-b border-gray-200  text-sm">
        <button
          className="hover:underline"
          onClick={() =>
            showPageBasedOnApplicationType(applicationNo, navigate, "draft")
          }
        >
          <p className="text-gray-900 break-words">{applicationNo}</p>
        </button>
      </td>
      <td className="p-3  border-b border-gray-200  text-sm">
        <p className="text-gray-900 break-words">
          {applicantDetails.length ? applicantDetails[0].name : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200  text-sm">
        <p className="text-gray-900 break-words">
          {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200  text-sm">
        <p className="text-gray-900 break-words">
          {generalInformation.caseType !== ""
            ? generalInformation.caseType
            : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200  text-sm">
        <p className="text-gray-900 break-words">
          {generalInformation.village !== ""
            ? generalInformation.village
            : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200  text-sm">
        <p className="text-gray-900 break-words">
          {generalInformation.mandal !== "" ? generalInformation.mandal : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200  text-sm">
        <p className="text-gray-900 break-words">{createdDate ?? "N/A"}</p>
      </td>
      <td className="p-3  border-b border-gray-200 text-sm flex">
        {/* <button
          className={`btn btn-sm text-black bg-transparent`}
          // onClick={() =>
          //   alertToConfirmDelete(applicationNo, removeDraftApplication)
          // }
        >
          <CiEdit size={19} />
        </button> */}
        <button
          className={`btn btn-sm text-red-500 bg-transparent`}
          onClick={() =>
            alertToConfirmDelete(applicationNo, removeDraftApplication)
          }
        >
          <RiDeleteBin5Fill size={19} />
        </button>
      </td>
    </tr>
  );
};

export default AllDraftApplication;
