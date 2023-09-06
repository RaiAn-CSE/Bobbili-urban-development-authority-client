import React, { useState } from 'react';
import Table from '../../Components/Table';
import AppChecklist from './AppChecklist/AppChecklist';

const DraftApplication = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { content: "", text: "Application Checklist" },
        { content: "", text: "Building" },
        { content: "", text: "Document" },
        { content: "", text: "Drawing" },
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
                    <div>
                        
                        <>
                        <h2 className='py-4 px-5 rounded mt-6 uppercase bg-sky-500 text-black inline-block DisplayFair'>Application Checklist</h2>
                        <>
                       <AppChecklist/>
                        </>
                        </>
                    </div>
                );
            case 1:
                return (
                    <div>
                       <Table/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2>Step 3: Purchase</h2>
                        <>
                            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, quam doloribus quis natus nesciunt tempora eligendi. Cumque, voluptatibus. Illo officiis mollitia minus optio porro illum atque neque ipsum corporis itaque?</h1>
                        </>
                    </div>
                );
            case 3:
                return (
                    <div>
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
                        <li key={index} data-content={step.content} className={stepClasses(index)} onClick={() => handleStepClick(index)}>
                            {step.text}
                        </li>
                    ))}
                </ul>
            </div>

            {renderStepContent()}

            <div className="buttons">
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
