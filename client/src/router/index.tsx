import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import PostLogin from "../pages/PostLogin";
import Home from "../pages/Home";
import AuthenticatedWrapper from "../components/AuthenticatedWrapper";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/post-login",
        element: <PostLogin />,
    },

    {
        path: "/",
        element: (
            <AuthenticatedWrapper>
                <Home />
            </AuthenticatedWrapper>
        )
    },
]);

export function Router() {
    return <RouterProvider router={router} />
}
