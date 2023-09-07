import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Shared/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DraftApplication from "../Pages/Dashboard/LtpDashboard/DraftApplication/DraftApplication";
import NewApplication from "../Pages/Dashboard/LtpDashboard/DraftApplication/NewApplication";
import BuildingInfo from "../Pages/Dashboard/LtpDashboard/DraftApplication/BuildingInfo";

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
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/draftApplication",
        element: (
          <PrivateRoute>
            <DraftApplication />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/draftApplication",
            element: (
              <PrivateRoute>
                <NewApplication />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/buildingInfo",
            element: (
              <PrivateRoute>
                <BuildingInfo />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/applicantInfo",
            element: <PrivateRoute></PrivateRoute>,
          },
        ],
      },
    ],
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
