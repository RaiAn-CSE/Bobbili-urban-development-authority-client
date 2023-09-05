import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import LtpDashboard from "../Pages/LtpDashboard/LtpDashboard";
import DraftApplication from "../Pages/LtpDashboard/DraftApplication";
import DashboardLayout from "../Layouts/DashboardLayout";

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
      },
      {
        path: "/ltpDashboard/draftApplication",
        element: <DraftApplication />,
      }
    ]
  },
]);

export default router;
