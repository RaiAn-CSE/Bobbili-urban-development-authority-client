import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RiDeleteBin5Fill } from "react-icons/ri";

const AllDraftApplication = ({
  serialNo,
  applicationData,
  showDraftApplication,
  removeDraftApplication,
}) => {
  const { alertToConfirmDelete } = useContext(AuthContext);
  console.log(applicationData);
  const { applicationNo, buildingInfo, applicantInfo, createdDate } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  console.log(applicantInfo, "applicantInfo");

  return (
    <tr>
      <td>{serialNo + 1}</td>
      <td className="px-2">
        <Link
          className="hover:underline"
          onClick={() => showDraftApplication(applicationNo)}
        >
          {applicationNo}
        </Link>
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
  );
};

export default AllDraftApplication;
