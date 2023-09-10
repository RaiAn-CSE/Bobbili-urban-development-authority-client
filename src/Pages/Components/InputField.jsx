import React from "react";

const InputField = ({ id, name, placeholder, type, label }) => {
  // Define default values for type and placeholder if not provided
  const inputType = type || "text";

  return (
    <div className="my-4 mx-3">
      <label htmlFor={id} className="block text-gray-600 mb-1 font-semibold">
        {label}
      </label>
      <input
        type={inputType} // Use the inputType variable as the type attribute
        id={id}
        name={name}
        placeholder={placeholder} // Use the labelPlaceholder variable as the placeholder attribute
        className="w-full px-3 py-2 border rounded-lg max-w-xs"
      />
    </div>
  );
};

export default InputField;
