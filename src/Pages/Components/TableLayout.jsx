import React from "react";

const TableLayout = ({ tableData, Component, tableComponentProps }) => {
  return (
    <div className="container mx-auto px-4 font-roboto ">
      <div className="py-4">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="inline-block min-w-full nm_Container rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal text-center">
              <thead className="bg-normalViolet">
                <tr className="hidden md:table-row">
                  {tableData?.tableHeader?.map((headerName) => {
                    return (
                      <th
                        key={headerName}
                        className={`p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider ${headerName === "Application no." && "w-48"
                          }`}
                      >
                        {headerName}
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
                    tableComponentProps={tableComponentProps}
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
