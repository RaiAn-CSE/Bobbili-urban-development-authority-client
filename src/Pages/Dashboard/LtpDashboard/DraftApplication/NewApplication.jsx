import React from "react";
import { Link } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const NewApplication = () => {
  return (
    <div className="grid grid-cols-1 my-3">
      <Link className="flex justify-end mb-3 mr-3" to="/dashboard/draftApplication/buildingInfo">
        <button className="btn flex bg-[#c0e9e4] hover:bg-[#10ac84] text-[#000] hover:text-[#fff]">
          <span>Create new</span>
          <VscGitPullRequestCreate />
        </button>
      </Link>

      <div className="w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
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
            <tr className="hover">
              <th>1.</th>
              <td>1177/XX/001/BUDA/2023</td>
              <td>XXXX XXX</td>
              <td>99xxxxxxx99</td>
              <td>New</td>
              <td>Piridi</td>
              <td>Bobbili</td>
              <td>07-04-2023</td>
              <td><button className="btn btn-error">Delete</button></td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2.</th>
              <td>1177/XX/001/BUDA/2023</td>
              <td>XXXX XXX</td>
              <td>99xxxxxxx99</td>
              <td>New</td>
              <td>Piridi</td>
              <td>Bobbili</td>
              <td>07-04-2023</td>
              <td><button className="btn btn-error">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewApplication;
