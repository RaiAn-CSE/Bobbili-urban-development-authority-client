import React from "react";
import { Link } from "react-router-dom";

const Drawing = () => {
  return (
    <div>
      <p>This is drawing page</p>
      <Link to="/dashboard/draftApplication/payment">
        <button class="btn">Save And Continue</button>
      </Link>
    </div>
  );
};

export default Drawing;
