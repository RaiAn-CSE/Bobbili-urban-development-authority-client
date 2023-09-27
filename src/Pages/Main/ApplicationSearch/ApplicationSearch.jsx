import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsHouses } from "react-icons/bs";
import { MdOutlineNoteAlt } from "react-icons/md";
import MainPageInput from "../MainPageInput";

const ApplicationSearch = () => {
  return (
    <div className="px-4 card bg-base-100 shadow-xl mx-4 pb-4">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Application no. or owner name"
            required
          />
          <button
            type="submit"
            className="text-[#000] font-semibold absolute right-2.5 bottom-2.5 bg-[#ffd66c] hover:bg-[#e1bc60] focus:ring-4 focus:outline-none focus:ring-[#ffd66c] rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {/* Location details  */}
      <div className="divide-y-2 divide-gray-200 mt-5">
        <div className="flex mb-1">
          <h3 className="basis-[50%] text-xl px-5 font-semibold">
            Location details
          </h3>
          <h3 className="basis-[50%] text-xl px-5 font-semibold">
            Building info
          </h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="Survey no"
              id="surveyNo"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="Village"
              id="village"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="Mandal"
              id="mandal"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="District"
              id="district"
              type="text"
              placeholder="xxxxxxx"
            />
          </div>

          <div className="basis-[50%]">
            <MainPageInput
              label="Site area"
              id="siteArea"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="No. of floors"
              id="noOfFloors"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="N0. of units"
              id="noOfUnits"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="Total Plinth Area"
              id="totalPlinthArea"
              type="text"
              placeholder="xxxxxxx"
            />
          </div>
        </div>
      </div>

      {/* Owner details  */}
      <div className="divide-y-2 divide-gray-200 mt-5">
        <div className="flex mb-1">
          <h3 className="basis-[50%] text-xl px-5 font-semibold">
            Owner details
          </h3>
          <h3 className="basis-[50%] text-xl px-5 font-semibold">
            LTP Details
          </h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <MainPageInput
              label="Name"
              id="name1"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="Address"
              id="address1"
              type="text"
              placeholder="xxxxxxx"
            />
          </div>

          <div className="basis-[50%]">
            <MainPageInput
              label="Name"
              id="name2"
              type="text"
              placeholder="xxxxxxx"
            />
            <MainPageInput
              label="Address"
              id="address2"
              type="text"
              placeholder="xxxxxxx"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <div className="p-3">
          <span className="grid justify-center items-center">
            <AiOutlineFileDone size={25} />
          </span>
          <h4 className="text-base font-semibold">Application</h4>
        </div>
        <div className="p-3">
          <span className="grid justify-center items-center">
            <BsHouses size={25} />
          </span>
          <h4 className="text-base font-semibold">Drawing</h4>
        </div>
        <div className="p-3">
          <span className="grid justify-center items-center">
            <MdOutlineNoteAlt size={25} />
          </span>
          <h4 className="text-base font-semibold">Proceeding</h4>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSearch;
