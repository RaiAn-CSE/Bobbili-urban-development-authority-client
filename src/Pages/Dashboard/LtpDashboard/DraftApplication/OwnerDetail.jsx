import React, { useState } from "react";
import InputField from "../../../Components/InputField";
import { motion } from "framer-motion";

const OwnerDetail = ({
  index,
  length,
  labelClass,
  inputClass,
  applicantNo,
  setPhoneNoLimit,
  increaseApplicantNo,
  decreaseApplicationNo,
  applicantDetails,
  isReadOnly,
}) => {
  const ownerSerial = ["First", "Second", "Third", "Fourth", "Fifth"];

  const { role } = JSON.parse(localStorage.getItem("loggedUser"));

  const handleInputPhone = (e) => {
    // Remove non-numeric characters
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    // Limit the input to 10 characters
    const truncatedValue = inputValue.slice(0, 10);
    // Update the input field with the sanitized value
    e.target.value = truncatedValue;
  };

  console.log(applicantDetails, "applicantDetails");
  const page = JSON.parse(localStorage.getItem("page"));
  const hideBtn =
    page === "submit" ||
    page === "approved" ||
    page === "shortfall" ||
    role.toLowerCase() === "ps";

  return (
    <div className="mt-3">
      <p className="text-xl font-bold px-2">{`${ownerSerial[index]} Person:`}</p>
      <div className="lg:flex">
        <div className="basis-[75%] grid grid-cols-2 lg:grid-cols-3">
          <InputField
            id={`applicantName${index}`}
            name={`applicantName${index}`}
            label="Name"
            placeholder="Applicant Name"
            ltpDetails={applicantDetails?.name}
          />
          <InputField
            id={`soWoCo${index}`}
            name={`soWoCo${index}`}
            label="S/o (or) W/o (or) C/o"
            placeholder="S/o (or) W/o (or) C/o"
            ltpDetails={applicantDetails?.identity}
          />

          <InputField
            id={`ownerDoorNo${index}`}
            name={`ownerDoorNo${index}`}
            label="Door no"
            placeholder="Door no"
            type="text"
            ltpDetails={applicantDetails?.ownerDoorNo}
          />
          <InputField
            id={`ownerStreetNo${index}`}
            name={`ownerStreetNo${index}`}
            label="Street name"
            placeholder="Street name"
            type="text"
            ltpDetails={applicantDetails?.ownerStreetNo}
          />

          <motion.div className="my-4 mx-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1, } }}
            viewport={{ once: false }}
          >
            <label htmlFor="ltpPhoneNo" className={labelClass}>
              Phone no.
            </label>
            <input
              id={`applicantPhoneNo${index}`}
              name={`applicantPhoneNo${index}`}
              type="text"
              placeholder="xxxxxxxxxx"
              defaultValue={applicantDetails?.phone}
              className={inputClass}
              maxLength={10}
              onInput={handleInputPhone}
              disabled={isReadOnly}
            />
          </motion.div>

          <InputField
            id={`applicantEmail${index}`}
            name={`applicantEmail${index}`}
            label="E-mail"
            placeholder="E-mail"
            type="email"
            ltpDetails={applicantDetails?.email}
          />
          <InputField
            id={`applicantAadharNo${index}`}
            name={`applicantAadharNo${index}`}
            label="Aadhar no."
            placeholder="Aadhar no."
            type="number"
            ltpDetails={applicantDetails?.adharNo}
          />
          <InputField
            id={`applicantPinCode${index}`}
            name={`applicantPinCode${index}`}
            label="PIN Code"
            placeholder="PIN Code"
            type="number"
            ltpDetails={applicantDetails?.pinCode}
          />
        </div>

        {role.toLowerCase() === "ltp" && (
          <div className="flex basis-[25%] justify-center my-5 lg:my-5">

            {index === length - 1 && index < 4 && (
              <motion.div className="flex justify-center items-center"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 2, } }}
                viewport={{ once: false }}
              >
                <button
                  className={`nm_Container text-xl rounded-full w-[30px] h-[30px] text-normalViolet cursor-pointer transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold ${hideBtn && "hidden"
                    }`}
                  onClick={increaseApplicantNo}
                >
                  +
                </button>
              </motion.div>
            )}

            {index === length - 1 && index > 0 && index <= 4 && (
              <motion.div className="flex justify-center items-center"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 2, } }}
                viewport={{ once: false }}
              >
                <button
                  className={`nm_Container text-xl mx-2 rounded-full text-red-500 w-[30px] h-[30px]  transition-all duration-500 font-bold ${hideBtn && "hidden"
                    }`}
                  onClick={decreaseApplicationNo}
                >
                  -
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDetail;
