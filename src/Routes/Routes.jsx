import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import LtpDashboard from "../Pages/LtpDashboard/LtpDashboard";
import DraftApplication from "../Pages/LtpDashboard/DraftApplication";
import DashboardLayout from "../Layouts/DashboardLayout";
import SubmitApplication from "../Pages/LtpDashboard/SubmitApplication";
import Approved from "../Pages/LtpDashboard/Approved";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationChecklist />,
  },


  {
    path: "/ltpDashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/ltpDashboard",
        element: <LtpDashboard />,
      },
      {
        path: "/ltpDashboard/draftApplication",
        element: <DraftApplication />,
      },
      {
        path: "/ltpDashboard/submitApplication",
        element: <SubmitApplication />,
      },
      {
        path: "/ltpDashboard/approved",
        element: <Approved />,
      }
    ]
  },
]);

export default router;
