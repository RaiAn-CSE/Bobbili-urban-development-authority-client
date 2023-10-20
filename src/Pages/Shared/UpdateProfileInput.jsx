import React from 'react';

const UpdateProfileInput = ({ id, name, placeholder, type, label, register }) => {
    // Define default values for type and placeholder if not provided
    const inputType = type || "text";

    return (
        <div className="my-4 mx-3 flex flex-col justify-between">
            <label
                htmlFor={id}
                className="block mb-1 font-semibold text-gray-600"
            >
                {label}
            </label>
            <input
                type={inputType}
                id={id}
                name={name}
                placeholder={placeholder}
                {...register(id, { required: true })}
                className="w-full px-3 py-2 border rounded-lg max-w-xs text-gray-600 bg-gray-50 border-violet-500 focus:outline-none focus:ring-2 ring-violet-100"
            />
        </div>
    );
};

export default UpdateProfileInput;