import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useQuery } from "react-query";
import useGetPageWiseApplication from "../../../CustomHook/useGetPageWiseApplication";
import ShowAllApprovedApplications from "./ShowAllApprovedApplications";

const Approved = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [data, refetch, isError, isLoading] = useGetPageWiseApplication(
    "Approved Applications"
  );

  console.log(data);

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
            <th>Approved date</th>
          </tr>
        </thead>
        <tbody>
          {/* show draft applications  */}

          {data?.map((applicationData, index) => (
            <ShowAllApprovedApplications
              key={index}
              serialNo={index}
              applicationData={applicationData}
            />
          ))}
        </tbody>
      </table>

      {error && (
        <p className="text-lg text-center my-4 font-bold text-error">{error}</p>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Approved;
