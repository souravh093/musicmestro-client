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
import DashboardHome from "../Pages/Dashboard/DashboardMenu/DashboardHome";
import Classes from "../Pages/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors";
import StudentBookedClasses from "../Pages/Dashboard/DashboardMenu/StudentBookedClasses";

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
      }, 
      {
        path: "/classes",
        element: <Classes />
      },
      {
        path: "/instructors",
        element: <Instructors />
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />
      },
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
      },
      {
        path: "studentclasses",
        element: <StudentBookedClasses />
      }
    ]
  }
]);

export default router;
