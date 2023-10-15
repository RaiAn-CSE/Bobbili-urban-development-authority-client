import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import ShowSubmittedApplication from "./ShowSubmittedApplication";
import useGetPageWiseApplication from "../../../CustomHook/useGetPageWiseApplication";

const SubmitApplication = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [data, refetch, isError, isLoading] = useGetPageWiseApplication(
    "Submit Applications"
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
  return (
    <div className="w-full  mt-6 ">
      <table className="w-full font-roboto dark:text-white">
        {/* head */}
        <thead>
          <tr className="bg-[#2d3436] text-sm md:text-base text-white hover:bg-[#353b48]">
            <th className="p-2">Sl.no.</th>
            <th className="p-2">Application no.</th>
            <th className="p-2">Owner name</th>
            <th className="p-2">Phone no.</th>
            <th className="p-2">Case type</th>
            <th className="p-2">Village</th>
            <th className="p-2">Mandal</th>
            <th className="p-2">Submitted date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* show draft applications  */}

          {data?.map((applicationData, index) => (
            <ShowSubmittedApplication
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

export default SubmitApplication;
