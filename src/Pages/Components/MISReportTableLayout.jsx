import React from "react";

const MISReportTableLayout = ({ tableData, Component }) => {
  return (
    <div className="container mx-auto px-4 font-roboto ">
      <div className="py-4">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="shadow-md rounded-lg overflow-scroll h-[calc(100vh-20vh)]">
            <table className="min-w-full leading-normal text-center">
              <thead className="bg-[#303952] sticky top-0 z-10">
                <tr>
                  {tableData?.tableHeader?.map((headerName) => {
                    return (
                      <th
                        key={headerName}
                        className={`p-3 border-b-2  border-gray-200  text-white text-xs font-semibold uppercase text-center`}
                      >
                        <p className="w-[100px] mx-auto text-center">
                          {headerName}
                        </p>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tableData?.data?.map((applicationData, index) => (
                  <Component
                    key={index}
                    serialNo={index}
                    applicationData={applicationData}
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

export default MISReportTableLayout;
