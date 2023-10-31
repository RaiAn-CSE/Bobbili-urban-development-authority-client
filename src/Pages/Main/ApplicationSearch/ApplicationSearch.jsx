import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsHouses } from "react-icons/bs";
import { MdOutlineNoteAlt } from "react-icons/md";
import MainPageInput from "../MainPageInput";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const ApplicationSearch = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  // console.log(filteredData, 'filteredData');

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

  console.log(filteredData, 'filteredData');

  const titleClass = "basis-[50%] text-lg px-5 font-semibold text-gray-900"

  return (
    <div className=" h-full font-roboto w-full px-4 dark:bg-white">
      <form className="">
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-violet-900"
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
            className="block w-full p-4 pl-10 text-base font-normal text-gray-900 border border-violet-400 focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-100 rounded-lg bg-gray-50"
            placeholder="Application no. or owner name"
            onChange={(e) => searchApplicationData(e)}
            required
          />
        </div>
      </form>

      {/* Location details  */}
      <div className="divide-y-2 divide-gray-200 mt-9">
        <div className="flex mb-1">
          <h3 className={titleClass}>
            Location details
          </h3>
          <h3 className={titleClass}>
            Building info
          </h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="Survey no :"
              id="surveyNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.surveyNo}
            />
            <MainPageInput
              label="Village :"
              id="village"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.village}
            />
            <MainPageInput
              label="Mandal :"
              id="mandal"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.mandal}
            />
            <MainPageInput
              label="District :"
              id="district"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.generalInformation?.district}
            />
          </div>

          <div className="basis-[50%]">
            <MainPageInput
              label="Net plot area :"
              id="netPlotArea"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.plotDetails?.netPlotAreaCal}
            />
            <MainPageInput
              label="No. of floors :"
              id="noOfFloors"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.plotDetails?.floorDetails?.length}
            />
            <MainPageInput
              label="N0. of units :"
              id="noOfUnits"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.plotDetails?.noOfUnits}
            />
            <MainPageInput
              label="Total built up area :"
              id="totalBuiltUpArea"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.buildingInfo?.plotDetails?.totalBuiltUpArea}
            />
          </div>
        </div>
      </div>

      {/* Owner details  */}
      <div className="divide-y-2 divide-gray-200 mt-9">
        <div className="flex mb-1">
          <h3 className={titleClass}>
            Owner details
          </h3>
          <h3 className={titleClass}>
            LTP Details
          </h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="Name :"
              id="name1"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicantInfo.applicantDetails?.[0].name}
            />
            <MainPageInput
              label="Owner door no :"
              id="ownerDoorNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicantInfo.applicantDetails?.[0].ownerDoorNo}
            />
            <MainPageInput
              label="Owner street name :"
              id="ownerStreetNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicantInfo.applicantDetails?.[0].ownerStreetNo}
            />
          </div>

          <div className="basis-[50%]">
            <MainPageInput
              label="Name :"
              id="name2"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicantInfo.ltpDetails?.name}
            />
            <MainPageInput
              label="Address :"
              id="address2"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={filteredData?.applicantInfo.ltpDetails?.address}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center pt-5 pb-9 dark:text-gray-600">
        <div className="p-3">
          <span className="grid justify-center items-center">
            <AiOutlineFileDone className="text-violet-500" size={25} />
          </span>
          <h4 className="text-base font-semibold">Application</h4>
        </div>
        <div className="p-3">
          <span className="grid justify-center items-center">
            <BsHouses className="text-violet-500" size={25} />
          </span>
          <h4 className="text-base font-semibold">Drawing</h4>
        </div>
        <div className="p-3">
          <span className="grid justify-center items-center">
            <MdOutlineNoteAlt className="text-violet-500" size={25} />
          </span>
          <h4 className="text-base font-semibold">Proceeding</h4>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSearch;
