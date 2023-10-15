import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

function Outward() {
  const [error, setError] = useState("");
  const [allData, setAllData] = useState([]);

  // get all applications which are submitted already
  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    ["allOutwardApplications"],
    async () => {
      const response = await fetch(
        `https://residential-building.vercel.app/totalApplications`
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

    if (isSuccess) {
      console.log(data, "DATA");

      const approved = data?.approvedApplications;
      const shortfall = data?.shortfallApplications;

      console.log(approved);
      console.log(shortfall);
      setAllData([
        ...data?.applications?.approvedApplications,
        ...data?.applications?.shortfallApplications,
      ]);
    }
  }, [isError, isSuccess]);

  console.log(allData, "Alldata");
  return (
    <div className="w-full overflow-x-auto my-10 px-1">
      <table className="table dark:text-white">
        {/* head */}
        <thead>
          <tr className="bg-[#2d3436] text-xs md:text-sm text-white hover:bg-[#353b48]">
            <th>Sl. no.</th>
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

          {allData?.length !== 0 &&
            allData?.map((applicationData, index) => {
              return (
                <tr key={applicationData?.applicationNo}>
                  <th>{index + 1}</th>
                  <td>{applicationData?.applicationNo}</td>
                  <td>
                    {applicationData?.applicantDetails?.length
                      ? applicationData?.applicantDetails[0].name
                      : "N/A"}
                  </td>
                  <td>
                    {applicationData?.applicantDetails?.length
                      ? applicationData?.applicantDetails[0].phone
                      : "N/A"}
                  </td>
                  <td>
                    {applicationData?.generalInformation?.caseType !== ""
                      ? applicationData?.generalInformation?.caseType
                      : "N/A"}
                  </td>
                  <td>
                    {" "}
                    {applicationData?.generalInformation?.village !== ""
                      ? applicationData?.generalInformation?.village
                      : "N/A"}
                  </td>
                  <td>
                    {" "}
                    {applicationData?.generalInformation?.mandal !== ""
                      ? applicationData?.generalInformation?.mandal
                      : "N/A"}
                  </td>
                  <td>{applicationData?.submitDate ?? "N/A"}</td>
                  <td>{applicationData?.status ?? "N/A"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {allData?.length === 0 && (
        <p className="text-center mt-8 font-bold text-xl">
          No application Found
        </p>
      )}
      {error && (
        <p className="text-lg text-center my-4 font-bold text-error">{error}</p>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default Outward;
