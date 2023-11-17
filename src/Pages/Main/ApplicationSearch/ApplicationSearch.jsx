import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsHouses } from "react-icons/bs";
import MainPageInput from "../MainPageInput";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import HomeCss from "../../../Style/Home.module.css";
import { VscDebugContinue } from "react-icons/vsc";
import ProceedingModal from "../../Shared/ProceedingModal";
import Application from "../../Dashboard/LtpDashboard/DraftApplication/Application";

const ApplicationSearch = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [status, setStatus] = useState(null);
  const [openApplication, setOpenApplication] = useState(false);
  const [openProceeding, setOpenProceeding] = useState(false);

  // console.log(filteredData, 'filteredData');

  const { fetchDataFromTheDb } = useContext(AuthContext);

  useEffect(() => {
    fetchDataFromTheDb("http://localhost:5000/allApplications").then((data) => {
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
    } else if (value?.length) {
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

    if (value?.length === 0) {
      setFilteredData(null);
    }
  };

  console.log(filteredData, "filteredData");

  const titleClass = "basis-[50%] text-lg pl-3 font-semibold text-gray-900";

  return (
    <div className=" h-full font-roboto w-full px-4 mt-5 bg-[#E8EAEC]">
      <div className={`${HomeCss.searchInputContainer} `}>
        <input
          placeholder="Application no. or owner name"
          className={`${HomeCss.searchInput} text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-100`}
          name="text"
          type="text"
          onChange={(e) => searchApplicationData(e)}
          required
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${HomeCss.searchIcon} nm_Container`}
        >
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            id="SVGRepo_tracerCarrier"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <rect fill="white"></rect>{" "}
            <path
              d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>{" "}
          </g>
        </svg>
      </div>

      {/* Location details  */}
      <div className=" divide-y-2 divide-gray-200 mt-7">
        <div className="flex mb-1">
          <h3 className={titleClass}>Location details</h3>
          <h3 className={titleClass}>Building info</h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="Survey no :"
              id="surveyNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.buildingInfo?.generalInformation?.surveyNo
              }
            />
            <MainPageInput
              label="Village :"
              id="village"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.buildingInfo?.generalInformation?.village
              }
            />
            <MainPageInput
              label="Mandal :"
              id="mandal"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.buildingInfo?.generalInformation?.mandal
              }
            />
            <MainPageInput
              label="District :"
              id="district"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.buildingInfo?.generalInformation?.district
              }
            />
          </div>

          <div className="basis-[50%]">
            <MainPageInput
              label="Net plot area :"
              id="netPlotArea"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.buildingInfo?.plotDetails?.netPlotAreaCal
              }
            />
            <MainPageInput
              label="No. of floors :"
              id="noOfFloors"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.buildingInfo?.plotDetails?.floorDetails?.length
              }
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
              ltpDetails={
                filteredData?.buildingInfo?.plotDetails?.totalBuiltUpArea
              }
            />
          </div>
        </div>
      </div>

      {/* Owner details  */}
      <div className="divide-y-2 divide-gray-200 mt-9">
        <div className="flex mb-1">
          <h3 className={titleClass}>Owner details</h3>
          <h3 className={titleClass}>LTP Details</h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="Name :"
              id="name1"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.applicantInfo.applicantDetails?.[0].name
              }
            />
            <MainPageInput
              label="Door no :"
              id="ownerDoorNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.applicantInfo.applicantDetails?.[0].ownerDoorNo
              }
            />
            <MainPageInput
              label="Street name :"
              id="ownerStreetNo"
              type="text"
              placeholder="xxxxxxx"
              ltpDetails={
                filteredData?.applicantInfo.applicantDetails?.[0].ownerStreetNo
              }
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

      <div className="flex justify-center items-center mt-14 pb-9 space-x-10 dark:text-gray-600">
        <button
          className="nm_Container w-[90px] h-[80px] flex flex-col justify-center items-center"
          onClick={() => setOpenApplication(true)}
          disabled={filteredData === null}
        >
          <span className="grid justify-center items-center">
            <AiOutlineFileDone className="text-violet-500" size={25} />
          </span>
          <h4 className="text-base font-semibold">Application</h4>
        </button>

        <button
          className="nm_Container w-[90px] h-[80px] flex flex-col justify-center items-center"
          disabled={
            filteredData === null ||
            filteredData?.status?.toLowerCase() !== "approved"
          }
        >
          <span className="grid justify-center items-center">
            <BsHouses className="text-violet-500" size={25} />
          </span>
          <h4 className="text-base font-semibold">Drawing</h4>
        </button>

        <button
          className="nm_Container w-[90px] h-[80px] flex flex-col justify-center items-center"
          onClick={() => {
            setOpenProceeding(true);
          }}
          disabled={
            filteredData === null ||
            filteredData?.status?.toLowerCase() !== "approved"
          }
        >
          <span className="grid justify-center items-center">
            <VscDebugContinue className="text-violet-500" size={25} />
          </span>
          <h4 className="text-base font-semibold">Proceeding</h4>
        </button>
      </div>

      {/* Application Modal */}
      {openApplication && filteredData ? (
        <Application
          setOpenApplication={setOpenApplication}
          filteredData={filteredData}
        />
      ) : (
        ""
      )}

      {/* proceedingModal modal info  */}
      {openProceeding && filteredData ? (
        <ProceedingModal
          modalProceeding={{ setOpenProceeding, openProceeding, filteredData }}
        />
      ) : null}
    </div>
  );
};

export default ApplicationSearch;
