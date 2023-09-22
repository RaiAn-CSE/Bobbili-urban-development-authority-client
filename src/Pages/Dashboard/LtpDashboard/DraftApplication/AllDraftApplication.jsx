import React from "react";
import { Link } from "react-router-dom";

const AllDraftApplication = ({
  serialNo,
  applicationData,
  showDraftApplication,
}) => {
  console.log(applicationData);
  const { applicationNo, buildingInfo, applicantInfo, createdDate } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  console.log(applicantInfo, "applicantInfo");

  return (
    <tr>
      <th>{serialNo + 1}</th>
      <td>
        <Link
          className="hover:underline"
          onClick={() => showDraftApplication(applicationNo)}
        >
          {applicationNo}
        </Link>
      </td>
      <td>{applicantDetails.length ? applicantDetails[0].name : "N/A"}</td>
      <td>{applicantDetails.length ? applicantDetails[0].phone : "N/A"}</td>
      <td>
        {generalInformation.caseType !== ""
          ? generalInformation.caseType
          : "N/A"}
      </td>
      <td>
        {" "}
        {generalInformation.village !== "" ? generalInformation.village : "N/A"}
      </td>
      <td>
        {" "}
        {generalInformation.mandal !== "" ? generalInformation.mandal : "N/A"}
      </td>
      <td>{createdDate ?? "N/A"}</td>
      <td>
        <button className="btn btn-xs btn-error text-white">Delete</button>
      </td>
    </tr>
  );
};

export default AllDraftApplication;
