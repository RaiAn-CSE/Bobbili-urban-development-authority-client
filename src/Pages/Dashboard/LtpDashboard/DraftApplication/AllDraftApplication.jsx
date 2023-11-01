import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
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

  const [tableInfo, setTableInfo] = useState(false);
  const handleTableInfo = () => {
    tableInfo ? setTableInfo(false) : setTableInfo(true);
  };

  return (
    <>
      <tr className="border-b border-gray-200 dark:text-black hidden md:table-row">
        <td className="p-3 text-sm">
          <p className="text-gray-900 break-words">{serialNo + 1}</p>
        </td>
        <td className="p-3 text-sm">
          <button
            className="hover:underline"
            onClick={() =>
              showPageBasedOnApplicationType(applicationNo, navigate, "draft")
            }
          >
            <p className="text-gray-900 break-words">{applicationNo}</p>
          </button>
        </td>
        <td className="p-3 text-sm">
          <p className="text-gray-900 break-words">
            {applicantDetails.length ? applicantDetails[0].name : "N/A"}
          </p>
        </td>
        <td className="p-3 text-sm">
          <p className="text-gray-900 break-words">
            {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
          </p>
        </td>
        <td className="p-3 text-sm">
          <p className="text-gray-900 break-words">
            {generalInformation.caseType !== ""
              ? generalInformation.caseType
              : "N/A"}
          </p>
        </td>
        <td className="p-3 text-sm">
          <p className="text-gray-900 break-words">
            {generalInformation.village !== ""
              ? generalInformation.village
              : "N/A"}
          </p>
        </td>
        <td className="p-3 text-sm">
          <p className="text-gray-900 break-words">
            {generalInformation.mandal !== ""
              ? generalInformation.mandal
              : "N/A"}
          </p>
        </td>
        <td className="p-3 text-sm">
          <p className="text-gray-900 break-words">{createdDate ?? "N/A"}</p>
        </td>
        <td className="px-3 py-[7px] text-sm ">
          <button
            className={`btn btn-sm flex items-center border-none bg-[#ffd7d7] hover:bg-[#f6c7c7] text-red-400 hover:text-red-500 bg-transparent`}
            onClick={() =>
              alertToConfirmDelete(applicationNo, removeDraftApplication)
            }
          >
            <RiDeleteBin5Fill size={19} />
          </button>
        </td>
      </tr>

      <tr className="dark:text-black table-row md:hidden">
        <details className="flex flex-coll px-2 bg-gray-100">
          <summary className="flex items-center" onClick={handleTableInfo}>
            <div className="">
              {
                // tableInfo ? <AiOutlineMinusCircle size={19} /> : <AiFillPlusCircle size={19} />
                tableInfo ? (
                  <BiSolidDownArrow size={19} />
                ) : (
                  <BiSolidRightArrow size={19} />
                )
              }
            </div>
            <td className="p-3 border-b border-gray-200 text-sm">
              <p className="text-gray-900 break-words">
                <span className="font-semibold">Si.No: </span>
                {serialNo + 1}
              </p>
            </td>
            <td className="p-3 border-b border-gray-200 text-sm">
              <button
                className="hover:underline"
                onClick={() =>
                  showPageBasedOnApplicationType(
                    applicationNo,
                    navigate,
                    "draft"
                  )
                }
              >
                <p className="text-gray-900 break-words">
                  <span className="font-semibold">Application no: </span>
                  {applicationNo}
                </p>
              </button>
            </td>
            <td className="p-3 border-b border-gray-200 bg-[#ffd7d7] hover:bg-[#f6c7c7] rounded-full text-sm flex">
              <button
                className={`text-red-400 hover:text-red-500 bg-transparent`}
                onClick={() =>
                  alertToConfirmDelete(applicationNo, removeDraftApplication)
                }
              >
                <RiDeleteBin5Fill size={19} />
              </button>
            </td>
          </summary>

          <div className="ml-5">
            <td className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Owner name: </span>
              <p className="text-gray-900 break-words">
                {applicantDetails.length ? applicantDetails[0].name : "N/A"}
              </p>
            </td>
            <td className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Phone no: </span>
              <p className="text-gray-900 break-words">
                {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
              </p>
            </td>
            <td className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Case type: </span>
              <p className="text-gray-900 break-words">
                {generalInformation.caseType !== ""
                  ? generalInformation.caseType
                  : "N/A"}
              </p>
            </td>
            <td className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Village: </span>
              <p className="text-gray-900 break-words">
                {generalInformation.village !== ""
                  ? generalInformation.village
                  : "N/A"}
              </p>
            </td>
            <td className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Mandal: </span>
              <p className="text-gray-900 break-words">
                {generalInformation.mandal !== ""
                  ? generalInformation.mandal
                  : "N/A"}
              </p>
            </td>
            <td className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Created date: </span>
              <p className="text-gray-900 break-words">
                {createdDate ?? "N/A"}
              </p>
            </td>
          </div>
        </details>
      </tr>
    </>
  );
};

export default AllDraftApplication;
