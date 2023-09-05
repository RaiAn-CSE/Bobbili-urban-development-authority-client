import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import ApplicationChecklist from "../Pages/LPT/Darft-Application/Application-Checklist/ApplicationChecklist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationChecklist />,
  },
]);

export default router;
