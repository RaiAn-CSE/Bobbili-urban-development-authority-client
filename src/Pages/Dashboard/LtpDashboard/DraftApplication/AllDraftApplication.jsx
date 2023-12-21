import React, { useContext, useEffect, useState } from "react";
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

  const [tableInfo, setTableInfo] = useState(false);
  const handleTableInfo = () => {
    tableInfo ? setTableInfo(false) : setTableInfo(true);
  };

  // Screen weight :===============>>>
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    // Update screen size on window resize
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {
        screenSize > 1024 ?
          (
            <tr className="border-b border-gray-200 dark:text-black">
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
          )
          :
          (
            <div className="dark:text-black">
              <details className="flex flex-coll px-2 bg-gray-100">
                <summary className="flex items-center justify-between" onClick={handleTableInfo}>
                  <div className="text-[#8B5BF6]">
                    {
                      tableInfo ? <AiOutlineMinusCircle size={25} /> : <AiFillPlusCircle size={25} />
                      // tableInfo ? <BiSolidDownArrow size={19} /> : <BiSolidRightArrow size={19} />
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
          )
      }
    </>
  );
};

export default AllDraftApplication;
