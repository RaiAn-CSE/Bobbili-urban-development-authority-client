import React, { useContext, useEffect, useState } from "react";
import InputField from "../../../Components/InputField";
import LTPImg from "../../../../assets/images/id-card.png";
import OwnerImg from "../../../../assets/images/real-estate-agent.png";
import OwnerDetail from "./OwnerDetail";
import { useOutletContext } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import SaveData from "./SaveData";

const ApplicantInfo = () => {
  const stepperData = useOutletContext();

  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;

  console.log(stepperData);

  const { confirmAlert, sendUserDataIntoDB, getUserData, getApplicationData } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const handleBackendData = () => {
    const applicationId = JSON.parse(localStorage.getItem("applicationId"));
    getPostData({ applicationId: applicationId, applicantInfo: {} });
  };

  const [ltpPhone, setLtpPhone] = useState("");
  console.log(ltpPhone);
  console.log(getApplicationData);
  console.log(getUserData);


  const [totalApplicant, setTotalApplicant] = useState(["Owner1"]);
  console.log(totalApplicant);

  const increaseApplicantNo = () => {
    const newOwner = `Owner${totalApplicant.length + 1}`;
    setTotalApplicant((prev) => [...prev, newOwner]);
  };

  const setPhoneNoLimit = (e, setPhoneNo) => {
    const value = e.target.value;
    // Check if the Applicant Phone No Input value contains only digits and is not longer than 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNo(value);
    }
  };

  const handleApplicantInfoData = async (url) => {
    // ====================LTP’s Details
    const ltpType = document.getElementById("ltpType").value;
    const ltpName = document.getElementById("ltpName").value;
    const licenseNo = document.getElementById("licenseNo").value;
    const validity = document.getElementById("validity").value;
    const ltpPhoneNo = document.getElementById("ltpPhoneNo").value;
    const ltpEmail = document.getElementById("ltpEmail").value;
    const ltpAddress = document.getElementById("ltpAddress").value;

    const ownerDetail = totalApplicant.map((applicant, index) => {
      console.log(applicant);

      return {
        name: document.getElementById(`applicantName${index}`).value,
        identity: document.getElementById(`soWoCo${index}`).value,
        phone: document.getElementById(`applicantPhoneNo${index}`).value,
        email: document.getElementById(`applicantEmail${index}`).value,
        adharNo: document.getElementById(`applicantAadharNo${index}`).value,
        pinCode: document.getElementById(`applicantPinCode${index}`).value,
        address: document.getElementById(`applicantAddress${index}`).value,
      };
    });

    console.log(ownerDetail);

    const ltpDetails = {
      type: ltpType,
      name: ltpName,
      licenseNo,
      validity,
      phoneNo: ltpPhoneNo,
      email: ltpEmail,
      address: ltpAddress,
    };

    const applicantInfo = {
      ltpDetails,
      applicantDetails: ownerDetail,
    };

    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo,
      applicantInfo,
    });
  };

  // Classes for this component :
  const labelClass = "block text-gray-600 mb-1 font-semibold dark:text-gray-100"
  const inputClass = "w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs dark:text-black"


  return (
    <div className="grid my-5 lg:my-0 lg:p-2 dark:bg-black dark:text-gray-100">
      {/* LTP’s Details  */}
      <div className="divide-y-2 divide-gray-200">
        <div className="flex items-center">
          <img
            src={LTPImg}
            alt="Image icon for the LTP detail section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">LTP’s Details</h3>
        </div>
        {/* Divider  */}
        {/* <div className="divider m-0 "></div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 mb-8">
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
              id="licenseNo"
              name="licenseNo"
              label="Licence no."
              placeholder="xx/xxxxx"
              type="number"
            />

            <div className="my-4 mx-3">
              <label
                htmlFor="ltpPhoneNo"
                className={labelClass}
              >
                Validity
              </label>
              <input
                type="date"
                id="validity"
                name="validity"
                className={inputClass}
              />
            </div>

            <div className="my-4 mx-3">
              <label
                htmlFor="ltpPhoneNo"
                className={labelClass}
              >
                Phone no.
              </label>
              <input
                id="ltpPhoneNo"
                type="text"
                name="ltpPhoneNo"
                placeholder="xxxxxxxxxx"
                value={ltpPhone}
                onChange={(e) => setPhoneNoLimit(e, setLtpPhone)}
                className={inputClass}
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
                className={labelClass}
              >
                Address
              </label>
              <textarea
                id="ltpAddress"
                name="ltpAddress"
                rows="4"
                className={inputClass}
                placeholder="Dr. no., Street, Village, Mandal, Dist."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant’s Details  */}
      <div className="divide-y-2 divide-gray-200">
        <div className="flex items-center">
          <img
            src={OwnerImg}
            alt="An icon of the applicant section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Applicant’s Details</h3>
        </div>
        {/* <div className="divider m-0"></div> */}

        <div className="mt-2">
          {totalApplicant?.map((applicantNo, index) => (
            <OwnerDetail
              key={index}
              index={index}
              length={totalApplicant.length}
              applicantNo={applicantNo}
              increaseApplicantNo={increaseApplicantNo}
              setPhoneNoLimit={setPhoneNoLimit}
            />
          ))}
        </div>
      </div>

      {/* save & continue  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={handleApplicantInfoData}
      />
    </div>
  );
};

export default ApplicantInfo;
