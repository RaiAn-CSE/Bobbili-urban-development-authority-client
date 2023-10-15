import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import ShowSubmittedApplication from "../../LtpDashboard/Submitted/ShowSubmittedApplication";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Inward = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [allData, setAllData] = useState([]);

  const navigate = useNavigate();

  const path = useLocation().pathname;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // get all applications which are submitted already
  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    ["allInwardApplications"],
    async () => {
      const response = await fetch(`http://localhost:5000/submitApplications`);
      return await response.json();
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isError) {
      console.log("ERROR");
      setError("No data found");
    } else {
      setError("");
    }

    setAllData(data);
  }, [isError, data]);

  console.log(allData);
  // console.log(data);

  // navigate after clicking on the draft application no
  const showDraftApplication = (applicationNo) => {
    console.log(applicationNo);
    localStorage.setItem("CurrentAppNo", JSON.stringify(applicationNo));
    navigate("/dashboard/draftApplication/buildingInfo");
  };

  const onSubmit = (data) => {
    console.log(data);
    const { search } = data;

    console.log(search, "Search");

    if (search?.includes("BUDA/2023")) {
      //  search by application No
      setAllData(
        allData?.filter((application) => application?.applicationNo === search)
      );
    } else {
      console.log("Asci");

      setAllData(
        allData?.filter(
          (application) =>
            application?.applicantInfo?.applicantDetails[0]?.name?.toLowerCase() ===
            search?.toLowerCase()
        )
      );
    }
  };

  return (
    <div>
      {path.includes("searchApplication") && (
        <form className="max-w-lg my-3 px-3" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("search")}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Application no. or owner name"
              required
            />
            <input
              type="submit"
              value="Search"
              className="text-[#fff] font-semibold absolute right-2.5 bottom-2.5 focus:ring-2 focus:outline-none focus:ring-fuchsia-200 rounded-lg text-sm px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"
            />
          </div>
        </form>
      )}
      <div className="w-full overflow-x-auto my-10">
        <table className="table text-black">
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

            {allData?.map((applicationData, index) => (
              <ShowSubmittedApplication
                key={index}
                serialNo={index}
                applicationData={applicationData}
                showDraftApplication={showDraftApplication}
              />
            ))}
          </tbody>
        </table>

        {allData?.length === 0 && (
          <p className="text-center mt-8 font-bold text-xl">
            No application Found
          </p>
        )}
        {error && (
          <p className="text-lg text-center my-4 font-bold text-error">
            {error}
          </p>
        )}

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Inward;
