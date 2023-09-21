import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { BsPlusLg } from "react-icons/bs";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const NewApplication = () => {
  const { userInfoFromLocalStorage, sendUserDataIntoDB } =
    useContext(AuthContext);

  console.log(userInfoFromLocalStorage());

  const { _id: userID } = userInfoFromLocalStorage();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("currentStep");
  });

  // Function to generate a unique number
  const generateApplicationNumber = () => {
    const year = new Date().getFullYear();
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
            {/* row 1 */}
            <tr>
              <th>1.</th>
              <td>1177/XX/001/BUDA/2023</td>
              <td>XXXX XXX</td>
              <td>99xxxxxxx99</td>
              <td>New</td>
              <td>Piridi</td>
              <td>Bobbili</td>
              <td>07-04-2023</td>
              <td>
                <button className="btn btn-xs btn-error text-white">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewApplication;
