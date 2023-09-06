import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Shared/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddUser from "../Pages/Admin/Admin2/AddUser";
import UpdateUser from "../Pages/Admin/Admin2/UpdateUser";
import DeleteUser from "../Pages/Admin/Admin2/DeleteUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/home",
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
        path: "/dashboard/updateUser",
        element: (
          <PrivateRoute>
            <UpdateUser />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/removeUser",
        element: (
          <PrivateRoute>
            <DeleteUser />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
