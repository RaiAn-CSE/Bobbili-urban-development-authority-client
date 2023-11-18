import React, { useContext } from "react";

const ShowRevenueReports = ({ serialNo, applicationData }) => {
  const {
    applicationNo,
    buildingInfo,
    applicantInfo,
    payment,
    createdDate,
    submitDate,
    psSubmitDate,
    status,
  } = applicationData;

  const { generalInformation, plotDetails } = buildingInfo;
  const { applicantDetails, ltpDetails } = applicantInfo;
  const { udaCharge, greenFeeCharge, labourCessCharge, gramaPanchayatFee } =
    payment;
  const totalPaid =
    Number(
      udaCharge?.UDATotalCharged?.length > 0 ? udaCharge?.UDATotalCharged : 0
    ) +
    Number(
      greenFeeCharge?.greenFee?.length > 0 ? greenFeeCharge?.greenFee : 0
    ) +
    Number(
      labourCessCharge?.labourCessOne?.length > 0
        ? labourCessCharge?.labourCessOne
        : 0
    ) +
    Number(
      gramaPanchayatFee?.GramaPanchayetTotalCharged?.length > 0
        ? gramaPanchayatFee?.GramaPanchayetTotalCharged
        : 0
    );

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
          {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
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
        <p className="text-gray-900 ">
          {status?.toLowerCase().includes("approved") ? psSubmitDate : "N/A"}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{submitDate ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {plotDetails?.roadWideningAreaCal ?? "N/A"}
        </p>
      </td>

      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{submitDate ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {submitDate.split("-")[submitDate.split("-").length - 1] ?? "N/A"}
        </p>
      </td>
      <td className="p-3  border-b border-gray-200 text-xs">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
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
            {status?.split(" ")[0] ?? "N/A"}
          </span>
        </span>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {udaCharge?.TotalOpenSpaceCharged?.length > 0
            ? udaCharge?.TotalOpenSpaceCharged
            : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {udaCharge?.TotalPenalizationCharged?.length > 0
            ? udaCharge?.TotalPenalizationCharged
            : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {udaCharge?.builtUpArea?.length > 0 ? udaCharge?.builtUpArea : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {udaCharge?.vacantArea?.length > 0 ? udaCharge?.vacantArea : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {udaCharge?.labourCessTwo?.length > 0 ? udaCharge?.labourCessTwo : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{1500}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {gramaPanchayatFee?.bettermentCharged?.length > 0
            ? gramaPanchayatFee?.bettermentCharged
            : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {gramaPanchayatFee?.buildingPermitFees?.length > 0
            ? gramaPanchayatFee?.buildingPermitFees
            : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{submitDate ?? "N/A"}</p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {gramaPanchayatFee?.paperPublicationFee?.length > 0
            ? gramaPanchayatFee?.paperPublicationFee
            : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {gramaPanchayatFee?.processingFee?.length > 0
            ? gramaPanchayatFee?.processingFee
            : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {" "}
          {greenFeeCharge?.greenFee?.length > 0 ? greenFeeCharge?.greenFee : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">
          {labourCessCharge?.labourCessOne?.length > 0
            ? labourCessCharge?.labourCessOne
            : 0}
        </p>
      </td>
      <td className="p-3 text-sm">
        <p className="text-gray-900 ">{totalPaid ?? "N/A"}</p>
      </td>
    </tr>
  );
};

export default ShowRevenueReports;
