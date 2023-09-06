import React from "react";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const location = useLocation();

  if (user) {
    return children;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default PrivateRoute;
