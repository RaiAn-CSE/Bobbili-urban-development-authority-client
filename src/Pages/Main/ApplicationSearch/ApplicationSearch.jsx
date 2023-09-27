import React from "react";
import ApplicationSearchInput from "./ApplicationSearchInput";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsHouses } from "react-icons/bs";
import { MdOutlineNoteAlt } from "react-icons/md";

const ApplicationSearch = () => {

  const inputClass = "basis-[50%] w-full px-3 py-2 border rounded-lg max-w-xs"
  const inputDiv = "flex items-center px-5 text-gray-400 mt-2"

  return (
    <div className="px-4 card bg-base-100 shadow-xl mx-4">
      <div className="">

        <form>
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Application no. or owner name" required />
            <button type="submit" class="text-[#000] font-semibold absolute right-2.5 bottom-2.5 bg-[#ffd66c] hover:bg-[#e1bc60] focus:ring-4 focus:outline-none focus:ring-[#ffd66c] rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </form>

      </div>

      {/* Location details  */}
      <div className="divide-y-2 divide-gray-200 mt-5">
        <div className="flex mb-1">
          <h3 className="basis-[50%] text-xl px-5 font-semibold">Location details</h3>
          <h3 className="basis-[50%] text-xl px-5 font-semibold">Building info</h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <ApplicationSearchInput
              label='Survey no'
              id='surveyNo'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='Village'
              id='village'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='Mandal'
              id='mandal'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='District'
              id='district'
              type='text'
              placeholder='xxxxxxx'
            />

            {/* <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Survey no</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Village</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Mandal</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">District</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div> */}

          </div>

          <div className="basis-[50%]">
            <ApplicationSearchInput
              label='Site area'
              id='siteArea'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='No. of floors'
              id='noOfFloors'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='N0. of units'
              id='noOfUnits'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='Total Plinth Area'
              id='totalPlinthArea'
              type='text'
              placeholder='xxxxxxx'
            />

            {/* <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Site area</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">No. of floors</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">N0. of units</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className="flex items-center px-5 text-gray-400 mt-2 w-full">
              <label className="basis-[50%]" htmlFor="">Total Plinth Area</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div> */}

          </div>

        </div>
      </div>

      {/* Owner details  */}
      <div className="divide-y-2 divide-gray-200 mt-5">
        <div className="flex mb-1">
          <h3 className="basis-[50%] text-xl px-5 font-semibold">Owner details</h3>
          <h3 className="basis-[50%] text-xl px-5 font-semibold">LTP Details</h3>
        </div>
        <div className="flex">
          <div className="basis-[50%]">
            <ApplicationSearchInput
              label='Name'
              id='name'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='Address'
              id='address'
              type='text'
              placeholder='xxxxxxx'
            />
            {/* <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Name</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Address</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div> */}

          </div>
          <div className="basis-[50%]">
            <ApplicationSearchInput
              label='Name'
              id='name'
              type='text'
              placeholder='xxxxxxx'
            />
            <ApplicationSearchInput
              label='Address'
              id='address'
              type='text'
              placeholder='xxxxxxx'
            />
            {/* <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Name</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div>
            <div className={inputDiv}>
              <label className="basis-[50%]" htmlFor="">Address</label>
              <input id="" className={inputClass} type="text" placeholder="xxxxxxx" />
            </div> */}

          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-3">
        <div className="p-3">
          <span className="grid justify-center items-center"><AiOutlineFileDone size={25} /></span>
          <h4 className="text-base font-semibold">Application</h4>
        </div>
        <div className="p-3">
          <span className="grid justify-center items-center"><BsHouses size={25} /></span>
          <h4 className="text-base font-semibold">Drawing</h4>
        </div>
        <div className="p-3">
          <span className="grid justify-center items-center"><MdOutlineNoteAlt size={25} /></span>
          <h4 className="text-base font-semibold">Proceeding</h4>
        </div>
      </div>
    </div >
  );
};

export default ApplicationSearch;
