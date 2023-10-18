import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Shared/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DraftApplication from "../Pages/Dashboard/LtpDashboard/DraftApplication/DraftApplication";
import NewApplication from "../Pages/Dashboard/LtpDashboard/DraftApplication/NewApplication";
import BuildingInfo from "../Pages/Dashboard/LtpDashboard/DraftApplication/BuildingInfo";
import ApplicantInfo from "../Pages/Dashboard/LtpDashboard/DraftApplication/ApplicantInfo";
import AppChecklist from "../Pages/Dashboard/LtpDashboard/DraftApplication/AppChecklist";
import Documents from "../Pages/Dashboard/LtpDashboard/DraftApplication/Documents";
import Drawing from "../Pages/Dashboard/LtpDashboard/DraftApplication/Drawing";
import Payment from "../Pages/Dashboard/LtpDashboard/DraftApplication/Payment";
import SubmitApplication from "../Pages/Dashboard/LtpDashboard/Submitted/SubmitApplication";
import AddUser from "../Pages/Dashboard/Admin/Admin2/AddUser";
import AllUsers from "../Pages/Dashboard/Admin/Admin2/AllUsers";
import Error from "../Pages/Shared/Error";
import MainLayout from "../Layouts/MainLayout";
import ApplicationSearch from "../Pages/Main/ApplicationSearch/ApplicationSearch";
import OnlinePayment from "../Pages/Main/OnlinePayment/OnlinePayment";
import ListOfLTP from "../Pages/Main/ListOfLTP/ListOfLTP";
import Inward from "../Pages/Dashboard/PsDashboard/InwardApplications/Inward";
import SiteInspection from "./../Pages/Dashboard/PsDashboard/InwardApplications/SiteInspection";
import SearchApplications from "../Pages/Dashboard/PsDashboard/SearchApplications/SearchApplications";
import Outward from "../Pages/Dashboard/PsDashboard/OutwardApplications/Outward";
import ReValidation from "../Pages/Dashboard/PsDashboard/ReValidation/ReValidation";
import Approved from "../Pages/Dashboard/LtpDashboard/Approved/Approved";
import Shortfall from "../Pages/Dashboard/LtpDashboard/Shortfall/Shortfall";
import DefaultDrawingFormat from "../Pages/Main/DefaultDrawingFormat/DefaultDrawingFormat";
import PrivacyPolicy from "../Pages/Main/PrivacyPolicy/PrivacyPolicy";
import DemoVideos from "../Pages/Main/DemoVideos/DemoVideos";
import Home from "../Pages/Main/Home/Home";
import Reports from "../Pages/Main/Reports/Reports";
import Location from "../Pages/Dashboard/UDA/Location";
import UpdateProfile from "../Pages/Shared/UpdateProfile";
import RejectedApplications from "../Pages/Dashboard/LtpDashboard/RejectedApplication/RejectedApplications";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <ApplicationSearch />,
          },
          {
            path: "/onlinePayment",
            element: <OnlinePayment />,
          },
          {
            path: "/listOfLTP",
            element: <ListOfLTP />,
          },
          {
            path: "/demoVideos",
            element: <DemoVideos />,
          },
          {
            path: "/privacyPolicy",
            element: <PrivacyPolicy />,
          },
          {
            path: "/defaultDrawingFormat",
            element: <DefaultDrawingFormat />,
          },
        ],
      },
      {
        path: "/statistics",
        element: <Reports />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <Error />,
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
        path: "/dashboard/addUser",
        element: (
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allUser",
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/draftApplication",
        element: (
          <PrivateRoute>
            {" "}
            <DraftApplication />{" "}
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/draftApplication",
            element: (
              <PrivateRoute>
                {" "}
                <NewApplication />{" "}
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
            element: (
              <PrivateRoute>
                <ApplicantInfo />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/applicationChecklist",
            element: (
              <PrivateRoute>
                <AppChecklist />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/documents",
            element: (
              <PrivateRoute>
                <Documents />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/drawing",
            element: (
              <PrivateRoute>
                <Drawing />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/payment",
            element: (
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/siteInspection",
            element: (
              <PrivateRoute>
                <SiteInspection />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/dashboard/submitApplication",
        element: (
          <PrivateRoute>
            <SubmitApplication />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/approvedApplication",
        element: (
          <PrivateRoute>
            <Approved />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/shortfallApplication",
        element: (
          <PrivateRoute>
            <Shortfall />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/rejectedApplications",
        element: (
          <PrivateRoute>
            <RejectedApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/inWard",
        element: (
          <PrivateRoute>
            <Inward />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/outWard",
        element: (
          <PrivateRoute>
            <Outward />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/searchApplication",
        element: (
          <PrivateRoute>
            <SearchApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reValidation",
        element: (
          <PrivateRoute>
            <ReValidation />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/location",
        element: <Location />,
      },
      {
        path: "/dashboard/profile",
        element: <UpdateProfile />,
      },
    ],
  },
]);

export default router;
