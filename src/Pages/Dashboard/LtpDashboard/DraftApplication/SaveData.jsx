import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { IoSaveSharp } from "react-icons/io5";
import { MdOutlineSaveAs } from "react-icons/md";
import ArrowIcon from "../../../Components/ArrowIcon";

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
  const { userInfoFromLocalStorage, getSubmitApplicationData } =
    useContext(AuthContext);

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
      path.includes("applicationChecklist")) &&
    "hidden";

  const page = JSON.parse(localStorage.getItem("page"));

  const hideBtnPageWise =
    page === "submit" || page === "approved" || page === "shortfall";

  console.log(isApproved, "approved");

  console.log(sentData, "Sentdata");
  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <div className="flex justify-end my-8 px-10">
          {role === "LTP" &&
            (currentStep !== steps.length - 1 ? (
              <button
                className={`fancy-button mt-8 ${hideBtnPageWise && "hidden"}`}
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
                className={`${
                  hideBtnPageWise && "hidden"
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
                className={`btn btn-md nm_Container bg-normalViolet ${hiddenSaveButtonForPS} text-sm text-white px-8 mt-10 ml-3  hover:bg-bgColor hover:text-normalViolet border-0 transition-all duration-500`}
                onClick={() => {
                  confirmAlert(undefined, collectInputFieldData, {
                    page: "PS site inspection data save",
                    refetch,
                  });
                }}
              >
                Save
              </button>
              {location.pathname.includes("siteInspection") &&
                isApproved === 1 && (
                  <button
                    className={`btn btn-md text-sm px-7 mt-10 ml-6 shadow-md hover:shadow-violetDark border-0 transition-all duration-500 bg-black hover:bg-black text-white`}
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
                    Proceeding Issued
                  </button>
                )}
              {location.pathname.includes("siteInspection") &&
                isApproved === 0 && (
                  <>
                    <button
                      className={`btn btn-md text-sm px-7 mt-10 ml-6 shadow-md hover:shadow-violetDark border-0 transition-all duration-500 bg-black hover:bg-black text-white`}
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
                      Publish Endorsement
                    </button>
                    <button
                      className={`btn btn-md text-sm px-7 mt-10 ml-6 shadow-md hover:shadow-violetDark border-0 transition-all duration-500 bg-black hover:bg-black text-white`}
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
