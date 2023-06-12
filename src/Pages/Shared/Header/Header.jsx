import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import Container from "../../../components/Shared/Container/Container";
import ProfileImage from "./ProfileImage/ProfileImage";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useCart } from "../../../hook/useCart";
import { motion } from "framer-motion";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaAlignJustify } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { user, logoutUser, adminRole, instructorRole } =
    useContext(AuthContext);
  const [carts] = useCart();

  const signOutUser = () => {
    logoutUser();
  };

  const navigation = (
    <>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-violet-700 ${
              isActive
                ? "border-b-2 text-violet-700 border-violet-800"
                : "text-gray-600"
            }`
          }
        >
          Home
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <NavLink
          to="/instructors"
          className={({ isActive }) =>
            `hover:text-violet-700 ${
              isActive
                ? "border-b-2 border-violet-800 text-violet-700"
                : "text-gray-600"
            }`
          }
        >
          Instructors
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            `hover:text-violet-700 ${
              isActive
                ? "border-b-2 border-violet-800 text-violet-700"
                : "text-gray-600"
            }`
          }
        >
          Classes
        </NavLink>
      </motion.li>
    </>
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="py-2 border-b-2 fixed dark:bg-primary bg-white z-10 w-full">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden md:flex list-none gap-10">{navigation}</div>
          <div className="flex gap-10 list-none">
            <div className="flex gap-4 items-center">
              {user ? (
                <div className="md:flex hidden items-center gap-2">
                  {!adminRole && !instructorRole && (
                    <li>
                      <div>
                        <Link
                          to="/dashboard/studentclasses"
                          className="btn btn-ghost hover:bg-violet-500/50 border-none btn-circle"
                        >
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
                  )}
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </motion.li>
                  <motion.li
                    className="tooltip tooltip-bottom transition"
                    data-tip={user.displayName}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ProfileImage />
                  </motion.li>
                  <li className="btn bg-violet-700 text-white hover:bg-violet-600 flex items-center gap-1">
                    <button onClick={signOutUser}>Logout</button>
                  </li>
                </div>
              ) : (
                <motion.li
                  className="md:block hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `btn bg-violet-700 text-white hover:bg-violet-700 flex items-center gap-1 ${
                        isActive
                          ? "border-b-2 border-violet-800 text-violet-700"
                          : "text-gray-600"
                      }`
                    }
                    to="/login"
                  >
                    Login
                    <RiLoginCircleFill className="text-xl" />
                  </NavLink>
                </motion.li>
              )}
              <button
                onClick={() => setToggle(!toggle)}
                className="md:hidden block transition"
              >
                {toggle ? (
                  <AiOutlineClose className="text-2xl" />
                ) : (
                  <FaAlignJustify className="text-2xl" />
                )}

                {toggle && (
                  <div className="md:hidden block absolute right-0 px-20 py-10 border border-violet-500 shadow-md top-[84px] bg-white">
                    <div>{navigation}</div>
                    <div>
                      {user ? (
                        <div className="flex flex-col items-center gap-2">
                          {!adminRole && !instructorRole && (
                            <li>
                              <div>
                                <Link
                                  to="/dashboard/studentclasses"
                                  className="btn btn-ghost hover:bg-violet-500/50 border-none btn-circle"
                                >
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
                          )}
                          <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <NavLink to="/dashboard">Dashboard</NavLink>
                          </motion.li>
                          <motion.li
                            className="tooltip tooltip-bottom transition"
                            data-tip={user.displayName}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ProfileImage />
                          </motion.li>
                          <li className="btn bg-violet-700 text-white hover:bg-violet-600 flex items-center gap-1">
                            <button onClick={signOutUser}>Logout</button>
                          </li>
                        </div>
                      ) : (
                        <motion.li
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <NavLink
                            className={({ isActive }) =>
                              `btn bg-violet-700 text-white hover:bg-violet-700 flex items-center gap-1 ${
                                isActive
                                  ? "border-b-2 border-violet-800 text-violet-700"
                                  : "text-gray-600"
                              }`
                            }
                            to="/login"
                          >
                            Login
                            <RiLoginCircleFill className="text-xl" />
                          </NavLink>
                        </motion.li>
                      )}
                    </div>
                  </div>
                )}
              </button>
              <label className="swap swap-rotate">
                <input onChange={handleToggle} type="checkbox" />
                <svg
                  className="swap-on fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-off fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
