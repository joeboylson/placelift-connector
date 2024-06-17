import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login";
import AuthenticatedWrapper from "../components/AuthenticatedWrapper";
import UserRequestsTable from "../pages/UserRequestsTable";
import UsersTable from "../pages/UsersTable";
import Messaging from "../pages/Messaging";
import { Routes } from "../enums/routes";

const router = createBrowserRouter([
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
  {
    path: Routes.ROOT,
    element: <Navigate to="/dashboard/user_requests" />,
  },
  {
    path: Routes.DASHBOARD,
    element: <Navigate to="/dashboard/user_requests" />,
  },
  {
    path: Routes.DASHBOARD_USER_REQUESTS,
    element: (
      <AuthenticatedWrapper>
        <UserRequestsTable />
      </AuthenticatedWrapper>
    ),
  },
  {
    path: Routes.DASHBOARD_USERS,
    element: (
      <AuthenticatedWrapper>
        <UsersTable />
      </AuthenticatedWrapper>
    ),
  },
  {
    path: Routes.DASHBOARD_MESSAGING,
    element: (
      <AuthenticatedWrapper>
        <Messaging />
      </AuthenticatedWrapper>
    ),
  },
  {
    path: Routes.DASHBOARD_MESSAGING_USERID,
    element: (
      <AuthenticatedWrapper>
        <Messaging />
      </AuthenticatedWrapper>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
