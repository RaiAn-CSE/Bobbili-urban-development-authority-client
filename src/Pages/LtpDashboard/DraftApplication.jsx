import React from 'react';
import { Link } from 'react-router-dom';

const DraftApplication = () => {
    return (
        <ul className="steps">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Choose plan</li>
            <li className="step step-primary">Purchase</li>
            <li className="step">Receive Product</li>
        </ul>
    );
};

export default DraftApplication;