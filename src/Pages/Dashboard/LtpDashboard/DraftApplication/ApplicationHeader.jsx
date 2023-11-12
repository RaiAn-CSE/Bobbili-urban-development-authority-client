import React from "react";

function ApplicationHeader() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed
  const year = currentDate.getFullYear();
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  return (
    <div className="my-5">
      <div className="text-center font-extrabold ">
        <h2 className="mt-3 underline text-2xl">
          BUILDING PERMISSION APPLICATION
        </h2>
      </div>
      <div className="mt-6 flex justify-between">
        <p className="font-bold">
          Application No.{" "}
          <span className="text-green-600">{applicationNo}</span>
        </p>
        <p>
          {" "}
          <span className="font-bold">Date of Submission:</span>{" "}
          <span className="text-green-600 font-bold">{`${day}-${month}-${year}`}</span>
        </p>
      </div>
      <div className="mt-5 font-bold">
        <p>
          Sub: Building Application for grant of permission for Construction of
          Building Permission Notice u/s 209 & 227 of APM Act, 1965 / 428 & 433
          of HMC Act, 1955.
        </p>
      </div>
    </div>
  );
}

export default ApplicationHeader;
