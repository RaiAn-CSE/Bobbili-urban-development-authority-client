import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const UdaRoute = ({ children }) => {
  const role = JSON.parse(
    localStorage.getItem("loggedUser")
  )?.role?.toLowerCase();

  const location = useLocation();

  if (role === "uda") {
    return children;
  } else {
    localStorage.clear();
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default UdaRoute;
