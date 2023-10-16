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
    <div className="h-full px-4 font-roboto">
      <form>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="Application no. or owner name"
            onChange={(e) => searchApplicationData(e)}
            required
          />
        </div>
      </form>

      {/* Location details  */}
      <div className="divide-y-2 divide-gray-200 mt-9  text-black">
        <div className="mb-1">
          <h3 className="basis-[50%] text-lg px-5 font-semibold">
            Application details
          </h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="File no"
              id="fileNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicationNo}
            />
            <MainPageInput
              label="Owner name"
              id="applicantName"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicantInfo?.applicantDetails?.[0].name}
            />
            <MainPageInput
              label="Mandal"
              id="mandal2"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.mandal}
            />
          </div>

          <div className="basis-[50%]">
            <MainPageInput
              label="Case Type"
              id="caseType"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.caseType}
            />
            <MainPageInput
              label="Village name"
              id="villageName"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.village}
            />
            <MainPageInput
              label="District"
              id="district2"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.district}
            />
          </div>
        </div>
      </div>

      {/* Owner details  */}
      <div className="divide-y-2 divide-gray-200 mt-9 text-black">
        <div className="flex mb-1">
          <h3 className="text-lg px-5 font-semibold">Fees details</h3>
        </div>
        <div className="flex">
          <div className="basis-[70%]">
            <MainPageInput
              label="UDA charges"
              id="udaCharges"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.udaCharge?.UDATotalCharged}
            />
            <MainPageInput
              label="Grama Panchayat fee"
              id="gramaPanchayatFee"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.gramaPanchayatFee?.GramaPanchayetTotalCharged}
            />
            <MainPageInput
              label="Labour cess charge"
              id="labourCessCharge"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.labourCessCharge?.labourCessOne}
            />
            <MainPageInput
              label="Green fee charge"
              id="labourCessCharge"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.payment?.greenFeeCharge?.greenFee}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <h3 className="text-base font-medium">
          For UDA charge you can pay only Rs. xxxxx/= fee online, remaining all
          fee DD/Challan can be attached in LTP login only.
        </h3>
      </div>
      {/* <div className="flex justify-end mt-2 pb-9">
        <button className="flex text-[#000] font-semibold bottom-2.5 bg-[#ffd66c] hover:bg-[#e1bc60] focus:ring-4 focus:outline-none focus:ring-[#ffd66c] rounded-lg text-sm px-4 py-2">
          <GiMoneyStack size={25} /> <span className="ml-1">pay now</span>
        </button>
      </div> */}
      <div className="flex justify-end mt-2 pb-9">
        <button
          className={`flex rounded justify-center items-center px-2 py-[6px] border-none text-white cursor-pointer shadow-md shadow-violetDark transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold text-base bg-gradient-to-r from-violet-500 to-fuchsia-500`}
        >
          <GiMoneyStack size={25} /><span className="ml-1">Pay. Rs.</span>
        </button>
      </div>
    </div>
  );
};

export default OnlinePayment;
