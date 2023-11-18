import React, { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const ShowPlotDetails = ({ serialNo, applicationData }) => {
  const {
    applicationNo,
    buildingInfo,
    applicantInfo,
    createdDate,
    submitDate,
    psSubmitDate,
    status,
  } = applicationData;

  const { generalInformation, plotDetails } = buildingInfo;
  const { applicantDetails, ltpDetails } = applicantInfo;
  const { calculateNoOfFloors } = useContext(AuthContext);

  return (
    <tr className="border-b border-gray-200 dark:text-black hidden md:table-row">
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{serialNo + 1}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{applicationNo}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{generalInformation?.district}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{generalInformation?.mandal}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{generalInformation?.village}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {applicantDetails.length ? applicantDetails[0].name : "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {applicantDetails.length ? applicantDetails[0].address : "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{ltpDetails?.name ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{ltpDetails?.phoneNo ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {plotDetails?.marketValueSqym ?? "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{createdDate ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {plotDetails?.proposedPlotAreaCal ?? "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {plotDetails?.roadWideningAreaCal ?? "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{plotDetails?.netPlotAreaCal ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {calculateNoOfFloors(plotDetails?.floorDetails) ?? "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {plotDetails?.totalBuiltUpArea ?? "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm ">
        <p className="text-gray-900">{plotDetails?.noOfUnits ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{submitDate ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{submitDate ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {submitDate?.split("-")[submitDate?.split("-").length - 1] ?? "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200 text-xs">
        <span className="relative inline-block px-3 py-1 font-semibold nm_Container leading-tight">
          <span
            aria-hidden
            className={`absolute inset-0  ${
              (status?.toLowerCase()?.includes("pending") && "bg-violet-400") ||
              (status?.toLowerCase()?.includes("approved") && "bg-green-400") ||
              (status?.toLowerCase()?.includes("shortfall") &&
                "bg-[#fad390]") ||
              (status?.toLowerCase()?.includes("rejected") && "bg-red-400")
            } opacity-50 rounded-full nm_Container`}
          ></span>
          <span className="relative capitalize">
            {status.split(" ")[0] ?? "N/A"}
          </span>
        </span>
      </td>
    </tr>
  );
};

export default ShowPlotDetails;
