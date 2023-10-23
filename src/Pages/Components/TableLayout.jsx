import React from "react";
import AllDraftApplication from "../Dashboard/LtpDashboard/DraftApplication/AllDraftApplication";

const TableLayout = ({ props }) => {
  console.log(props, "PROPS");
  return (
    <div className="container mx-auto px-4 font-roboto ">
      <div className="py-4">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal text-center">
              <thead className="bg-gradient-to-r from-teal-400 to-yellow-200">
                <tr>
                  {props?.tableHeader?.map((headerName) => {
                    return (
                      <th
                        key={headerName}
                        className={`p-3 border-b-2 border-gray-200  text-black  text-xs font-semibold uppercase tracking-wider ${
                          headerName === "Application no." && "w-48"
                        }`}
                      >
                        {headerName}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                  </td>
                  
                </tr> */}

                {props?.tableData?.map((applicationData, index) => (
                  <AllDraftApplication
                    key={index}
                    serialNo={index}
                    applicationData={applicationData}
                    showDraftApplication={props?.showPageBasedOnApplicationType}
                    removeDraftApplication={props?.removeDraftApplication}
                    navigate={props?.navigate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
