import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import LtpDashboard from "../Pages/LtpDashboard/LtpHome/LtpDashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import SubmitApplication from "../Pages/LtpDashboard/Submitted/SubmitApplication";
import Approved from "../Pages/LtpDashboard/Approved/Approved";
import AppChecklist from "../Pages/LtpDashboard/DraftApplication/AppChecklist/AppChecklist";
import PsDashboard from "../Pages/PsDashboard/PsHome/PsDashboard"
import Inward from "../Pages/PsDashboard/InwardApplications/Inward";
import Outward from "../Pages/PsDashboard/OutwardApplications/Outward";
import SearchApplications from "../Pages/PsDashboard/SearchApplications/SearchApplications";
import ReValidation from "../Pages/PsDashboard/ReValidation/ReValidation";




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
    element: <DashboardLayout />,
    children: [
      {
        path: "/PsDashboard", element: <PsDashboard />,
        children:
          [
            { path: "/PsDashboard/Inward", element: <Inward /> },
            { path: "/PsDashboard/Outward", element: <Outward/> },
            { path: "/PsDashboard/Search", element: <SearchApplications/> },
            { path: "/PsDashboard/ReValidation", element: <ReValidation/> },
            
          ]
      }
    ]
  }
]);

export default router;
