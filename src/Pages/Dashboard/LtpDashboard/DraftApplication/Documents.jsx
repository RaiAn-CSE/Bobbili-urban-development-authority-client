import React from "react";
import { Link } from "react-router-dom";

const Documents = () => {
  return (
    <div>
      <p>This is document page</p>
      <Link to="/dashboard/draftApplication/drawing">
        <button class="btn">Save And Continue</button>
      </Link>
    </div>
  );
};

export default Documents;
