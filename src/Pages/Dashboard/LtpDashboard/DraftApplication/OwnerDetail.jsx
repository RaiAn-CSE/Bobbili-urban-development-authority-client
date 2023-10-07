import React, { useState } from "react";
import InputField from "../../../Components/InputField";

const OwnerDetail = ({
  index,
  length,
  applicantNo,
  setPhoneNoLimit,
  increaseApplicantNo,
  applicantDetails,
}) => {
  const ownerSerial = ["First", "Second", "Third", "Fourth", "Fifth"];

  const handleInputPhone = (e) => {
    // Remove non-numeric characters
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    // Limit the input to 10 characters
    const truncatedValue = inputValue.slice(0, 10);
    // Update the input field with the sanitized value
    e.target.value = truncatedValue;
  };


  return (
    <div>
      <p className="text-xl font-bold mt-5">{`${ownerSerial[index]} Owner Details :`}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="grid grid-cols-2 items-center">
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

          <div className="my-4 mx-3">
            <label
              htmlFor="ltpPhoneNo"
              className="block text-gray-600 mb-1 font-semibold dark:text-gray-100"
            >
              Phone no.
            </label>
            <input
              id={`applicantPhoneNo${index}`}
              name={`applicantPhoneNo${index}`}
              type="text"
              placeholder="xxxxxxxxxx"
              defaultValue={applicantDetails?.phone}
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs dark:text-black"
              maxLength={10}
              onInput={handleInputPhone}
              required
            />
          </div>

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

        <div className="flex">
          <div className="my-4 mx-3 basis-3/4">
            <label
              htmlFor="message"
              className="block text-gray-600 mb-1 font-semibold dark:text-gray-100"
            >
              Address
            </label>
            <textarea
              id={`applicantAddress${index}`}
              rows="4"
              defaultValue={applicantDetails?.address}
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs dark:text-black"
              placeholder="Dr. no., Street, Village, Mandal, Dist."
              required
            ></textarea>
          </div>

          {index === length - 1 && index < 4 && (
            <div className="flex justify-center items-center">
              <button
                className="text-xl rounded-full w-[30px] h-[30px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white cursor-pointer shadow-lg shadow-violetDark transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold"
                onClick={increaseApplicantNo}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetail;
