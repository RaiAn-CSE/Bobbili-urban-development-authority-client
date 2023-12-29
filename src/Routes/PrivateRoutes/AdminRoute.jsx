import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = JSON.parse(
    localStorage.getItem("loggedUser")
  )?.role?.toLowerCase();

  const condition =
    role === "admin1" || role === "admin2" || role === "super admin";

  const location = useLocation();

  if (condition) {
    return children;
  } else {
    localStorage.clear();
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default AdminRoute;
