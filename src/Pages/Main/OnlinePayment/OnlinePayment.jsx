import React, { useContext, useEffect, useState } from "react";
import MainPageInput from "../MainPageInput";
import { GiMoneyStack } from "react-icons/gi";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const OnlinePayment = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const { getAllDraftApplicationData } = useContext(AuthContext);

  useEffect(() => {
    getAllDraftApplicationData().then((data) => {
      console.log(data);
      setApplicationData(data);
    });
  }, []);

  //   console.log(applicationData, "APPLICATION DATA");
  const searchApplicationData = (e) => {
    const value = e.target.value;

    console.log(value, "FILTER DATA");

    if (value.includes("BUDA/2023")) {
      //  search by application No
      setFilteredData(
        applicationData.find((data) => data.applicationNo === value)
      );
    } else {
      console.log("Asci");

      setFilteredData(
        applicationData.find(
          (data) =>
            data?.applicantInfo?.applicantDetails[0]?.name.toLowerCase() ===
            value.toLowerCase()
        )
      );

      console.log(
        applicationData.find(
          (data) => data?.applicantInfo?.applicantDetails[0]?.name === value
        )
      );
    }
  };

  console.log(filteredData, "FILTERED DATA");
  return (
    <div className="h-full font-lg w-full px-4 font-roboto">
      <form>
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-violet-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-base font-normal text-gray-900 border-2 border-violet-500 focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-200 rounded-lg bg-gray-50"
            placeholder="Application no. or owner name"
            onChange={(e) => searchApplicationData(e)}
            required
          />
        </div>
      </form>

      {/* Application details  */}
      <div className="divide-y-2 divide-gray-200 mt-9">
        <div className="mb-1">
          <h3 className="basis-[50%] text-lg px-5 font-semibold text-gray-900">
            Application details
          </h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="File no :"
              id="fileNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicationNo}
            />
            <MainPageInput
              label="Owner name :"
              id="applicantName"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicantInfo?.applicantDetails?.[0].name}
            />
            <MainPageInput
              label="Mandal :"
              id="mandal2"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.mandal}
            />
          </div>

          <div className="basis-[50%]">
            <MainPageInput
              label="Case Type :"
              id="caseType"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.caseType}
            />
            <MainPageInput
              label="Village name :"
              id="villageName"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.village}
            />
            <MainPageInput
              label="District :"
              id="district2"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.district}
            />
          </div>
        </div>
      </div>

      {/* Fees details  */}
      <div className="divide-y-2 divide-gray-200 mt-9">
        <div className="flex mb-1">
          <h3 className="basis-[50%] text-lg px-5 font-semibold text-gray-900">Fees details</h3>
        </div>
        <div className="flex">
          <div className="basis-[70%]">
            <MainPageInput
              label="UDA charges :"
              id="udaCharges"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.udaCharge?.UDATotalCharged}
            />
            <MainPageInput
              label="Grama Panchayat fee :"
              id="gramaPanchayatFee"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.gramaPanchayatFee?.GramaPanchayetTotalCharged}
            />
            <MainPageInput
              label="Labour cess charge :"
              id="labourCessCharge"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.labourCessCharge?.labourCessOne}
            />
            <MainPageInput
              label="Green fee charge :"
              id="labourCessCharge"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.greenFeeCharge?.greenFee}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5 text-gray-600">
        <h3 className="text-base font-semibold">
          For UDA charge you can pay only Rs. {
            (filteredData?.payment?.udaCharge?.UDATotalCharged) ? (filteredData?.payment?.udaCharge?.UDATotalCharged) : "xxxxxxx"
          }/=
          fee online, remaining all
          fee DD/Challan can be attached in LTP login only.
        </h3>
      </div>
      <div className="flex justify-end mt-2 pb-9">
        <button
          className={`flex rounded justify-center items-center px-2 py-[6px] border-none text-white cursor-pointer shadow-md shadow-violetDark transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold text-base bg-gradient-to-r from-violet-500 to-fuchsia-500`}
        >
          <GiMoneyStack size={25} /><span className="ml-1">pay now</span>
        </button>
      </div>
    </div>
  );
};

export default OnlinePayment;
