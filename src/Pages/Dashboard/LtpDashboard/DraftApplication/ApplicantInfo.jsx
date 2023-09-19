import React, { useState } from "react";
import InputField from "../../../Components/InputField";
import LTPImg from "../../../../assets/images/id-card.png";
import OwnerImg from "../../../../assets/images/real-estate-agent.png";

const ApplicantInfo = () => {
  const [ltpPhone, setLtpPhone] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');

  const handleLtpPhone = (e) => {
    const value = e.target.value;
    // Check if the LTP Phone No Input value contains only digits and is not longer than 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setLtpPhone(value);
    }
  };

  const handleApplicantPhone = (e) => {
    const value = e.target.value;
    // Check if the Applicant Phone No Input value contains only digits and is not longer than 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setApplicantPhone(value);
    }
  };

  const handleApplicantInfoData = () => {
    // ====================LTP’s Details 
    const ltpType = document.getElementById('ltpType').value;
    const ltpName = document.getElementById('ltpName').value;
    const licenceNo = document.getElementById('licenceNo').value;
    const validity = document.getElementById('validity').value;
    const ltpPhoneNo = document.getElementById('ltpPhoneNo').value;
    const ltpEmail = document.getElementById('ltpEmail').value;
    const ltpAddress = document.getElementById('ltpAddress').value;
    // ===================Applicant’s Details
    const applicantName = document.getElementById('applicantName').value;
    const soWoCo = document.getElementById('soWoCo').value;
    const applicantPhoneNo = document.getElementById('applicantPhoneNo').value;
    const applicantEmail = document.getElementById('applicantEmail').value;
    const applicantAadharNo = document.getElementById('applicantAadharNo').value;
    const applicantPinCode = document.getElementById('applicantPinCode').value;
    const applicantAddress = document.getElementById('applicantAddress').value;

    const applicantInfoData = {
      ltpType,
      ltpName,
      licenceNo,
      validity,
      ltpPhoneNo,
      ltpEmail,
      ltpAddress,
      // ==================Applicant’s Details
      applicantName,
      soWoCo,
      applicantPhoneNo,
      applicantEmail,
      applicantAadharNo,
      applicantPinCode,
      applicantAddress,
    }
    console.log(applicantInfoData);
  }

  return (
    <div className="grid my-5 lg:my-0 lg:p-2">

      {/* LTP’s Details  */}
      <div>
        <div className="flex items-center">
          <img
            src={LTPImg}
            alt="Image icon for the LTP detail section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">LTP’s Details</h3>
        </div>
        {/* Divider  */}
        <div className="divider m-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 my-8">
          <div className="grid grid-cols-2">
            <InputField
              id="ltpType"
              name="ltpType"
              label="LTP Type"
              placeholder="Licenced Engineer"
            />
            <InputField
              id="ltpName"
              name="ltpName"
              label="LTP Name"
              placeholder="xxxxxxxxxxxxxxxxx"
            />
            <InputField
              id="licenceNo"
              name="licenceNo"
              label="Licence no."
              placeholder="xx/xxxxx"
              type="number"
            />

            <div className="my-4 mx-3">
              <label htmlFor='ltpPhoneNo' className="block text-gray-600 mb-1 font-semibold">
                Validity
              </label>
              <input
                id="validity"
                name="validity"
                placeholder="xxxxxxxxxx"
                type="date"
                className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
              />
            </div>

            <div className="my-4 mx-3">
              <label htmlFor='ltpPhoneNo' className="block text-gray-600 mb-1 font-semibold">
                Phone no.
              </label>
              <input
                id="ltpPhoneNo"
                name="ltpPhoneNo"
                placeholder="xxxxxxxxxx"
                value={ltpPhone}
                onChange={handleLtpPhone}
                className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
              />
            </div>

            <InputField
              id="ltpEmail"
              name="ltpEmail"
              label="E-mail"
              placeholder="xxxx@gmail.com"
              type="email"
            />
          </div>
          <div>
            <div className="my-4 mx-3">
              <label
                htmlFor="message"
                className="block text-gray-600 mb-1 font-semibold"
              >
                Address
              </label>
              <textarea
                id="ltpAddress"
                name="ltpAddress"
                rows="4"
                className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
                placeholder="Dr. no., Street, Village, Mandal, Dist."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant’s Details  */}
      <div className="my-5">
        <div className="flex items-center">
          <img
            src={OwnerImg}
            alt="An icon of the applicant section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Applicant’s Details</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8">
          <div className="grid grid-cols-2 items-center">
            <InputField
              id="applicantName"
              name="applicantName"
              label="Name"
              placeholder="Select Case type"
            />
            <InputField
              id="soWoCo"
              name="soWoCo"
              label="S/o (or) W/o (or) C/o"
              placeholder="Select Nature of permission"
            />

            <div className="my-4 mx-3">
              <label htmlFor='ltpPhoneNo' className="block text-gray-600 mb-1 font-semibold">
                Phone no.
              </label>
              <input
                id="applicantPhoneNo"
                name="applicantPhoneNo"
                placeholder="xxxxxxxxxx"
                value={applicantPhone}
                onChange={handleApplicantPhone}
                className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
              />
            </div>

            <InputField
              id="applicantEmail"
              name="applicantEmail"
              label="E-mail"
              placeholder="E-mail"
              type="email"
            />
            <InputField
              id="applicantAadharNo"
              name="applicantAadharNo"
              label="Aadhar no."
              placeholder="Aadhar no."
              type="number"
            />
            <InputField
              id="applicantPinCode"
              name="applicantPinCode"
              label="PIN Code"
              placeholder="PIN Code"
              type="number"
            />
          </div>
          <div className="my-4 mx-3">
            <label
              htmlFor="message"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Address
            </label>
            <textarea
              id="applicantAddress"
              rows="4"
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
              placeholder="Dr. no., Street, Village, Mandal, Dist."
            ></textarea>
          </div>
        </div>
      </div>

      <button type="submit" className="btn" onClick={handleApplicantInfoData}>Get Data</button>

    </div>
  );
};

export default ApplicantInfo;
