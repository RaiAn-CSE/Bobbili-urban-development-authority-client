import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const NewApplication = () => {
  useEffect(() => {
    localStorage.removeItem("currentStep");
  });

  const ltpUserId=JSON.parse(localStorage.getItem("loggedUser")).userId;
  
  // Function to generate a unique number
  const generateUniqueNumber = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const uniqueNumber = `${timestamp}-${random}-${ltpUserId}`;
    localStorage.removeItem("applicationId"); // Removing the existing item with the key "applicationId"
    localStorage.setItem("applicationId", JSON.stringify(uniqueNumber)); // Store the new value with the key "applicationId" 
  };

  return (
    <div className="grid grid-cols-1 my-3">
      <div className="flex justify-end my-5 mr-3">
        <Link to="/dashboard/draftApplication/buildingInfo">
          <button className="btn flex bg-[#c0e9e4] transition-all duration-700 hover:bg-[#10ac84] text-[#000] hover:text-[#fff]">
            <span onClick={() => generateUniqueNumber()} className="text-xs">Create a new application</span>
            <VscGitPullRequestCreate />
          </button>
        </Link>
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
