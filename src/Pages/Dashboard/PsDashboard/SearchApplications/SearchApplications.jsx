import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ShowSubmittedApplication from "../../LtpDashboard/Submitted/ShowSubmittedApplication";

function SearchApplications() {

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // get all applications which are submitted already
  const { data, refetch, isLoading, isError } = useQuery(
    ["allSubmitApplication"],
    async () => {
      const response = await fetch(`http://localhost:5000/submitApplications`);
      return await response.json();
    }
  );

  useEffect(() => {
    if (isError) {
      console.log("ERROR");
      setError("No data found");
    } else {
      setError("");
    }
  }, [isError]);

  console.log(data);

  // navigate after clicking on the draft application no
  const showDraftApplication = (applicationNo) => {
    console.log(applicationNo);
    localStorage.setItem("CurrentAppNo", JSON.stringify(applicationNo));
    navigate("/dashboard/draftApplication/buildingInfo");
  };

  return (
    <div>
      <form className="max-w-lg my-3">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Application no. or owner name" required />
          <button type="submit" className="text-[#000] font-semibold absolute right-2.5 bottom-2.5 bg-[#ffd66c] hover:bg-[#e1bc60] focus:ring-4 focus:outline-none focus:ring-[#ffd66c] rounded-lg text-sm px-4 py-2">Search</button>
        </div>
      </form>

      <div className="w-full overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#2d3436] text-xs md:text-sm text-white hover:bg-[#353b48]">
              <th>Sl.no.</th>
              <th>Application no.</th>
              <th>Owner name</th>
              <th>Phone no.</th>
              <th>Case type</th>
              <th>Village</th>
              <th>Mandal</th>
              <th>Submitted date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* show draft applications  */}

            {data?.map((applicationData, index) => (
              <ShowSubmittedApplication
                key={index}
                serialNo={index}
                applicationData={applicationData}
                showDraftApplication={showDraftApplication}
              />
            ))}
          </tbody>
        </table>

        {error && (
          <p className="text-lg text-center my-4 font-bold text-error">
            {error}
          </p>
        )}

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  )
}

export default SearchApplications;