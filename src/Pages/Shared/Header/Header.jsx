import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import Container from "../../../components/Shared/Container/Container";
import ProfileImage from "./ProfileImage/ProfileImage";
import { AuthContext } from "../../../Provider/AuthProvider";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const signOutUser = () => {
    logoutUser()
  }

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
              <button
                className="bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 text-white font-medium py-2 px-4 rounded"
                // onClick={onClick}
              >
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
