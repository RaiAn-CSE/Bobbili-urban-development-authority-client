import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import LtpDashboard from "../Pages/LtpDashboard/LtpHome/LtpDashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import SubmitApplication from "../Pages/LtpDashboard/Submitted/SubmitApplication";
import Approved from "../Pages/LtpDashboard/Approved/Approved";
import DraftApplication from "../Pages/LtpDashboard/DraftApplication/DraftApplication";
import AppChecklist from "../Pages/LtpDashboard/DraftApplication/AppChecklist/AppChecklist";
import Inward from "../Pages/PsDashboard/InwardApplications/Inward";
import Outward from "../Pages/PsDashboard/OutwardApplications/Outward";
import SearchApplications from "../Pages/PsDashboard/SearchApplications/SearchApplications";
import ReValidation from "../Pages/PsDashboard/ReValidation/ReValidation";
import PsDashboard from "../Pages/PsDashboard/PsHome/PsDashboard";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },


  {
    path: "/ltpDashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/ltpDashboard",
        element: <LtpDashboard />,
        children: [
          {
            path: "/ltpDashboard/draftApplication",
            element: <LtpDashboard />,
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
      }
    ]
  },
  {
    path: "/PsDashboard",
    path: <DashboardLayout />,
    children: [
      {
        path: "/PsDashboard",
        element: <PsDashboard />
      },
      {
        path: "/PsDashboard/Inward",
        element: <Inward />,
        children: [
          {
            path: "/PsDashboard/Inward/appCheckList",
            element: <AppChecklist />
          }
        ]
      },
      { path: "/PsDashboard/Outward", element: <Outward /> },
      { path: "/PsDashboard/Search", element: <SearchApplications /> },
      { path: "/PsDashboard/Re-validation", element: <ReValidation /> }
    ]
  }
]);

export default router;
