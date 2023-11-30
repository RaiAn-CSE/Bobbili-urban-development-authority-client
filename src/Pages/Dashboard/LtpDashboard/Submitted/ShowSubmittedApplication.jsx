import React, { useState } from "react";
// import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";

const ShowSubmittedApplication = ({
  serialNo,
  applicationData,
  tableComponentProps,
}) => {
  // console.log(serialNo, applicationData);

  // const { showDraftApplication } = useContext(AuthContext)

  const { showPageBasedOnApplicationType, navigate } = tableComponentProps;

  console.log(showPageBasedOnApplicationType, navigate, "DDD");
  const { applicationNo, buildingInfo, applicantInfo, submitDate, status } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  const [tableInfo, setTableInfo] = useState(false);
  const handleTableInfo = () => {
    tableInfo ? setTableInfo(false) : setTableInfo(true);
  };

  return (
    <>
      <tr className="table-row">
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{serialNo + 1}</p>
        </td>
        <td
          className="hover:underline cursor-pointer border-b border-gray-200 text-sm"
          onClick={() =>
            showPageBasedOnApplicationType(applicationNo, navigate, "submit")
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
            {generalInformation.mandal !== ""
              ? generalInformation.mandal
              : "N/A"}
          </p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{submitDate ?? "N/A"}</p>
        </td>
        <td className="p-3 border-b border-gray-200 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className={`absolute inset-0 bg-violet-400 font-white opacity-50 rounded-full nm_Container`}
            ></span>
            <span className="relative ">{status.split(" ")[0] ?? "N/A"}</span>
          </span>
          {/* <p className="text-gray-900 break-words">{status ?? "N/A"}</p> */}
        </td>
      </tr>
    </>
  );
};

export default ShowSubmittedApplication;
