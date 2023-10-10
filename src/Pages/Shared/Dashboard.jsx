import React from "react";
import LtpDashboard from "../Dashboard/LtpDashboard/Home/LtpDashboard";
import PsDashboard from "../Dashboard/PsDashboard/Home/PsDashboard";
import FirstAdminHome from "../Dashboard/Admin/Admin1/FirstAdminHome";
import SecondAdminHome from "../Dashboard/Admin/Admin2/SecondAdminHome";
import SuperAdminHome from "../Dashboard/Admin/SuperAdmin/SuperAdminHome";
import UdaDashboard from "../Dashboard/UDA/UdaDashboard";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <>
      {(user?.role === "LTP" && <LtpDashboard />) ||
        (user?.role === "PS" && <PsDashboard />) ||
        (user?.role === "UDA" && <UdaDashboard />) ||
        ((user?.role === "Admin1" ||
          user?.role == "Admin2" ||
          user?.role == "Super Admin") && <AdminDashboard />)}
    </>
  );
};

export default Dashboard;
