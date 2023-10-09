import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDownloadExcel } from "react-export-table-to-excel";
import { TfiExport } from "react-icons/tfi";

const UdaDashboard = () => {
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const [applicationNumbers, setApplicationNumbers] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/totalApplications")
      .then((response) => {
        // handle success
        console.log(response);

        const { data } = response;

        setApplicationNumbers(data);
      })
      .catch((error) => {
        // handle error
        toast.error("Server error");
      });
  }, []);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "TotalApplication table",
    sheet: "TotalApplications",
  });

  return (
    <div className="flex flex-col font-roboto w-11/12 mx-auto my-10 overflow-x-auto sm:rounded-lg">
      <button
        onClick={onDownload}
        className={`${gradientColor} mb-8 font-roboto text-base text-white p-2 rounded-lg self-end flex items-center justify-center`}
      >
        Export <TfiExport size={18} className="ms-2" />
      </button>
      <table
        className={`w-full text-sm text-left shadow-2xl shadow-violetLight  dark:text-gray-400`}
        ref={tableRef}
      >
        <thead className={`bg-black text-sm text-white text-center uppercase `}>
          <tr>
            <th scope="col" className="px-6 py-3  dark:bg-gray-800">
              Submitted Applications
            </th>
            <th scope="col" className="px-6 py-3">
              Approved Applications
            </th>
            <th scope="col" className="px-6 py-3  dark:bg-gray-800">
              Shortfall Applications
            </th>
            <th scope="col" className="px-6 py-3">
              Total Applications
            </th>
          </tr>
        </thead>
        <tbody className="text-center text-base">
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
            >
              {applicationNumbers?.submitted}
            </th>
            <td className="px-6 py-4">{applicationNumbers?.approved}</td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
              {applicationNumbers?.shortfall}
            </td>
            <td className="px-6 py-4">{applicationNumbers?.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UdaDashboard;
