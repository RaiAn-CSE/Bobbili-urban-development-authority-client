import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Lottie from "lottie-react";
import TableLayout from "../../../Components/TableLayout";
import ShowPlotDetails from "./ShowPlotDetails";
import MISReportTableLayout from "../../../Components/MISReportTableLayout";
import Loading from "../../../Shared/Loading";
import ErrorAnimation from "../../../../assets/ServerError.json";

const PlotDetails = () => {
  const { fetchDataFromTheDb } = useContext(AuthContext);
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      }
    })();
  }, []);

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
        <MISReportTableLayout
          tableData={tableData}
          Component={ShowPlotDetails}
        />
      )}
    </>
  );
};

export default PlotDetails;
