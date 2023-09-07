import React from "react";
import { Link } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const NewApplication = () => {
  return (
    <div className="relative my-3">
      <Link className="absolute right-3 border-2 rounded-lg p-1 bg-gray-300" to="/dashboard/draftApplication/buildingInfo">
        <span className="flex items-center">
          <span className="mr-2">Create new</span>
          <VscGitPullRequestCreate color='#2c8877' />
        </span>
      </Link>

      <div className="overflow-x-auto w-full absolute top-9">
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
