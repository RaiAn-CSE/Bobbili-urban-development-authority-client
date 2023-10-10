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

  // console.log(stepperData);

  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  // const handleBackendData = () => {
  //   const applicationId = JSON.parse(localStorage.getItem("applicationId"));
  //   getPostData({ applicationId: applicationId, applicantInfo: {} });
  // };

  const [ltpPhone, setLtpPhone] = useState("");

  const [totalApplicant, setTotalApplicant] = useState(["Owner1"]);

  const increaseApplicantNo = () => {
    const newOwner = `Owner${totalApplicant.length + 1}`;
    setTotalApplicant((prev) => [...prev, newOwner]);
  };

  const setPhoneNoLimit = (e, setPhoneNo) => {
    const value = e.target.value;
    console.log(value, "value");
    // Check if the Applicant Phone No Input value contains only digits and is not longer than 10 characters

    console.log(/^\d*$/.test(value));
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNo(value);
    } else {
      e.target.value = ltpPhone;
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
    // const ltpAddress = document.getElementById("ltpAddress").value;
    const ltpDoorNo = document.getElementById("ltpDoorNo").value;
    const ltpStreetName = document.getElementById("ltpStreetName").value;

    const ownerDetail = totalApplicant.map((applicant, index) => {
      return {
        name: document.getElementById(`applicantName${index}`).value,
        identity: document.getElementById(`soWoCo${index}`).value,
        phone: document.getElementById(`applicantPhoneNo${index}`).value,
        email: document.getElementById(`applicantEmail${index}`).value,
        adharNo: document.getElementById(`applicantAadharNo${index}`).value,
        pinCode: document.getElementById(`applicantPinCode${index}`).value,
        ownerDoorNo: document.getElementById(`ownerDoorNo${index}`).value,
        ownerStreetNo: document.getElementById(`ownerStreetNo${index}`).value,
        // address: document.getElementById(`applicantAddress${index}`).value,
      };
    });

    const ltpDetails = {
      type: ltpType,
      name: ltpName,
      licenseNo,
      validity,
      phoneNo: ltpPhoneNo,
      email: ltpEmail,
      // address: ltpAddress,
      ltpDoorNo,
      ltpStreetName,
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

  const [ltpDetails, setLtpDetails] = useState("");
  const [applicantDetails, setApplicantDetails] = useState("");

  // console.log(ltpDetails, 'ltpDetails');
  // console.log(applicantDetails, 'applicantDetails');

  const { type, name, ltpDoorNo, ltpStreetName, email, licenseNo, phoneNo, validity } =
    ltpDetails;
  // const { identity, adharNo, pinCode, } = applicantDetails;

  useEffect(() => {
    const getData = async () => {
      const applicationData = await getApplicationData(applicationNo);
      const ltpDetailsData = applicationData.applicantInfo.ltpDetails;
      const applicantDetailsData = applicationData.applicantInfo.applicantDetails;
      setLtpDetails(ltpDetailsData);
      setApplicantDetails(applicantDetailsData);
      setLtpPhone(ltpDetailsData?.phoneNo);
    };
    getData();
  }, []);

  // Classes for this component :
  const labelClass =
    "block text-gray-600 mb-1 font-semibold dark:text-gray-100";
  const inputClass =
    "w-full px-3 py-2 border border-violet-500 rounded-lg max-w-xs dark:text-black focus:border-violetLight focus:outline-none focus:ring-2 ring-violet-200";

  return (
    <div className="grid my-5 mx-5 lg:my-0 lg:p-2 dark:text-gray-100">
      {/* LTP’s Details  */}
      <div className="divide-y-2 divide-gray-200 mb-[60px]">
        <div className="flex items-center">
          <img
            src={LTPImg}
            alt="Image icon for the LTP detail section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">LTP’s Details</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-2">
          <InputField
            id="ltpType"
            name="ltpType"
            label="LTP Type"
            placeholder="Licenced Engineer"
            ltpDetails={type}
          />
          <InputField
            id="ltpName"
            name="ltpName"
            label="LTP Name"
            placeholder="xxxxxxxxxxxxxxxxx"
            ltpDetails={name}
          />
          <InputField
            id="ltpDoorNo"
            name="ltpDoorNo"
            label="Door no"
            placeholder="Door no"
            type="text"
            ltpDetails={ltpDoorNo}
          />
          <InputField
            id="ltpStreetName"
            name="ltpStreetName"
            label="Street name"
            placeholder="Street name"
            type="text"
            ltpDetails={ltpStreetName}
          />
          <InputField
            id="licenseNo"
            name="licenseNo"
            label="Licence no."
            placeholder="xx/xxxxx"
            type="number"
            ltpDetails={licenseNo}
          />

          <div className="my-4 mx-3">
            <label htmlFor="validity" className={labelClass}>
              Validity
            </label>
            <input
              type="date"
              id="validity"
              name="validity"
              className={inputClass}
              defaultValue={validity}
            />
          </div>

          <div className="my-4 mx-3">
            <label htmlFor="ltpPhoneNo" className={labelClass}>
              Phone no.
            </label>
            <input
              id="ltpPhoneNo"
              type="text"
              name="ltpPhoneNo"
              placeholder="xxxxxxxxxx"
              defaultValue={ltpPhone}
              onChange={(e) => setPhoneNoLimit(e, setLtpPhone)}
              className={inputClass}
              maxLength={10}
            />
          </div>

          <InputField
            id="ltpEmail"
            name="ltpEmail"
            label="E-mail"
            placeholder="xxxx@gmail.com"
            type="email"
            ltpDetails={email}
          />
          {/* <div>
            <div className="my-4 mx-3">
              <label htmlFor="ltpAddress" className={labelClass}>
                Address
              </label>
              <textarea
                id="ltpAddress"
                name="ltpAddress"
                rows="4"
                className={inputClass}
                defaultValue={address}
                placeholder="Dr. no., Street, Village, Mandal, Dist."
              ></textarea>
            </div>
          </div> */}
        </div>
      </div>

      {/* Owner’s Details  */}
      <div className="divide-y-2 divide-gray-200">
        <div className="flex items-center">
          <img
            src={OwnerImg}
            alt="An icon of the applicant section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Owner’s Details</h3>
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
              applicantDetails={applicantDetails[index]}
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
