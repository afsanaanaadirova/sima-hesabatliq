import { createBrowserRouter } from "react-router-dom";
import Credential from "../pages/credentials/credential";
import Certificate from "../pages/certificate/certificate";
import App from "../App";
import Packages from "../pages/package/package";
import AddCustomer from "../pages/add-customer/add-customer";
import Error404 from "../pages/error404/blogerror";
import Logout from "../pages/logout/logout";
import Report from "../pages/report/report";
import ReportApp from "../pages/report-app/report-app";
import Organization from "../pages/organization/organization";
import AddOrganization from "../pages/add-organization/add-organization";
import Edit from "../pages/edit/edit";
import ReportAppDetail from "../pages/report-app-detail/report-app-detail";
import Register from "../components/layout/register/register";
import Login from "../components/layout/login/login";

let routes = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Report />,
        path: "/",
      },
      {
        index: true,
        path: "/report",
        element: <Report />,
      },
      {
        index: true,
        path: "/report/app",
        element: <ReportApp />,
      },
      {
        index: true,
        path: "/report/app/detail",
        element: <ReportAppDetail />,
      },
      {
        index: true,
        path: "/certificate",
        element: <Certificate />,
      },
      {
        index: true,
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        index: true,
        path: "/credentials",
        element: <Credential />,
      },
      {
        index: true,
        path: "/packages",
        element: <Packages />,
      },
      {
        index: true,
        path: "/organization",
        element: <Organization />,
      },
      {
        index: true,
        path: "/add-customer",
        element: <AddCustomer />,
      },
      {
        index: true,
        path: "/add-organization",
        element: <AddOrganization />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
export default routes;

export const browserRouter = createBrowserRouter(routes);
