import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import Container from "../../../components/Shared/Container/Container";
import ProfileImage from "./ProfileImage/ProfileImage";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useCart } from "../../../hook/useCart";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [carts] = useCart();

  const signOutUser = () => {
    logoutUser();
  };

  const navigation = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/instructors">Instructors</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
    </>
  );

  return (
    <div className="py-2 border-b-2">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex list-none gap-10">{navigation}</div>
          <div className="flex gap-10 list-none">
            <div className="flex gap-4 items-center">
              {user ? (
                <div className="flex items-center gap-2">
                  <li>
                    <div>
                      <Link to="/dashboard/studentclasses" className="btn btn-ghost hover:bg-violet-500/50 border-none btn-circle">
                        <div className="indicator">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span className="badge badge-sm indicator-item bg-violet-700 text-white">
                            {carts?.length || 0}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <ProfileImage />
                  </li>
                  <li>
                    <button onClick={signOutUser}>Logout</button>
                  </li>
                </div>
              ) : (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
              <button className="bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 text-white font-medium py-2 px-4 rounded">
                Dark mode
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
