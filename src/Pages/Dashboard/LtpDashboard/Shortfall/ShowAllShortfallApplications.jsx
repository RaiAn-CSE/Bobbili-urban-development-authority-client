import React from "react";

const ShowAllShortfallApplications = ({
  serialNo,
  applicationData,
  tableComponentProps,
}) => {
  const { applicationNo, buildingInfo, applicantInfo, psSubmitDate } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  const { showPageBasedOnApplicationType, navigate } = tableComponentProps;
  return (
    <tr>
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">{serialNo + 1}</p>
      </td>
      <td
        className="hover:underline cursor-pointer p-3  border-b border-gray-200 text-sm"
        onClick={() =>
          showPageBasedOnApplicationType(applicationNo, navigate, "shortfall")
        }
      >
        <p className="text-gray-900 break-words">{applicationNo}</p>
      </td>
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">
          {applicantDetails.length ? applicantDetails[0].name : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">
          {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">
          {generalInformation.caseType !== ""
            ? generalInformation.caseType
            : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">
          {generalInformation.village !== ""
            ? generalInformation.village
            : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">
          {generalInformation.mandal !== "" ? generalInformation.mandal : "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200 text-sm">
        <p className="text-gray-900 break-words">{psSubmitDate ?? "N/A"}</p>
      </td>
    </tr>
  );
};

export default ShowAllShortfallApplications;
