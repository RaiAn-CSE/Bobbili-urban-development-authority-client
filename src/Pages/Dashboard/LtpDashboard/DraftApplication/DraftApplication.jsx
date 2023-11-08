import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBuildingColumns } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { BsHouseCheck, BsInfoCircle } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Application from "./Application";
import EndorsementModal from "../../../Shared/EndorsementModal";

const DraftApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [openApplication, setOpenApplication] = useState(false);

  // const { applicationNo } = location.state;
  // console.log(
  //   JSON.parse(localStorage.getItem("CurrentAppNo")),
  //   "APPLICATION NO"
  // );
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const getIndex = JSON.parse(localStorage.getItem("stepIndex"));

  useEffect(() => {
    setCurrentStep(getIndex);
  }, []);

  // console.log(applicationNo);

  const { userInfoFromLocalStorage } = useContext(AuthContext);

  const role = userInfoFromLocalStorage()?.role;

  console.log(role);

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
    console.log("ASLCAM");
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

  let btnClass =
    "btn btn-md hover:text-[#fff] text-black rounded-lg transition-all duration-500 cursor-pointer hover:bg-normalViolet bg-bgColor ";

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

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
      return `nm_Container bg-gradient-to-b from-[#a29bfe] to-[#6c5ce7] shadow-none text-white border-0 `;
    } else if (index < currentStep) {
      return `nm_Container bg-gradient-to-b from-[#a29bfe] to-[#6c5ce7]  shadow-none text-white border-0 `;
    }
  };

  const icons = [
    <FaBuildingColumns size={15} />,
    <BsInfoCircle size={18} />,
    <GoChecklist size={18} />,
    <HiOutlineClipboardDocumentList size={19} />,
    <BsHouseCheck size={17} />,
    <RiSecurePaymentLine size={19} />,
  ];

  const path = useLocation()?.pathname;

  // check the page name to show the building info and other pages application value

  const cameFrom = JSON.parse(localStorage.getItem("page"));

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

  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <>
          <div className="flex justify-between items-center mx-5">
            <p
              className={`nm_Container p-2 my-8 font-roboto font-semibold text-lg ${gradientColor} text-transparent bg-clip-text`}
            >
              <span className="text-black">Application No:</span>{" "}
              {applicationNo}
            </p>

            <div>
              {cameFrom === "approved" && (
                <>
                  <button
                    className={`btn btn-sm nm_Container text-xs bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white me-5 dark:border-none`}
                  >
                    <HiOutlineClipboardDocumentList className="text-lg" />{" "}
                    <span>Proceeding</span>
                  </button>

                  <button
                    className={`btn btn-sm text-xs nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white me-5 dark:border-none`}
                  >
                    <HiOutlineClipboardDocumentList className="text-lg" />{" "}
                    <span>Drawing</span>
                  </button>
                </>
              )}

              {cameFrom === "shortfall" && (
                <>
                  <button
                    className={`btn btn-sm text-xs nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white me-5  dark:border-none`}
                  >
                    <HiOutlineClipboardDocumentList className="text-lg" />{" "}
                    <span>Resubmit</span>
                  </button>
                  <button
                    // Open the modal using document.getElementById('ID').showModal() method
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                    className={`btn btn-sm me-5 text-xs nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white dark:border-none`}
                  >
                    <HiOutlineClipboardDocumentList className="text-lg" />{" "}
                    <span className="text-xs uppercase">Endorsement</span>
                  </button>
                </>
              )}

              {(applicationButtonForDraftApplication ||
                applicationButtonForApprovedOrShortfallApplication) && (
                <button
                  onClick={() => setOpenApplication(true)}
                  className={`btn btn-sm text-xs nm_Container bg-normalViolet hover:text-[#510BC4] hover:bg-bgColor transition-all duration-700 text-white dark:border-none`}
                >
                  <HiOutlineClipboardDocumentList className="text-lg" />{" "}
                  <span>Application</span>
                </button>
              )}
            </div>

            {/* Application Modal */}
            {openApplication ? (
              <Application setOpenApplication={setOpenApplication} />
            ) : (
              ""
            )}
          </div>
          <div className="mt-3 mb-5 font-roboto">
            <ul className="w-full steps steps-vertical lg:steps-horizontal  rounded-lg">
              {stepsContent.map((step, index) => (
                <li
                  key={index}
                  data-content={index + 1}
                  className={`${stepClasses(index)} lg:relative lg:pt-1`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="lg:absolute lg:top-0 z-10">
                    <span
                      className={`${btnClass} ${completeBtn(
                        index
                      )} w-[300px] lg:w-fit text-sm border-0 nm_Container `}
                    >
                      {role !== "PS" && icons[index]}
                      {step}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* content  */}
      <Outlet
        context={[isStepperVisible, currentStep, steps, handleStepClick]}
      />

      <EndorsementModal />
    </>
  );
};

export default DraftApplication;
