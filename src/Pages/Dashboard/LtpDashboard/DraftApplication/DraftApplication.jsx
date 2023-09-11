import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const DraftApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "/buildingInfo",
    "/applicantInfo",
    "/applicationChecklist",
    "/documents",
    "/drawing",
    "/payment",
  ];

  const stepsContent = [
    "Building Info",
    "Applicant Info",
    "Appli. Checklist",
    "Documents",
    "Drawing",
    "Payment",
  ];

  const handleStepClick = (index) => {
    setCurrentStep(index);
    navigate(`/dashboard/draftApplication${steps[index]}`);
  };


  const additionalSteps = [
    "/dashboard/draftApplication/buildingInfo",
    "/dashboard/draftApplication/applicantInfo",
    "/dashboard/draftApplication/applicationChecklist",
    "/dashboard/draftApplication/documents",
    "/dashboard/draftApplication/drawing",
    "/dashboard/draftApplication/payment",
  ];

  const allSteps = [...steps, ...additionalSteps];

  const isStepperVisible = allSteps.includes(location.pathname); // Check if current route is in the list of routes with the stepper

  const stepClasses = (index) => {
    if (index === currentStep) {
      return "step step-success";
    } else if (index < currentStep) {
      return "step step-success";
    } else {
      return "step cursor-pointer";
    }
  };

  const btnClass =
    "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer";

  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <div>
          <ul className="steps w-full steps-vertical lg:steps-horizontal">
            {stepsContent.map((step, index) => (
              <li
                key={index}
                data-content={index + 1}
                className={stepClasses(index)}
                onClick={() => handleStepClick(index)}
              >
                <span className={btnClass}>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Outlet />

      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <div className="flex justify-around mb-10">
          <button
            className={btnClass}
            onClick={() =>
              currentStep > 0 && handleStepClick(currentStep - 1)
            }
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            className={btnClass}
            onClick={() =>
              currentStep < steps.length - 1 && handleStepClick(currentStep + 1)
            }
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default DraftApplication;
