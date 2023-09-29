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

  // const [applicantPhone, setApplicantPhone] = useState("");

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
              // onChange={(e) => setPhoneNoLimit(e, setApplicantPhone)}
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs dark:text-black"
              maxLength={10}
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
                className="text-xl bg-orange-400 rounded-full w-[30px] h-[30px]"
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
