import React, { useContext, useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import MISReportTableLayout from "../../../Components/MISReportTableLayout";
import ShowRevenueReports from "./ShowRevenueReports";
import Loading from "../../../Shared/Loading";
import ErrorAnimation from "../../../../assets/ServerError.json";
import { useDownloadExcel } from "react-export-table-to-excel";

const RevenueReport = () => {
  const { fetchDataFromTheDb } = useContext(AuthContext);
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const revenueTableRef = useRef(null);

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
    setLoading(true);
    setError("");
    (async function () {
      try {
        const applicationData = await fetchDataFromTheDb(
          "http://localhost:5000/totalApplications"
        );
        console.log(applicationData, "AD");
        if (Object.keys(applicationData)?.length) {
          setLoading(false);

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
        } else {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    })();
  }, []);

  const { onDownload } = useDownloadExcel({
    currentTableRef: revenueTableRef.current,
    filename: "RevenueReport",
    sheet: "RevenueReport",
  });

  console.log(tableData, "TABLE DATA");
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {error?.length !== 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh - 10%)]">
          <Lottie
            animationData={ErrorAnimation}
            loop={true}
            className="w-[40%] h-[40%]"
          />
          <p className="text-red-500 font-bold text-lg uppercase">
            {error} data
          </p>
        </div>
      ) : (
        <>
          <button onClick={onDownload}>Download</button>
          <MISReportTableLayout
            tableData={tableData}
            Component={ShowRevenueReports}
            tableRef={revenueTableRef}
          />
        </>
      )}
    </>
  );
};

export default RevenueReport;
<p>REVENUE REPORT</p>;
