import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import LtpDashboard from "../Pages/LtpDashboard/LtpHome/LtpDashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import SubmitApplication from "../Pages/LtpDashboard/Submitted/SubmitApplication";
import Approved from "../Pages/LtpDashboard/Approved/Approved";
import AppChecklist from "../Pages/LtpDashboard/DraftApplication/AppChecklist/AppChecklist";
import PsDashboard from "../Pages/PsDashboard/PsHome/PsDashboard";
import Inward from "../Pages/PsDashboard/InwardApplications/Inward";
import Outward from "../Pages/PsDashboard/OutwardApplications/Outward";
import SearchApplications from "../Pages/PsDashboard/SearchApplications/SearchApplications";
import ReValidation from "../Pages/PsDashboard/ReValidation/ReValidation";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import DraftApplication from "../Pages/LtpDashboard/DraftApplication/DraftApplication";
<<<<<<< HEAD
import Dashboard from "../Pages/Shared/Dashboard";
=======
import BuildingInfo from "../Pages/LtpDashboard/DraftApplication/BuildingInfo";
import LtpDashboardHome from "../Pages/LtpDashboard/LtpDashboardHome";

>>>>>>> raian

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
<<<<<<< HEAD
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
=======
        path: "/ltpDashboard",
        element: <LtpDashboard />,
        children: [
          {
            path: "/ltpDashboard/home",
            element: <LtpDashboardHome />,
          },
          {
            path: "/ltpDashboard/draftApplication",
            element: <DraftApplication />,
            children: [
              {
                path: "/ltpDashboard/draftApplication/buildingInfo",
                element: <BuildingInfo />
              },
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
>>>>>>> raian
  },

  // {
  //   path: "/ltpDashboard",
  //   element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
  //   children: [
  //     {
  //       path: "/ltpDashboard",
  //       element: <LtpDashboard />,
  //       children: [
  //         {
  //           path: "/ltpDashboard/draftApplication",
  //           element: <DraftApplication />,
  //           children: [
  //             {
  //               path: "/ltpDashboard/draftApplication/appChecklist",
  //               element: <AppChecklist />
  //             }
  //           ]
  //         },
  //         {
  //           path: "/ltpDashboard/submitApplication",
  //           element: <SubmitApplication />,
  //         },
  //         {
  //           path: "/ltpDashboard/approved",
  //           element: <Approved />,
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: "/PsDashboard",
  //   element: <PrivateRoute><DashboardLayout /></PrivateRoute>,

  //   children: [
  //     {
  //       path: "/PsDashboard", element: <PsDashboard />,
  //       children:
  //         [
  //           {
  //             path: "/PsDashboard/Inward", element: <Inward />,
  //             children: [{
  //               path: "/PsDashboard/Inward/appChecklist", element: <AppChecklist />
  //             }]
  //           },
  //           { path: "/PsDashboard/Outward", element: <Outward /> },

  //           { path: "/PsDashboard/Search", element: <SearchApplications /> },

  //           { path: "/PsDashboard/ReValidation", element: <ReValidation /> },

  //         ]
  //     }
  //   ]
  // }
]);

export default router;
