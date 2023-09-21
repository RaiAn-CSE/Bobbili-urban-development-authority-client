import React, { useState } from "react";
import InputField from "../../../Components/InputField";

const OwnerDetail = ({ index, length, applicantNo, setPhoneNoLimit, increaseApplicantNo }) => {
  console.log(applicantNo, index);

  const ownerSerial = ["First", "Second", "Third", "Fourth", "Fifth"];

  const [applicantPhone, setApplicantPhone] = useState("");

  return (
    <>
      <p className="text-xl font-bold my-3">{`${ownerSerial[index]} Owner Details`}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-8">
        <div className="grid grid-cols-2 items-center">
          <InputField
            id={`applicantName${index}`}
            name={`applicantName${index}`}
            label="Name"
            placeholder="Applicant Name"
          />
          <InputField
            id={`soWoCo${index}`}
            name={`soWoCo${index}`}
            label="S/o (or) W/o (or) C/o"
            placeholder="S/o (or) W/o (or) C/o"
          />

          <div className="my-4 mx-3">
            <label
              htmlFor="ltpPhoneNo"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Phone no.
            </label>
            <input
              id={`applicantPhoneNo${index}`}
              name={`applicantPhoneNo${index}`}
              placeholder="xxxxxxxxxx"
              value={applicantPhone}
              onChange={(e) => setPhoneNoLimit(e, setApplicantPhone)}
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
            />
          </div>

          <InputField
            id={`applicantEmail${index}`}
            name={`applicantEmail${index}`}
            label="E-mail"
            placeholder="E-mail"
            type="email"
          />
          <InputField
            id={`applicantAadharNo${index}`}
            name={`applicantAadharNo${index}`}
            label="Aadhar no."
            placeholder="Aadhar no."
            type="number"
          />
          <InputField
            id={`applicantPinCode${index}`}
            name={`applicantPinCode${index}`}
            label="PIN Code"
            placeholder="PIN Code"
            type="number"
          />
        </div>
        <div className="flex">
          <div className="my-4 mx-3 basis-3/4">
            <label
              htmlFor="message"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Address
            </label>
            <textarea
              id={`applicantAddress${index}`}
              rows="4"
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
              placeholder="Dr. no., Street, Village, Mandal, Dist."
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
    </>
  );
};

export default OwnerDetail;
