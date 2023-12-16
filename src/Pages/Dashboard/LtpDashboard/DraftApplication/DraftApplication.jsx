import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBuildingColumns } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { FiRefreshCcw } from "react-icons/fi";
import { BsHouseCheck, BsInfoCircle } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { VscDebugContinue, VscReferences } from "react-icons/vsc";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Application from "./Application";
import EndorsementModal from "../../../Shared/EndorsementModal";
import ProceedingModal from "../../../Shared/ProceedingModal";
import { AiFillPieChart } from "react-icons/ai";
import DrawingModal from "../../../Shared/DrawingModal";

const DraftApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [openApplication, setOpenApplication] = useState(false);
  const [openProceeding, setOpenProceeding] = useState(false);
  const [openEndorsement, setOpenEndorsement] = useState(false);
  const [openDrawing, setOpenDrawing] = useState(false);

  const { userInfoFromLocalStorage } = useContext(AuthContext);

  const cameFrom = JSON.parse(localStorage.getItem("page"));
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const getIndex = JSON.parse(localStorage.getItem("stepIndex"));
  const role = userInfoFromLocalStorage()?.role;

  useEffect(() => {
    setCurrentStep(getIndex);
  }, []);

  const steps = [
    "/buildingInfo",
    "/applicantInfo",
    "/applicationChecklist",
    "/documents",
    "/drawing",
    "/payment",
  ];

  const stepsContent = [
    `Building Info`,
    "Applicant Info",
    "App. Checklist",
    "Documents",
    "Drawing",
    "Payment",
  ];

  if (role === "PS") {
    steps.push("/siteInspection");
    stepsContent.push("Site Inspection");
  }

  // Delete Payment page from LTP DrapApplication:
  if (cameFrom === "draft") {
    const index = steps.indexOf("/payment");

    if (index !== -1) {
      steps.splice(index, 1);
      stepsContent.splice(index, 1);
    }
  }


  // Use localStorage to store and retrieve the current step
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");

    if (location.pathname === "/dashboard/draftApplication") {
      setCurrentStep(0);
    } else if (savedStep !== null) {
      setCurrentStep(parseInt(savedStep, 10));
    }

    return () => {
      localStorage.removeItem("currentStep");
    };
  }, [location.pathname]);

  const handleStepClick = (index) => {
    setCurrentStep(index);
    localStorage.setItem("stepIndex", JSON.stringify(index)); // Store the current step in localStorage
    navigate(`/dashboard/draftApplication${steps[index]}`);
  };

  // handle alert system

  const additionalSteps = [
    "/dashboard/draftApplication/buildingInfo",
    "/dashboard/draftApplication/applicantInfo",
    "/dashboard/draftApplication/applicationChecklist",
    "/dashboard/draftApplication/documents",
    "/dashboard/draftApplication/drawing",
    "/dashboard/draftApplication/payment",
    "/dashboard/draftApplication/siteInspection",
  ];

  const allSteps = [...steps, ...additionalSteps];

  const isStepperVisible = allSteps.includes(location.pathname); // Check if current route is in the list of routes with the stepper

  const stepClasses = (index) => {
    if (index === currentStep) {
      return "step step-primary";
    } else if (index < currentStep) {
      return "step step-primary";
    } else {
      return "";
    }
  };

  const completeBtn = (index) => {
    if (index === currentStep) {
      return `bg-gradient-to-b from-[#a29bfe] to-[#6c5ce7] shadow-none text-white border-0 `;
    } else if (index < currentStep) {
      return ` bg-gradient-to-b from-[#a29bfe] to-[#6c5ce7] shadow-none text-white border-0 `;
    } else {
      return ``;
    }
  };

  const icons = [
    <FaBuildingColumns size={15} />,
    <BsInfoCircle size={17} />,
    <GoChecklist size={18} />,
    <HiOutlineClipboardDocumentList size={19} />,
    <BsHouseCheck size={17} />,
    <RiSecurePaymentLine size={19} />,
  ];

  const path = useLocation()?.pathname;

  // check the page name to show the building info and other pages application value

  const applicationButtonForDraftApplication =
    (path.includes("applicationChecklist") ||
      path.includes("documents") ||
      path.includes("drawing") ||
      path.includes("payment")) &&
    (cameFrom === "draft" || cameFrom === "submit");

  console.log(
    applicationButtonForDraftApplication &&
    (cameFrom === "draft" || cameFrom === "submit")
  );

  const applicationButtonForApprovedOrShortfallApplication =
    !path.includes("siteInspection") &&
    (cameFrom === "approved" || cameFrom === "shortfall");

  const navigateToResubmitPage = () => {
    const appNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
    navigate("/dashboard/resubmitApplication", { state: { appNo } });
  };

  let btnClass =
    "nm_Container btn-md hover:text-[#fff] text-black  transition-all duration-500 cursor-pointer hover:bg-normalViolet bg-bgColor";

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <>
          <div className="lg:flex justify-between items-center mx-2 lg:mx-5">
            <p
              className={`nm_Container w-fit p-2 my-8 font-roboto font-semibold text-lg ${gradientColor} text-transparent bg-clip-text`}
            >
              <span className="text-black">Application No:</span>{" "}
              {applicationNo}
            </p>

            <div className="flex justify-end">
              {cameFrom === "approved" && (
                <>
                  <button
                    onClick={() => {
                      // document.getElementById("proceedingModal").showModal();
                      setOpenProceeding(true);
                    }}
                    className={`flex justify-center items-center gap-1 btn-sm nm_Container text-sm bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white me-2 lg:me-5 border-none`}
                  >
                    <VscDebugContinue className="text-lg" />{" "}
                    <span>Proceeding</span>
                  </button>

                  <button
                    className={`flex justify-center items-center gap-1 btn-sm text-sm nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white me-2 lg:me-5 border-none`}
                    onClick={() => setOpenDrawing(true)}
                  >
                    <AiFillPieChart className="text-lg" /> <span>Drawing</span>
                  </button>
                </>
              )}

              {cameFrom === "shortfall" && (
                <>
                  <button
                    className={`flex justify-center items-center gap-1 btn-sm text-sm nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white me-2 lg:me-5  border-none`}
                    onClick={navigateToResubmitPage}
                  >
                    <FiRefreshCcw className="text-lg" /> <span>Resubmit</span>
                  </button>
                  <button
                    // Open the modal using document.getElementById('ID').showModal() method
                    onClick={() => {
                      // document.getElementById("my_modal_2").showModal();
                      setOpenEndorsement(true);
                    }}
                    className={`flex justify-center items-center gap-1 btn-sm me-2 lg:me-5 text-sm nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white border-none`}
                  >
                    <VscReferences className="text-lg" />{" "}
                    <span className="text-xs uppercase">Endorsement</span>
                  </button>
                </>
              )}

              {(applicationButtonForDraftApplication ||
                applicationButtonForApprovedOrShortfallApplication) && (
                  <button
                    onClick={() => setOpenApplication(true)}
                    className={`flex justify-center items-center gap-1 btn-sm text-sm nm_Container bg-normalViolet  hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white border-none`}
                  >
                    <HiOutlineClipboardDocumentList className="text-lg" />{" "}
                    <span>Application</span>
                  </button>
                )}
            </div>
          </div>
          <div className="w-full steps steps-vertical lg:steps-horizontal rounded-lg py-4 lg:relative font-roboto px-4 lg:px-0">
            {stepsContent.map((step, index) => (
              <div
                key={index}
                data-content={index + 1}
                className={`${stepClasses(index)}`}
                onClick={() => handleStepClick(index)}
              >
                <button
                  className={`${btnClass} ${completeBtn(index)} ${role !== "PS"
                    ? "w-[70%] lg:w-[15.3%]"
                    : "w-[50%] lg:w-[13%]"
                    } text-[15px] font-bold gap-1 border-0 flex justify-center items-center lg:absolute top-3 z-10`}
                >
                  {role !== "PS" && icons[index]}
                  <span>{step}</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* content  */}
      <Outlet
        context={[isStepperVisible, currentStep, steps, handleStepClick]}
      />

      {/* proceedingModal modal info  */}
      {openProceeding ? (
        <ProceedingModal
          modalProceeding={{ setOpenProceeding, openProceeding }}
        />
      ) : (
        ""
      )}

      {/* my_modal_2 modal info : */}
      {openEndorsement ? (
        <EndorsementModal
          modalEndorsement={{ setOpenEndorsement, openEndorsement }}
        />
      ) : (
        ""
      )}

      {/* Application Modal */}
      {openApplication ? (
        <Application setOpenApplication={setOpenApplication} />
      ) : (
        ""
      )}

      {openDrawing && (
        <DrawingModal modalStates={{ openDrawing, setOpenDrawing }} />
      )}
    </>
  );
};

export default DraftApplication;
