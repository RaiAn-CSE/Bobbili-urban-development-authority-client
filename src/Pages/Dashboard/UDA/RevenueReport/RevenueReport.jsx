import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import MISReportTableLayout from "../../../Components/MISReportTableLayout";
import ShowRevenueReports from "./ShowRevenueReports";

const RevenueReport = () => {
  const { fetchDataFromTheDb } = useContext(AuthContext);
  const [tableData, setTableData] = useState({});

  const tableHeader = [
    "S.NO",
    "FILE NO",
    "DISTRICT",
    "MANDAL",
    "VILLAGE",
    "OWNER NAME",
    "OWNER NO",
    "OWNER ADDRESS",
    "LTP NAME",
    "LTP MOBILE",
    "MARKET VALUE",
    "APPROVED DATE",
    "SUBMISSION DATE",
    "PAYMENT DATE",
    "FY",
    "Year",
    "Status",
    "14% Open Space Charges",
    "33% Penalization charges",
    "Development Charges (Built Up Area)",
    "Development Charges (Vacant Land)",
    "Labour Cess Component 2",
    "User Charges",
    "Betterment Charges",
    "Building Permit Fees",
    "Site approval charges",
    "Paper Publication Charges",
    "Processing Fees",
    "Green Fee Charges",
    "Labour Cess Component 1",
    "TOTAL PAID",
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
      <MISReportTableLayout
        tableData={tableData}
        Component={ShowRevenueReports}
      />
    </div>
  );
};

export default RevenueReport;
<p>REVENUE REPORT</p>;
