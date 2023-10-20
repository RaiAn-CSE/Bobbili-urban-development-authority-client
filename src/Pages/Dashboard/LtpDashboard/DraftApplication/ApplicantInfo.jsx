import React, { useContext, useEffect, useRef, useState } from "react";
import InputField from "../../../Components/InputField";
import LTPImg from "../../../../assets/images/id-card.png";
import OwnerImg from "../../../../assets/images/real-estate-agent.png";
import OwnerDetail from "./OwnerDetail";
import { useOutletContext } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import SaveData from "./SaveData";
import useGetUser from "../../../CustomHook/useGetUser";

const ApplicantInfo = () => {
  const stepperData = useOutletContext();

  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;

  // console.log(stepperData);

  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const { confirmAlert, sendUserDataIntoDB, getApplicationData } =
    useContext(AuthContext);

  const role = userInfoFromLocalStorage().role;

  const [data] = useGetUser();
  console.log(data, "LTP"); //(LTP DATA)

  const isReadOnly = role === "PS";

  const isReadOnlyForAll = 1;

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const cameFrom = JSON.parse(localStorage.getItem("page"));

  const [ltpDetails, setLtpDetails] = useState("");
  const [applicantDetails, setApplicantDetails] = useState("");

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
  const decreaseApplicationNo = () => {
    // const newOwner = `Owner${totalApplicant.length + 1}`;
    console.log("AOBC");

    totalApplicant.pop();

    console.log(totalApplicant, "TOTAL APPLICANT");
    setTotalApplicant([...totalApplicant]);
  };

  // useEffect(() => {
  //   console.log(totalApplicant);
  // }, [totalApplicant]);

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
    const ltpAddress = document.getElementById("ltpAddress").value;
    // const ltpDoorNo = document.getElementById("ltpDoorNo").value;
    // const ltpStreetName = document.getElementById("ltpStreetName").value;

    const ownerDetail = totalApplicant.map((applicant, index) => {
      return {
        name: document.getElementById(`applicantName${index}`).value,
        identity: document.getElementById(`soWoCo${index}`).value,
        phone: document.getElementById(`applicantPhoneNo${index}`).value,
        email: document.getElementById(`applicantEmail${index}`).value,
        adharNo: document.getElementById(`applicantAadharNo${index}`).value,
        pinCode: document.getElementById(`applicantPinCode${index}`).value,
        // address: document.getElementById(`applicantAddress${index}`).value,
        ownerDoorNo: document.getElementById(`ownerDoorNo${index}`).value,
        ownerStreetNo: document.getElementById(`ownerStreetNo${index}`).value,
      };
    });

    const ltpDetails = {
      type: ltpType,
      name: ltpName,
      licenseNo,
      validity,
      phoneNo: ltpPhoneNo,
      email: ltpEmail,
      address: ltpAddress,
      // ltpDoorNo,
      // ltpStreetName,
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

  const [isDataGet, setIsDataGet] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const applicationData = await getApplicationData(applicationNo, cameFrom);
      const ltpDetailsData = applicationData.applicantInfo.ltpDetails;
      const applicantDetailsData =
        applicationData.applicantInfo.applicantDetails;
      setLtpDetails(ltpDetailsData);
      setApplicantDetails(applicantDetailsData);
      setLtpPhone(ltpDetailsData?.phoneNo);
      setIsDataGet((prev) => prev + 1);
    };
    getData();
  }, []);

  useEffect(() => {
    if (role === "LTP" && isDataGet) {
      setLtpDetails(data);
    }
  }, [isDataGet]);

  const {
    type,
    name,
    email,
    licenseNo,
    phone,
    validity,
    address,
  } = ltpDetails || {};

  console.log(ltpDetails, "LTP Details");

  // Classes for this component :
  let labelClass = "block mb-1 font-semibold text-gray-600";
  const inputClass =
    "w-full px-3 py-2 border rounded-lg max-w-xs text-gray-600 bg-gray-50 border-violet-600 focus:outline-none focus:ring-2 ring-violet-100";

  return (
    <div className="grid my-5 mx-5 lg:my-0 lg:p-2 text-gray-900">
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

        <div className="lg:flex mt-2">
          <div className="grid grid-cols-2 lg:grid-cols-3 basis-[75%]">
            <InputField
              id="ltpType"
              name="ltpType"
              label="LTP Type"
              placeholder="Licensed Engineer"
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
              id="licenseNo"
              name="licenseNo"
              label="Licence no."
              placeholder="xx/xxxxx"
              type="text"
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
                disabled={isReadOnly}
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
                defaultValue={phone}
                onChange={(e) => setPhoneNoLimit(e, setLtpPhone)}
                className={inputClass}
                maxLength={10}
                readOnly={isReadOnly}
              />
            </div>

            <InputField
              id="ltpEmail"
              name="ltpEmail"
              label="E-mail"
              placeholder="xxxx@gmail.com"
              type="email"
              ltpDetails={email}
              readOnly={isReadOnly}
            />
          </div>
          <div className="my-4 mx-3 basis-[25%]">
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
              disabled={isReadOnly}
            ></textarea>
          </div>
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
              labelClass={labelClass}
              inputClass={inputClass}
              length={totalApplicant.length}
              applicantNo={applicantNo}
              increaseApplicantNo={increaseApplicantNo}
              decreaseApplicationNo={decreaseApplicationNo}
              setPhoneNoLimit={setPhoneNoLimit}
              applicantDetails={applicantDetails[index]}
              isReadOnly={isReadOnly}
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
