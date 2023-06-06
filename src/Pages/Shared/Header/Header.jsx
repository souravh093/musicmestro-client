import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import Container from "../../../components/Shared/Container/Container";
import ProfileImage from "./ProfileImage/ProfileImage";

const Header = () => {
  // TODO-it come from authProvider
  const user = false;
  const navigation = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">Instructors</NavLink>
      </li>
      <li>
        <NavLink to="/">Classes</NavLink>
      </li>
    </>
  );

  return (
    <div className="py-2 border-b-2">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <Logo />
          </div>
          <div className="flex list-none gap-10">{navigation}</div>
          <div className="flex gap-10 list-none">
            <div className="flex gap-4 items-center">
              {user ? (
                <div className="flex items-center gap-2">
                  <li>
                    <NavLink>Dashboard</NavLink>
                  </li>
                  <li>
                    <ProfileImage />
                  </li>
                </div>
              ) : (
                <li>
                  <NavLink to="/">Login</NavLink>
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
