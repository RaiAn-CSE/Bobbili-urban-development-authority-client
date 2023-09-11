import React, { useEffect, useState } from "react";
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


  // Use localStorage to store and retrieve the current step
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep !== null) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  const handleStepClick = (index) => {
    setCurrentStep(index);
    localStorage.setItem("currentStep", index.toString()); // Store the current step in localStorage
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
      return "step step-success pb-1 bg-[#c0e9e4]";
    } else if (index < currentStep) {
      return "step step-success pb-1 bg-[#c0e9e4]";
    } else {
      return "step cursor-pointer pb-1";
    }
  };

  const btnClass =
    "btn btn-md text-[#000000] hover:text-[#fff] bg-[#54c999] hover:bg-[#00b072] hover:shadow-md transition-all duration-500 rounded shadow cursor-pointer";

  return (
    <>
      {isStepperVisible && ( // Render the stepper only when isStepperVisible is true
        <div className="mt-3 mb-8">
          <ul className="steps w-full steps-vertical lg:steps-horizontal rounded-lg">
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
            Save and Continue
          </button>
        </div>
      )}
    </>
  );
};

export default DraftApplication;
