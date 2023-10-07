import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const Shortfall = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const [error, setError] = useState("");

  // get all applications which are submitted already
  const { data, refetch, isLoading, isError } = useQuery(
    ["allSubmitApplication"],
    async () => {
      const response = await fetch(
        `http://localhost:5000/allSubmitApplications?id=${
          userInfoFromLocalStorage()._id
        }`
      );
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
  return (
    <div className="w-full overflow-x-auto mt-6">
      <table className="table table-zebra">
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

          {/* {data?.map((applicationData, index) => (
            <ShowSubmittedApplication
              key={index}
              serialNo={index}
              applicationData={applicationData}
            />
          ))} */}
        </tbody>
      </table>

      {error && (
        <p className="text-lg text-center my-4 font-bold text-error">{error}</p>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Shortfall;
