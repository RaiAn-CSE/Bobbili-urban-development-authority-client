import React, { useContext } from "react";
// import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const ShowSubmittedApplication = ({
  serialNo,
  applicationData,
  showDraftApplication,
}) => {
  // console.log(serialNo, applicationData);

  // const { showDraftApplication } = useContext(AuthContext)

  const { applicationNo, buildingInfo, applicantInfo, submitDate, status } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;
  return (
    <tr>
      <td className="p-2">{serialNo + 1}</td>
      <td
        className="hover:underline cursor-pointer p-2"
        onClick={() => showDraftApplication(applicationNo)}
      >
        {applicationNo}
      </td>
      <td className="p-2">
        {applicantDetails.length ? applicantDetails[0].name : "N/A"}
      </td>
      <td className="p-2">
        {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
      </td>
      <td className="p-2">
        {generalInformation.caseType !== ""
          ? generalInformation.caseType
          : "N/A"}
      </td>
      <td className="p-2">
        {" "}
        {generalInformation.village !== "" ? generalInformation.village : "N/A"}
      </td>
      <td className="p-2">
        {" "}
        {generalInformation.mandal !== "" ? generalInformation.mandal : "N/A"}
      </td>
      <td className="p-2">{submitDate ?? "N/A"}</td>
      <td className="p-2">{status ?? "N/A"}</td>
    </tr>
  );
};

export default ShowSubmittedApplication;
