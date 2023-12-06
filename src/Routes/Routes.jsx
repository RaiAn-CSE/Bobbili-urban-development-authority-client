import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Shared/Dashboard";
import PrivateRoute from "../Routes/PrivateRoutes/PrivateRoute";
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
import UpdateLocation from "../Pages/Dashboard/Admin/SuperAdmin/UpdateLocation";
import PlotDetails from "../Pages/Dashboard/UDA/PlotDetails/PlotDetails";
import RevenueReport from "../Pages/Dashboard/UDA/RevenueReport/RevenueReport";
import VerificationStatus from "../Pages/Dashboard/UDA/VerificationStatus/VerificationStatus";
import ResubmitApplication from "../Pages/Dashboard/LtpDashboard/Resubmit/ResubmitApplication";
import AdminRoute from "./PrivateRoutes/AdminRoute";
import BothUserRoute from "./PrivateRoutes/BothUserRoute";
import LtpRoute from "./PrivateRoutes/LtpRoute";
import PsRoute from "./PrivateRoutes/PsRoute";
import UdaRoute from "./PrivateRoutes/UdaRoute";
import CustomerSupport from "../Pages/Dashboard/Admin/Admin1/CustomerSupport/CustomerSupport";

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
          <AdminRoute>
            <AddUser />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allUser",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateLocation",
        element: (
          <AdminRoute>
            <UpdateLocation />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/support",
        element: (
          <AdminRoute>
            <CustomerSupport />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/draftApplication",
        element: (
          <BothUserRoute>
            {" "}
            <DraftApplication />{" "}
          </BothUserRoute>
        ),
        children: [
          {
            path: "/dashboard/draftApplication",
            element: (
              <LtpRoute>
                {" "}
                <NewApplication />{" "}
              </LtpRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/buildingInfo",
            element: (
              <BothUserRoute>
                <BuildingInfo />
              </BothUserRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/applicantInfo",
            element: (
              <BothUserRoute>
                <ApplicantInfo />
              </BothUserRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/applicationChecklist",
            element: (
              <BothUserRoute>
                <AppChecklist />
              </BothUserRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/documents",
            element: (
              <BothUserRoute>
                <Documents />
              </BothUserRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/drawing",
            element: (
              <BothUserRoute>
                <Drawing />
              </BothUserRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/payment",
            element: (
              <BothUserRoute>
                <Payment />
              </BothUserRoute>
            ),
          },
          {
            path: "/dashboard/draftApplication/siteInspection",
            element: (
              <PsRoute>
                <SiteInspection />
              </PsRoute>
            ),
          },
        ],
      },
      {
        path: "/dashboard/submitApplication",
        element: (
          <LtpRoute>
            <SubmitApplication />
          </LtpRoute>
        ),
      },
      {
        path: "/dashboard/approvedApplication",
        element: (
          <LtpRoute>
            <Approved />
          </LtpRoute>
        ),
      },
      {
        path: "/dashboard/shortfallApplication",
        element: (
          <LtpRoute>
            <Shortfall />
          </LtpRoute>
        ),
      },
      {
        path: "/dashboard/rejectedApplications",
        element: (
          <LtpRoute>
            <RejectedApplications />
          </LtpRoute>
        ),
      },
      {
        path: "/dashboard/resubmitApplication",
        element: (
          <LtpRoute>
            <ResubmitApplication />
          </LtpRoute>
        ),
      },
      {
        path: "/dashboard/inWard",
        element: (
          <PsRoute>
            <Inward />
          </PsRoute>
        ),
      },
      {
        path: "/dashboard/outWard",
        element: (
          <PsRoute>
            <Outward />
          </PsRoute>
        ),
      },
      {
        path: "/dashboard/searchApplication",
        element: (
          <PsRoute>
            <SearchApplications />
          </PsRoute>
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
        path: "/dashboard/plotDetails",
        element: (
          <UdaRoute>
            <PlotDetails />
          </UdaRoute>
        ),
      },
      {
        path: "/dashboard/revenueReport",
        element: (
          <UdaRoute>
            <RevenueReport />
          </UdaRoute>
        ),
      },
      {
        path: "/dashboard/verificationStatus",
        element: (
          <UdaRoute>
            <VerificationStatus />
          </UdaRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
