import React from 'react';

const SelectorInput = ({ id, label, options, selectedOption, onChange }) => {
    return (
        <div className="m-3">
            <label htmlFor={id} className="block text-sm font-semibold text-gray-600 mb-1">
                {label}
            </label>
            <select
                id={id}
                value={selectedOption}
                onChange={onChange}
                className="w-[180px] px-4 py-2 border rounded-lg"
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectorInput;
