import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBuildingColumns } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { BsHouseCheck, BsInfoCircle } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const DraftApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  // const { applicationNo } = location.state;
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
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

  console.log(stepsContent, steps);

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

  // console.log(currentStep);

  const handleStepClick = (index) => {
    setCurrentStep(index);
    localStorage.setItem("currentStep", index.toString()); // Store the current step in localStorage
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

  console.log("DRAFT APPLICATION");

  const allSteps = [...steps, ...additionalSteps];

  console.log(location.pathname);

  const isStepperVisible = allSteps.includes(location.pathname); // Check if current route is in the list of routes with the stepper

  let btnClass =
    "btn btn-md hover:text-[#fff] rounded-lg transition-all duration-500 cursor-pointer hover:bg-black";

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
      return "bg-black text-white shadow-sm shadow-black border-0 ";
    } else if (index < currentStep) {
      return "bg-black text-white shadow-md shadow-black border-0";
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

  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <>
          <p className="ms-10 my-8 font-roboto font-bold text-xl">
            Application No: {applicationNo}
          </p>
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
