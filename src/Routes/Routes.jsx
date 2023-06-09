import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddClasses from "../Pages/Dashboard/DashboardMenu/AddClasses";
import InstructorAddedClass from "../Pages/Dashboard/DashboardMenu/InstructorAddedClass";
import AllClasses from "../Pages/Dashboard/DashboardMenu/AllClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "allusers",
        element: <AllUsers />
      },
      {
        path: "allclasses",
        element: <AllClasses />
      },
      {
        path: "addclasses",
        element: <AddClasses />
      },
      {
        path: "addedclasses",
        element: <InstructorAddedClass />
      }
    ]
  }
]);

export default router;
