import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

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
        setTableData((prev) => {
          const newValue = {
            tableHeader,
            data: applicationData,
          };
          return { ...prev, ...newValue };
        });
      }
    })();
  }, []);

  console.log(tableData, "TABLE DATA");
  return (
    <div>
      <p>PLOT DETAILS</p>
    </div>
  );
};

export default PlotDetails;
<p>PLOT DETAILS</p>;
