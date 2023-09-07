import React from "react";
import { Link } from "react-router-dom";

const NewApplication = () => {
  return (
    <div>
      <p>this is new application</p>
      <Link to="/dashboard/draftApplication/buildingInfo">Next</Link>
    </div>
  );
};

export default NewApplication;
