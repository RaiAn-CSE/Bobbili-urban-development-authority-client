import React from "react";

const InputField = ({ id, name, placeholder, type, label, ltpDetails }) => {
  // Define default values for type and placeholder if not provided
  const inputType = type || "text";

  // Define the gradient border style
  const gradientBorderStyle = {
    borderImage: "linear-gradient(90deg, red, yellow)",
    borderImageSlice: "1",
  };

  return (
    <div className="my-4 mx-3 flex flex-col justify-between">
      <label
        htmlFor={id}
        className="block mb-1 font-semibold text-gray-600"
      >
        {label}
      </label>
      <input
        type={inputType} // Use the inputType variable as the type attribute
        id={id}
        name={name}
        placeholder={placeholder} // Use the labelPlaceholder variable as the placeholder attribute
        defaultValue={ltpDetails}
        className="w-full px-3 py-2 border rounded-lg max-w-xs border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200"
      />
    </div>
  );
};

export default InputField;
