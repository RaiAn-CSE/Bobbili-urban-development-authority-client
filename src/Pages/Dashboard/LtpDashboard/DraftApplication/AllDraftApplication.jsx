import React from "react";
import { Link } from "react-router-dom";

const AllDraftApplication = ({ applicationData, showDraftApplication }) => {
  //   console.log(applicationData);
  const { applicationNo, applicantInfo, createdDate } = applicationData;

  return (
    <tr>
      <th>1.</th>
      <td>
        <Link
          className="hover:underline"
          onClick={() => showDraftApplication(applicationNo)}
        >
          {applicationNo}
        </Link>
      </td>
      <td>XXXX XXX</td>
      <td>99xxxxxxx99</td>
      <td>New</td>
      <td>Piridi</td>
      <td>Bobbili</td>
      <td>{createdDate ?? "N/A"}</td>
      <td>
        <button className="btn btn-xs btn-error text-white">Delete</button>
      </td>
    </tr>
  );
};

export default AllDraftApplication;
