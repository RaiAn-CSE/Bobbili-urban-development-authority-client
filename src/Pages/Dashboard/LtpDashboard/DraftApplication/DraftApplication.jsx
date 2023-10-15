import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBuildingColumns } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { BsHouseCheck, BsInfoCircle } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Application from "./Application";

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
    "btn btn-md hover:text-[#fff] rounded-lg transition-all duration-500 cursor-pointer hover:bg-black";

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const stepClasses = (index) => {
    if (index === currentStep) {
      return "step step-neutral";
    } else if (index < currentStep) {
      return "step step-neutral";
    } else {
      return "step";
    }
  };
  const completeBtn = (index) => {
    if (index === currentStep) {
      return `bg-black text-white shadow-sm shadow-black border-0 dark:${gradientColor}`;
    } else if (index < currentStep) {
      return `bg-black text-white shadow-md shadow-black border-0 dark:${gradientColor}`;
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

  const path = useLocation().pathname;

  const applicationModalShow =
    path.includes("applicationChecklist") ||
    path.includes("documents") ||
    path.includes("drawing") ||
    path.includes("payment");

  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <>
          <div className="flex justify-between items-center mx-10">
            <p
              className={`my-8 font-roboto font-semibold text-xl ${gradientColor} text-transparent bg-clip-text`}
            >
              <span className="text-black dark:text-white">
                Application No:
              </span>{" "}
              {applicationNo}
            </p>
            {applicationModalShow && (
              <button
                onClick={() => setOpenApplication(true)}
                className={`btn btn-sm text-xs ${gradientColor} transition-all duration-700  text-white dark:border-none`}
              >
                <HiOutlineClipboardDocumentList className="text-lg" />{" "}
                <span>Application</span>
              </button>
            )}

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
                      )} w-[300px] lg:w-fit text-sm `}
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
    </>
  );
};

export default DraftApplication;
