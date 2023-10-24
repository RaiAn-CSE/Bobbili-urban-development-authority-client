import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

function Outward() {
  const [error, setError] = useState("");
  const [allData, setAllData] = useState([]);

  const { userInfoFromLocalStorage } = useContext(AuthContext);

  // get all applications which are submitted already
  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    ["allOutwardApplications"],
    async () => {
      const response = await fetch(
        `http://localhost:5000/totalApplications?data=${JSON.stringify(
          userInfoFromLocalStorage()
        )}`
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

      const approved = data?.applications?.approvedApplications;
      const shortfall = data?.applications?.shortfallApplications;
      const rejected = data?.applications?.totalRejectedApplications;

      console.log(approved, "App");
      console.log(shortfall, "shrt");
      console.log(rejected, "reject");
      setAllData((prev) => {
        const newValue = [...approved, ...shortfall, ...rejected];
        return newValue;
      });
    }
  }, [isError, isSuccess]);

  console.log(allData, "Alldata");

  return (
    <>
      <div className="container mx-auto px-4 font-roboto ">
        <div className="py-4">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal text-center">
                {/* head */}
                <thead className="bg-[#303952]">
                  <tr className="bg-[#303952] text-xs md:text-sm text-white hover:bg-[#303952]">
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Sl. no.
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider w-48">
                      Application no.
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Owner name
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Phone no.
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Case type
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Village
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Mandal
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Submitted date
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-900">
                  {/* show draft applications  */}

                  {allData?.length !== 0 &&
                    allData?.map((applicationData, index) => {
                      return (
                        <tr key={applicationData?.applicationNo}>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {index + 1}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {applicationData?.applicationNo}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {applicationData?.applicantDetails?.length
                                ? applicationData?.applicantDetails[0].name
                                : "N/A"}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {applicationData?.applicantDetails?.length
                                ? applicationData?.applicantDetails[0].phone
                                : "N/A"}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {applicationData?.generalInformation?.caseType !==
                              ""
                                ? applicationData?.generalInformation?.caseType
                                : "N/A"}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {applicationData?.generalInformation?.village !==
                              ""
                                ? applicationData?.generalInformation?.village
                                : "N/A"}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {applicationData?.generalInformation?.mandal !==
                              ""
                                ? applicationData?.generalInformation?.mandal
                                : "N/A"}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <p className="text-gray-900 break-words">
                              {applicationData?.psSubmitDate ?? "N/A"}
                            </p>
                          </td>
                          <td className="p-3  border-b border-gray-200 text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className={`absolute inset-0  ${
                                  (applicationData?.status
                                    ?.toLowerCase()
                                    ?.includes("pending") &&
                                    "bg-orange-200") ||
                                  (applicationData?.status
                                    ?.toLowerCase()
                                    ?.includes("approved") &&
                                    "bg-green-200") ||
                                  (applicationData?.status
                                    ?.toLowerCase()
                                    ?.includes("shortfall") &&
                                    "bg-[#fad390]") ||
                                  (applicationData?.status
                                    ?.toLowerCase()
                                    ?.includes("rejected") &&
                                    "bg-red-200")
                                } opacity-50 rounded-full`}
                              ></span>
                              <span className="relative">
                                {applicationData?.status ?? "N/A"}
                              </span>
                            </span>
                          </td>
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
                <p className="text-lg text-center my-4 font-bold text-error">
                  {error}
                </p>
              )}

              {isLoading && <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Outward;
