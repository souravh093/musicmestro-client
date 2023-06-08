import React from "react";
import { Link, NavLink } from "react-router-dom";

const InstructorMenu = () => {
  return (
    <ul className="space-y-2 font-medium">
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="ml-3">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/allusers"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap">Add Users</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default InstructorMenu;
