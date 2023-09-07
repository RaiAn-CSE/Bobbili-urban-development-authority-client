import React from 'react';

const InputField = ({ id, name, placeholder }) => {
    return (
        <div className="m-4">
            <label htmlFor={id} className="block text-sm font-sm text-gray-600">
                {placeholder}
            </label>
            <input
                type="text" id={id} name={name} placeholder={placeholder} className="w-[180px] px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

export default InputField;
