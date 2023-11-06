import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

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

  console.log(isApproved, "approved");
  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <div className="flex justify-end my-8 px-10">
          {role === "LTP" &&
            (currentStep !== steps.length - 1 ? (
              <button
                className={`${btnClass} nm_Container text-white bg-normalViolet font-roboto  border-none  `}
                type="submit"
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
              <div>
                <button
                  className={`${btnClass} me-10 px-6 bg-normalViolet text-white font-roboto shadow-md shadow-violetDark border-none hover:bg-violetDark`}
                  type="submit"
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
                  Save
                </button>
                <button
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
