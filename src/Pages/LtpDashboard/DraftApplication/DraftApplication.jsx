import React, { useState } from 'react';
import Table from '../Components/Table';

const DraftApplication = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { content: "?", text: "Step 1" },
        { content: "!", text: "Step 2" },
        { content: "✓", text: "Step 3" },
        { content: "✕", text: "Step 4" },
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
                        <h2>Step 1: Register</h2>
                        <>
                            <Table />
                        </>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h2>Step 2: Choose plan</h2>
                        <>
                            <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat odio sed molestiae consequuntur odit ex reiciendis, voluptate mollitia voluptas rem.</h1>
                        </>
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
