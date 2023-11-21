import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const InputField = ({
  id,
  name,
  placeholder,
  type,
  label,
  ltpDetails,
  isAlwaysHide,
}) => {
  // Define default values for type and placeholder if not provided
  const inputType = type || "text";

  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const role = userInfoFromLocalStorage().role;
  const page = JSON.parse(localStorage.getItem("page"));
  const isReadOnly =
    role === "PS" ||
    isAlwaysHide ||
    page === "submit" ||
    page === "approved" ||
    page === "shortfall";

  // console.log(ltpDetails, "LTP details", id);

  return (
    <motion.div
      className="my-4 mx-3 flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      viewport={{ once: false }}
    >
      <label htmlFor={id} className="block mb-1 font-semibold text-gray-600">
        {label}
      </label>
      <input
        type={inputType} // Use the inputType variable as the type attribute
        id={id}
        name={name}
        placeholder={placeholder} // Use the labelPlaceholder variable as the placeholder attribute
        defaultValue={ltpDetails}
        className="w-full px-3 py-2 border rounded-lg max-w-xs text-gray-600 bg-gray-50 border-gray-400 focus:border-gray-600 focus:outline-none focus:ring-2 ring-violet-200"
        readOnly={isReadOnly}
      />
    </motion.div>
  );
};

export default InputField;
