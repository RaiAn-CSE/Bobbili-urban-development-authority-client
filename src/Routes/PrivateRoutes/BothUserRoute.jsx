import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const BothUserRoute = ({ children }) => {
  const role = JSON.parse(
    localStorage.getItem("loggedUser")
  )?.role?.toLowerCase();

  const location = useLocation();

  if (role === "ltp" || role === "ps") {
    return children;
  } else {
    localStorage.clear();
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default BothUserRoute;
