import React, { useRef, useState } from "react";
import Loading from "../../../Shared/Loading";
import { useDownloadExcel } from "react-export-table-to-excel";

const VerificationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const verificationTableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: verificationTableRef.current,
    filename: "VerificationStatus",
    sheet: "VerificationStatus",
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <button onClick={onDownload}>Download</button>

      <div className="container mx-auto px-4 font-roboto ">
        <div className="py-4">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="inline-block min-w-full nm_Container rounded-lg overflow-hidden">
              <table
                className=" min-w-full leading-normal text-center "
                ref={verificationTableRef}
              >
                <thead className="bg-normalViolet">
                  <tr className="hidden md:table-row">
                    <th
                      className={`p-3 border-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider `}
                      rowSpan={2}
                    >
                      Staff Name
                    </th>
                    <th
                      className={`p-3 border-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider `}
                      rowSpan={2}
                    >
                      Cantact no.
                    </th>
                    <th
                      className={`p-3 border-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider `}
                      colSpan={3}
                    >
                      No. of Files
                    </th>
                  </tr>
                  <tr className="hidden md:table-row">
                    <th
                      className={`p-3 border-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider `}
                    >
                      Assigned
                    </th>
                    <th
                      className={`p-3 border-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider `}
                    >
                      Verified
                    </th>
                    <th
                      className={`p-3 border-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider `}
                    >
                      Pending
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:text-black hidden md:table-row">
                    <td className="p-3 text-sm">
                      <p className="text-gray-900 ">Hi</p>
                    </td>
                    <td className="p-3 text-sm">
                      <p className="text-gray-900 ">Hi</p>
                    </td>
                    <td className="p-3 text-sm">
                      <p className="text-gray-900 ">Hi</p>
                    </td>
                    <td className="p-3 text-sm">
                      <p className="text-gray-900 ">Hi</p>
                    </td>
                    <td className="p-3 text-sm">
                      <p className="text-gray-900 ">Hi</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationStatus;
<p>VS</p>;
