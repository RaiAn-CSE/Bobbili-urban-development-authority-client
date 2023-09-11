import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const DraftApplication = () => {
  // const navigate = useNavigate();
  // const [currentStep, setCurrentStep] = useState(0);

  // const steps = [
  //   "/buildingInfo",
  //   "/applicantInfo",
  //   "/applicationChecklist",
  //   "/documents",
  //   "/drawing",
  //   "/payment",
  // ];

  // const stepsContent = [
  //   "Building Info",
  //   "Applicant Info",
  //   "Appl. Checklist",
  //   "Documents",
  //   "Drawing",
  //   "Payment",
  // ];

  // const handleStepClick = (index) => {
  //   setCurrentStep(index);
  //   navigate(`/dashboard/draftApplication${steps[index]}`);
  // };

  // const stepClasses = (index) => {
  //   if (index === currentStep) {
  //     return "step step-success";
  //   } else if (index < currentStep) {
  //     return "step step-success";
  //   } else {
  //     return "step";
  //   }
  // };

  // const btnClass =
  //   "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";

  return (
    <>
      <Outlet />

      {/* <div>
        <ul className="steps steps-vertical lg:steps-horizontal">
          {stepsContent.map((step, index) => (
            <li
              key={index}
              data-content={index + 1}
              className={stepClasses(index)}
              onClick={() => handleStepClick(index)}
            >
              <span className={btnClass}>
                {step}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Outlet />

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
      </div> */}
    </>
  );
};

export default DraftApplication;
