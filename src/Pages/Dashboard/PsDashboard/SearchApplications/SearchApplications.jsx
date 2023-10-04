import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ShowSubmittedApplication from "../../LtpDashboard/Submitted/ShowSubmittedApplication";
import Inward from "../InwardApplications/Inward";

function SearchApplications() {
  // const [error, setError] = useState("");

  // const navigate = useNavigate();

  // // get all applications which are submitted already
  // const { data, refetch, isLoading, isError } = useQuery(
  //   ["allSubmitApplication"],
  //   async () => {
  //     const response = await fetch(`http://localhost:5000/submitApplications`);
  //     return await response.json();
  //   }
  // );

  // useEffect(() => {
  //   if (isError) {
  //     console.log("ERROR");
  //     setError("No data found");
  //   } else {
  //     setError("");
  //   }
  // }, [isError]);

  // navigate after clicking on the draft application no
  // const showDraftApplication = (applicationNo) => {
  //   console.log(applicationNo);
  //   localStorage.setItem("CurrentAppNo", JSON.stringify(applicationNo));
  //   navigate("/dashboard/draftApplication/buildingInfo");
  // };

  return (
    <>
      <Inward />
    </>
  );
}

export default SearchApplications;
