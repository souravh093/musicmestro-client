import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Provider/AuthProvider";
import AdminMenu from "./DashboardMenu/AdminMenu";
import InstructorMenu from "./DashboardMenu/InstructorMenu";
import StudentMenu from "./DashboardMenu/StudentMenu";

const Dashboard = () => {
  const { user, adminRole, instructorRole, logoutUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const signOutUser = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/" className="flex ml-2 md:mr-24">
                <img src={logo} className="h-8 mr-3" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  MusicMaestro
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-gray-100">{user?.displayName}</h2>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4  focus:ring-gray-600"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.photoURL}
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-gray-800 border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between bg-gray-800">
          <div>
            {adminRole ? (
              <AdminMenu />
            ) : instructorRole ? (
              <InstructorMenu />
            ) : (
              <StudentMenu />
            )}
          </div>
          <ul className="space-y-2 font-medium ">
            {!adminRole &&
              (!instructorRole && (
                <li>
                  <NavLink
                    className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700`}
                  >
                    <span className="ml-3">Select Classes</span>
                  </NavLink>
                </li>
              ))}
            <li>
              <NavLink
                onClick={signOutUser}
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700`}
              >
                <button>
                  <span className="ml-3">Logout</span>
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 mt-14 sm:ml-64 text-black">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
