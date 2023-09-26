import React from "react";

const ShowSubmittedApplication = ({ serialNo, applicationData }) => {
  console.log(serialNo, applicationData);

  const { applicationNo, buildingInfo, applicantInfo, submitDate, status } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;
  return (
    <tr>
      <th>{serialNo + 1}</th>
      <td>{applicationNo}</td>
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
      <td>{submitDate ?? "N/A"}</td>
      <td>{status ?? "N/A"}</td>
    </tr>
  );
};

export default ShowSubmittedApplication;
