import React from "react";
import { useLocation } from "react-router-dom";

const ResubmitApplication = () => {
  const { appNo } = useLocation()?.state;

  console.log(appNo);
  return (
    <div>
      <p>Resubmit application</p>
    </div>
  );
};

export default ResubmitApplication;
