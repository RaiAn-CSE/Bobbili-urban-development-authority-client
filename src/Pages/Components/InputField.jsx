import React from 'react';

const InputField = ({ id, name, placeholder, type, label }) => {
    // Define default values for type and placeholder if not provided
    const inputType = type || 'text';

    return (
        <div className="m-4">
            <label htmlFor={id} className="block text-sm font-sm text-gray-600">
                {label}
            </label>
            <input
                type={inputType} // Use the inputType variable as the type attribute
                id={id}
                name={name}
                placeholder={placeholder} // Use the labelPlaceholder variable as the placeholder attribute
                className="w-[180px] px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

export default InputField;
