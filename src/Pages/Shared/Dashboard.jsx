import React from "react";
import LtpDashboard from "../Dashboard/LtpDashboard/Home/LtpDashboard";
import PsDashboard from "../Dashboard/PsDashboard/Home/PsDashboard";
import FirstAdminHome from "../Dashboard/Admin/Admin1/FirstAdminHome";
import SecondAdminHome from "../Dashboard/Admin/Admin2/SecondAdminHome";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <>
      {(user?.role === "LTP" && <LtpDashboard />) ||
        (user?.role === "PS" && <PsDashboard />) ||
        (user?.role === "Admin1" && <FirstAdminHome />) ||
        (user?.role == "Admin2" && <SecondAdminHome />)}
    </>
  );
};

export default Dashboard;
