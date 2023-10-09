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
    <div className="my-4 mx-3">
      <label
        htmlFor={id}
        className="block text-gray-600 dark:text-gray-100 mb-1 font-semibold"
      >
        {label}
      </label>
      <input
        type={inputType} // Use the inputType variable as the type attribute
        id={id}
        name={name}
        placeholder={placeholder} // Use the labelPlaceholder variable as the placeholder attribute
        defaultValue={ltpDetails}
        className="w-full px-3 py-2 border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200"
      />
    </div>
  );
};

export default InputField;
