import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PsRoute = ({ children }) => {
  const role = JSON.parse(
    localStorage.getItem("loggedUser")
  )?.role?.toLowerCase();

  const location = useLocation();

  if (role === "ps") {
    return children;
  } else {
    localStorage.clear();
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default PsRoute;
