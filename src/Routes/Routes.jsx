import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import LtpDashboard from "../Pages/LtpDashboard/LtpDashboard";

import DashboardLayout from "../Layouts/DashboardLayout";
import SubmitApplication from "../Pages/LtpDashboard/SubmitApplication";
import Approved from "../Pages/LtpDashboard/Approved";
import DraftApplication from "../Pages/LtpDashboard/DraftApplication/DraftApplication";
import AppChecklist from "../Pages/LtpDashboard/DraftApplication/AppChecklist/AppChecklist";



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppChecklist />,
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
        children: [
          {
            path: "/ltpDashboard/draftApplication/appChecklist",
            element: <AppChecklist />
          }
        ]
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
