import React from "react";

const ShowAllShortfallApplications = ({
  serialNo,
  applicationData,
  showShortfallApplication,
  navigate,
}) => {
  const { applicationNo, buildingInfo, applicantInfo, psSubmitDate } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;
  return (
    <tr>
      <th>{serialNo + 1}</th>
      <td
        className="hover:underline cursor-pointer"
        onClick={() =>
          showShortfallApplication(applicationNo, navigate, "shortfall")
        }
      >
        {applicationNo}
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
      <td>{psSubmitDate ?? "N/A"}</td>
    </tr>
  );
};

export default ShowAllShortfallApplications;
