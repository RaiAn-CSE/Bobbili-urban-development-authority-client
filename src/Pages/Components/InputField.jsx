import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const InputField = ({ id, name, placeholder, type, label, ltpDetails }) => {
  // Define default values for type and placeholder if not provided
  const inputType = type || "text";

  const { userInfoFromLocalStorage } = useContext(AuthContext);

  const role = userInfoFromLocalStorage().role;

  // Define the gradient border style
  const gradientBorderStyle = {
    borderImage: "linear-gradient(90deg, red, yellow)",
    borderImageSlice: "1",
  };

  const isReadOnly = role === 'PS';

  return (
    <div className="my-4 mx-3 flex flex-col justify-between">
      <label
        htmlFor={id}
        className="block mb-1 font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text"
      >
        {label}
      </label>
      <input
        type={inputType} // Use the inputType variable as the type attribute
        id={id}
        name={name}
        placeholder={placeholder} // Use the labelPlaceholder variable as the placeholder attribute
        defaultValue={ltpDetails}
        className="w-full px-3 py-2 border rounded-lg max-w-xs border-violet-300 text-violet-900 bg-gray-100 focus:border-violet-400 focus:outline-none focus:ring-2 ring-violet-200"
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default InputField;
