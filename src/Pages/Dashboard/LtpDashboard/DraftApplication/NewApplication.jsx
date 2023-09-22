import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BsPlusLg } from "react-icons/bs";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import AllDraftApplication from "./AllDraftApplication";

const NewApplication = () => {
  const { userInfoFromLocalStorage, sendUserDataIntoDB } =
    useContext(AuthContext);

  console.log(userInfoFromLocalStorage());

  const { _id: userID } = userInfoFromLocalStorage();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const date = new Date();

  // get all draft applications
  const { data, refetch, isLoading, isError } = useQuery(
    ["draftApplications"],
    async () => {
      const response = await fetch(
        `http://localhost:5000/draftApplication/${userID}`
      );
      return await response.json();
    }
  );

  console.log(data, "Query");

  useEffect(() => {
    if (isError) {
      console.log("ERROR");
      setError("No data found");
    } else {
      setError("");
    }

    localStorage.removeItem("currentStep");
  }, [isError]);

  // Function to generate a unique number
  const generateApplicationNumber = () => {
    const year = date.getFullYear();
    console.log(year);
    const applicationNo = `1177/1/${year}`;

    return applicationNo;
  };

  // store new application information into the database
  const storeApplicationData = () => {
    const url = `http://localhost:5000/updateDraftApplicationData/${userID}`;

    const data = {
      applicationNo: generateApplicationNumber(),
      buildingInfo: {
        generalInformation: {},
        plotDetails: {},
        scheduleBoundaries: {},
      },
      applicantInfo: { ltpDetails: {}, applicantDetails: {} },
      applicationCheckList: [],
      documents: [],
      drawing: [],
      payment: {
        udaCharge: {},
        gramaPanchayatFee: {},
        labourCessCharge: {},
        greenFeeCharge: {},
      },
      createdDate: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
    };

    sendUserDataIntoDB(url, "PATCH", data)
      .then((response) => {
        console.log(response);
        if (!response.acknowledged) {
          toast.error("Failed to store data");
        } else {
          toast.success("Data stored Successfully");
          // store current application No
          localStorage.setItem(
            "CurrentAppNo",
            JSON.stringify(data.applicationNo)
          );
          navigate("/dashboard/draftApplication/buildingInfo");
        }
      })
      .catch(() => {
        toast.error("Failed to store data");
      });
  };

  // navigate after clicking on the draft application no
  const showDraftApplication = (applicationNo) => {
    console.log(applicationNo);
    localStorage.setItem("CurrentAppNo", JSON.stringify(applicationNo));
    navigate("/dashboard/draftApplication/buildingInfo");
  };

  return (
    <div className="grid grid-cols-1 my-3">
      <div className="flex justify-end my-5 mr-3">
        <button
          className="btn flex bg-[#c0e9e4] transition-all duration-700 hover:bg-[#10ac84] text-[#000] hover:text-[#fff]"
          onClick={storeApplicationData}
        >
          <span className="text-xs">Create a new application</span>
          <BsPlusLg size={20} />
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#2d3436] text-xs md:text-sm text-white hover:bg-[#353b48]">
              <th>Sl.no.</th>
              <th>Application no.</th>
              <th>Owner name</th>
              <th>Phone no.</th>
              <th>Case type</th>
              <th>Village</th>
              <th>Mandal</th>
              <th>Created date</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {/* show draft applications  */}

            {data?.map((applicationData, index) => (
              <AllDraftApplication
                key={index}
                serialNo={index}
                applicationData={applicationData}
                showDraftApplication={showDraftApplication}
              />
            ))}
          </tbody>
        </table>

        {error && (
          <p className="text-lg text-center my-4 font-bold text-error">
            {error}
          </p>
        )}

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default NewApplication;
