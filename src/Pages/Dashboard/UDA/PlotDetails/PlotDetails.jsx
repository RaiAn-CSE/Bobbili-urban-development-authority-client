import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import TableLayout from "../../../Components/TableLayout";
import ShowPlotDetails from "./ShowPlotDetails";
import MISReportTableLayout from "../../../Components/MISReportTableLayout";

const PlotDetails = () => {
  const { fetchDataFromTheDb } = useContext(AuthContext);
  const [tableData, setTableData] = useState({});

  const tableHeader = [
    "S.NO",
    "FILE NO",
    "DISTRICT",
    "MANDAL",
    "VILLAGE",
    "OWNER NAME",
    "OWNER ADDRESS",
    "LTP NAME",
    "LTP MOBILE",
    "MARKET VALUE",
    "APPROVED DATE",
    "Total site area",
    "Road widening area",
    "NET SITE AREA",
    "No. of floors",
    "Builtup area",
    "No. of UNITS",
    "Submission Date",
    "FY",
    "Year",
    "Status",
  ];

  useEffect(() => {
    (async function () {
      const applicationData = await fetchDataFromTheDb(
        "http://localhost:5000/totalApplications"
      );
      console.log(applicationData, "AD");
      if (Object.keys(applicationData)?.length) {
        const approvedApplications =
          applicationData?.applications?.approvedApplications;
        const shortfallApplications =
          applicationData?.applications?.shortfallApplications;
        const submitApplications =
          applicationData?.applications?.submittedApplications;

        console.log(
          approvedApplications,
          shortfallApplications,
          submitApplications
        );

        const allApplications = [].concat(
          approvedApplications,
          shortfallApplications,
          submitApplications
        );
        setTableData((prev) => {
          const newValue = {
            tableHeader,
            data: allApplications,
          };
          return { ...prev, ...newValue };
        });
      }
    })();
  }, []);

  console.log(tableData, "TABLE DATA");
  return (
    <div>
      <MISReportTableLayout tableData={tableData} Component={ShowPlotDetails} />
    </div>
  );
};

export default PlotDetails;
<p>PLOT DETAILS</p>;
