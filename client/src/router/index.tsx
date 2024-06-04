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

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard/user-requests" />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/dashboard/user-requests" />,
  },
  {
    path: "/dashboard/user-requests",
    element: (
      <AuthenticatedWrapper>
        <UserRequestsTable />
      </AuthenticatedWrapper>
    ),
  },
  {
    path: "/dashboard/users",
    element: (
      <AuthenticatedWrapper>
        <UsersTable />
      </AuthenticatedWrapper>
    ),
  },
  {
    path: "/dashboard/messaging",
    element: (
      <AuthenticatedWrapper>
        <Messaging />
      </AuthenticatedWrapper>
    ),
  },
  {
    path: "/dashboard/messaging/:userId",
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
