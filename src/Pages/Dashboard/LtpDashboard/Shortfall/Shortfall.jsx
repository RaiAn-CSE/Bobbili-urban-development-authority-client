import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import useGetPageWiseApplication from "../../../CustomHook/useGetPageWiseApplication";
import ShowAllShortfallApplications from "./ShowAllShortfallApplications";
import { useNavigate } from "react-router-dom";
import TableLayout from "../../../Components/TableLayout";

const Shortfall = () => {
  const { userInfoFromLocalStorage, showPageBasedOnApplicationType } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // get all applications which are submitted already
  //   const { data, refetch, isLoading, isError } = useQuery(
  //     ["allSubmitApplication"],
  //     async () => {
  //       const response = await fetch(
  //         `http://localhost:5000/allSubmitApplications?id=${
  //           userInfoFromLocalStorage()._id
  //         }`
  //       );
  //       return await response.json();
  //     }
  //   );

  const [data, refetch, isError, isLoading, isSuccess] =
    useGetPageWiseApplication("Shortfall Applications");

  useEffect(() => {
    if (isError) {
      console.log("ERROR");
      setError("No data found");
    } else {
      setError("");
    }
  }, [isError]);

  const tableHeader = [
    "Sl.no.",
    "Application no.",
    "Owner name",
    "Phone no.",
    "Case type",
    "Village",
    "Mandal",
    "Shortfall issued date",
  ];

  const [tableData, setTableData] = useState({});
  const [tableComponentProps, setTableComponentProps] = useState({});

  useEffect(() => {
    setTableData((prev) => {
      const newValue = {
        tableHeader,
        data,
      };
      return { ...prev, ...newValue };
    });
  }, [isSuccess, data]);

  useEffect(() => {
    setTableComponentProps((prev) => {
      const newValue = {
        showPageBasedOnApplicationType,
        navigate,
      };
      return { ...prev, ...newValue };
    });
  }, []);
  return (
    <>
      <TableLayout
        tableData={tableData}
        Component={ShowAllShortfallApplications}
        tableComponentProps={tableComponentProps}
      />

      {data?.length === 0 && (
        <p className="text-lg text-center my-4 font-bold text-error">
          No Application Found
        </p>
      )}

      {error && (
        <p className="text-lg text-center my-4 font-bold text-error">{error}</p>
      )}

      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default Shortfall;
