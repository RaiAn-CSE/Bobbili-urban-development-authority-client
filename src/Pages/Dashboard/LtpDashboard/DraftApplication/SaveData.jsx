import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { IoSaveSharp } from "react-icons/io5";
import { MdOutlineSaveAs } from "react-icons/md";
import ArrowIcon from "../../../Components/ArrowIcon";
import BtnStyle from "../../../../Style/SaveBtnStyle.module.css";
import { BsFillSaveFill } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
import { TbFileLike } from "react-icons/tb";
import { TiCancel } from "react-icons/ti";

const SaveData = ({
  isStepperVisible,
  currentStep,
  steps,
  confirmAlert,
  stepperData,
  collectInputFieldData,
  sentToPS,
  setSentData,
  sentData,
  isApproved,
  refetch,
}) => {
  let btnClass =
    "btn btn-md text-[#000000] hover:text-[#fff] rounded-lg transition-all duration-500 cursor-pointer hover:bg-[#510BC4]";

  // console.log(collectInputFieldData);
  const {
    userInfoFromLocalStorage,
    getSubmitApplicationData,
    needToHideElementBasedOnPage,
  } = useContext(AuthContext);

  const role = userInfoFromLocalStorage().role;

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
  const location = useLocation();

  // const [isApproved, setIsApproved] = useState(null);

  // const [isUpdate, setIsUpdate] = useState(0);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname.includes("siteInspection")) {
  //     console.log("INSIDE");
  //     const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  //     console.log(applicationNo, "AppNo");

  //     const getSubmitAppData = async () => {
  //       const data = await getSubmitApplicationData(applicationNo);
  //       console.log(data, "SAD");
  //       // setGetSubmitData(data);

  //       const documentDecision = data?.psDocumentPageObservation?.approved;
  //       const drawingDecision = data?.psDrawingPageObservation?.approved;
  //       const siteInspectionDecision = data?.siteInspection?.decision;

  //       console.log(documentDecision, drawingDecision, siteInspectionDecision);

  //       if (
  //         documentDecision?.length &&
  //         drawingDecision?.length &&
  //         siteInspectionDecision?.length
  //       ) {
  //         if (
  //           documentDecision.toLowerCase() === "true" &&
  //           drawingDecision.toLowerCase() === "true" &&
  //           siteInspectionDecision.toLowerCase() === "approved"
  //         ) {
  //           setIsApproved(1);
  //         }
  //         if (
  //           documentDecision.toLowerCase() === "false" &&
  //           drawingDecision.toLowerCase() === "false" &&
  //           siteInspectionDecision.toLowerCase() === "shortfall"
  //         ) {
  //           setIsApproved(0);
  //         }
  //       }
  //     };

  //     getSubmitAppData();
  //   }
  // }, []);
  const path = location.pathname;
  const hiddenSaveButtonForPS =
    (path.includes("buildingInfo") ||
      path.includes("applicantInfo") ||
      path.includes("applicationChecklist") ||
      path.includes("payment")) &&
    "hidden";

  console.log(isApproved, "approved");

  console.log(sentData, "Sentdata");
  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <div className="flex justify-end my-6 px-10">
          {role === "LTP" &&
            (currentStep !== steps.length - 1 ? (
              <button
                className={`fancy-button mt-8 ${needToHideElementBasedOnPage() && "hidden"
                  }`}
                // type="submit"
                // onClick={() =>
                //   // currentStep < steps.length - 1 &&
                //   // handleStepClick(currentStep + 1)
                //   confirmAlert()
                // }
                onClick={() => confirmAlert(stepperData, collectInputFieldData)}
              >
                Save and Continue
              </button>
            ) : (
              <div
                className={`${needToHideElementBasedOnPage() && "hidden"
                  } flex justify-between items-center w-full mt-10`}
              >
                <button
                  className={`save-btn bg-gradient-to-b from-[#a29bfe] to-[#6c5ce7] mr-4`}
                  // type="submit"
                  // onClick={() =>
                  //   // currentStep < steps.length - 1 &&
                  //   // handleStepClick(currentStep + 1)
                  //   confirmAlert()
                  // }
                  onClick={() => {
                    confirmAlert(undefined, collectInputFieldData, {
                      page: "payment",
                      setSentData,
                    });
                  }}
                >
                  <span className="flex justify-center items-center">
                    {" "}
                    <MdOutlineSaveAs size={20} className="mr-2" />
                    Save
                  </span>
                </button>
                {/* <button
                  className={`btn btn-md text-white rounded-lg shadow-md border-0 mt-6  transition-all duration-500 cursor-pointer ${
                    sentData === 1 && gradientColor
                  } ${sentData === 1 && "shadow-violetDark"}`}
                  disabled={sentData === 0}
                  onClick={() =>
                    sentToPS(
                      JSON.parse(localStorage.getItem("CurrentAppNo")),
                      navigate
                    )
                  }
                >
                  Sent to department
                </button> */}

                <button
                  className="sent-department"
                  disabled={sentData === 0}
                  onClick={() =>
                    sentToPS(
                      JSON.parse(localStorage.getItem("CurrentAppNo")),
                      navigate
                    )
                  }
                >
                  {/* <span
                    className={`${
                      sentData === 0
                        ? "absolute top-[-80%] left-[25%] bg-[#6225e6] p-1 text-xs"
                        : "hidden"
                    }`}
                  >
                    Click on save button
                  </span> */}
                  <span className="span">Sent to department</span>
                  <span className="second">
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            ))}

          {/* role ===ps  */}

          {role === "PS" && (
            <>
              <button
                className={`save-btn flex items-center nm_Container bg-[#7465EA] ${hiddenSaveButtonForPS} text-sm text-white px-7 mt-5 ml-3  hover:bg-bgColor hover:text-normalViolet border-0 uppercase transition-all duration-500 `}
                onClick={() => {
                  confirmAlert(undefined, collectInputFieldData, {
                    page: "PS site inspection data save",
                    refetch,
                  });
                }}
              >
                <BsFillSaveFill size={16} className="mr-2" />
                Save
              </button>
              {location.pathname.includes("siteInspection") &&
                isApproved === 1 && (
                  <button
                    className={`fancy-button text-sm px-7 mt-5 ml-6  border-0 transition-all duration-500 text-white`}
                    onClick={() => {
                      localStorage.setItem(
                        "PSDecision",
                        JSON.stringify("approved")
                      );
                      confirmAlert(undefined, sentData, {
                        page: "siteInspection",
                        navigate,
                      });
                    }}
                  >
                    <span>Proceeding Issued</span>
                  </button>
                )}
              {location.pathname.includes("siteInspection") &&
                isApproved === 0 && (
                  <>
                    <button
                      className={`${BtnStyle.customBtnForProceeding} ${BtnStyle.publishEndorseBtn} text-[17px] px-7 mt-5 ml-6`}
                      onClick={() => {
                        localStorage.setItem(
                          "PSDecision",
                          JSON.stringify("shortfall")
                        );
                        confirmAlert(undefined, sentData, {
                          page: "siteInspection",
                          navigate,
                        });
                      }}
                    >
                      <TbFileLike size={25} className="me-1" />
                      Publish Endorsement
                    </button>
                    <button
                      className={`${BtnStyle.rejectBtn} flex items-center font-bold text-base px-5 mt-5 ml-6 border-3 transition-all duration-1000 nm_Container border-red-500 bg-[#f53844] text-white`}
                      onClick={() => {
                        localStorage.setItem(
                          "PSDecision",
                          JSON.stringify("reject")
                        );
                        confirmAlert(undefined, sentData, {
                          page: "siteInspection",
                          navigate,
                        });
                      }}
                    >
                      Reject
                      <TiCancel size={20} className="ms-1" />
                    </button>
                  </>
                )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SaveData;
