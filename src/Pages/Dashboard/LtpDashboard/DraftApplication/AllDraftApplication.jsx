import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import DeleteIcon from "../../../Components/DeleteIcon";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const AllDraftApplication = ({
  serialNo,
  applicationData,
  tableComponentProps,

  // tableComponentProps,
}) => {
  const { alertToConfirmDelete } = useContext(AuthContext);
  // console.log(applicationData);

  const { showPageBasedOnApplicationType, removeDraftApplication, navigate } =
    tableComponentProps;

  const { applicationNo, buildingInfo, applicantInfo, createdDate } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  // console.log(applicantInfo, "applicantInfo");

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
            className={`delete-btn`}
            onClick={() =>
              alertToConfirmDelete(applicationNo, removeDraftApplication)
            }
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>

      {/* Only for mobile device */}
      <div className="dark:text-black md:hidden">
        <details className="flex flex-coll px-2 bg-gray-100">
          <summary className="flex items-center" onClick={handleTableInfo}>
            <div className="text-[#8B5BF6]">
              {
                tableInfo ? <AiOutlineMinusCircle size={25} /> : <AiFillPlusCircle size={25} />
                // tableInfo ? (
                //   <BiSolidDownArrow size={19} />
                // ) : (
                //   <BiSolidRightArrow size={19} />
                // )
              }
            </div>
            <div className="p-3 border-b border-gray-200 text-sm">
              <p className="text-gray-900 break-words">
                <span className="font-semibold">Si.No: </span>
                {serialNo + 1}
              </p>
            </div>
            <div className="p-3 border-b border-gray-200 text-sm">
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
            </div>
            <div className="p-3 border-b border-gray-200 bg-[#ffd7d7] hover:bg-[#f6c7c7] rounded-full text-sm flex">
              <button
                className={`text-red-400 hover:text-red-500 bg-transparent`}
                onClick={() =>
                  alertToConfirmDelete(applicationNo, removeDraftApplication)
                }
              >
                <RiDeleteBin5Fill size={19} />
              </button>
            </div>
          </summary>

          <div className="ml-5">
            <div className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Owner name: </span>
              <p className="text-gray-900 break-words">
                {applicantDetails.length ? applicantDetails[0].name : "N/A"}
              </p>
            </div>
            <div className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Phone no: </span>
              <p className="text-gray-900 break-words">
                {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
              </p>
            </div>
            <div className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Case type: </span>
              <p className="text-gray-900 break-words">
                {generalInformation.caseType !== ""
                  ? generalInformation.caseType
                  : "N/A"}
              </p>
            </div>
            <div className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Village: </span>
              <p className="text-gray-900 break-words">
                {generalInformation.village !== ""
                  ? generalInformation.village
                  : "N/A"}
              </p>
            </div>
            <div className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Mandal: </span>
              <p className="text-gray-900 break-words">
                {generalInformation.mandal !== ""
                  ? generalInformation.mandal
                  : "N/A"}
              </p>
            </div>
            <div className="p-3 border-b border-gray-200 text-sm flex justify-start">
              <span className="font-semibold mr-2">Created date: </span>
              <p className="text-gray-900 break-words">
                {createdDate ?? "N/A"}
              </p>
            </div>
          </div>
        </details>
      </div>


      {/* <div className="md:hidden">
        <div id="accordion-collapse" data-accordion="collapse" >
          <h2 id="accordion-collapse-heading-1">
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
              <span>What is Flowbite?</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
              <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
            </div>
          </div>
        </div>
      </div> */}

    </>
  );
};

export default AllDraftApplication;
