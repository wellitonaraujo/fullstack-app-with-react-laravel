import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
//import Users from "../pages/Users";
import NotFounder from "../pages/NotFounder";
import DefaultLayout from "../components/DefaultLayout";
import GuestLayout from "../components/GuestLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },

            {
                path: "/users",
                element: <Users />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFounder />,
    },
]);

export default router;
