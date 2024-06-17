export enum Routes {
  ROOT = "/",
  LOGIN = "/login",
  DASHBOARD = "/dashboard",
  DASHBOARD_USER_REQUESTS = "/dashboard/user_requests",
  DASHBOARD_USERS = "/dashboard/users",
  DASHBOARD_MESSAGING = "/dashboard/messaging",
  DASHBOARD_MESSAGING_USERID = "/dashboard/messaging/:userId",
}

export const menuRoutes = [
  { title: "Requests", route: Routes.DASHBOARD_USER_REQUESTS },
  { title: "Users", route: Routes.DASHBOARD_USERS },
  { title: "Messaging", route: Routes.DASHBOARD_MESSAGING },
];
