import React, { useState } from 'react';
// import Table from '../../Components/Table';
import AppChecklist from './AppChecklist/AppChecklist';
import BuildingInfo from './BuildingInfo';
import ApplicantInfo from './ApplicantInfo';

const DraftApplication = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { content: "1", text: "Building info" },
        { content: "2", text: "Applicant info" },
        { content: "3", text: "Application list" },
        { content: "4", text: "Document" },
        { content: "5", text: "Drawing" },
        { content: "6", text: "Payment" },
    ];

    const handleStepClick = (index) => {
        setCurrentStep(index);
    };

    const stepClasses = (index) => {
        if (index === currentStep) {
            return 'step step-primary';
        } else if (index < currentStep) {
            return 'step step-primary';
        } else {
            return 'step';
        }
    };

    const btnClass = 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow';


    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <>
                        <BuildingInfo />
                    </>
                );
            case 1:
                return (
                    <>
                        <ApplicantInfo />
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className='py-4 px-5 rounded mt-6 uppercase bg-sky-500 text-black inline-block DisplayFair'>Application Checklist</h2>
                        <>
                            <AppChecklist />
                        </>
                    </>
                );
            case 3:
                return (
                    <div className='min-h-screen'>
                        <h2>Step 4: Receive Product</h2>
                        <>
                            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nisi corporis repellat ratione maiores? Repellat harum nemo neque nesciunt? Quibusdam quas molestias suscipit numquam sapiente?</h1>
                        </>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div>
                <ul className="steps steps-vertical lg:steps-horizontal">
                    {steps.map((step, index) => (
                        <li
                            key={index}
                            data-content={step.content}
                            className={stepClasses(index)}
                            onClick={() => handleStepClick(index)}
                        >
                            <span className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                {step.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {renderStepContent()}

            <div className="flex justify-around mb-10">
                <button className={btnClass} onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}>
                    Previous
                </button>
                <button className={btnClass} onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === steps.length - 1}>
                    Next
                </button>
            </div>
        </>
    );
};

export default DraftApplication;
