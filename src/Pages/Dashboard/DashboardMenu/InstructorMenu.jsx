import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillDashboard, AiFillFileAdd } from 'react-icons/ai';
import { GiLoveSong } from 'react-icons/gi';


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
          <span className="ml-3 flex gap-2 items-center"><AiFillDashboard  /> Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/addclasses"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap flex gap-2 items-center"><AiFillFileAdd /> Add Class</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/addedclasses"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap flex gap-2 items-center"><GiLoveSong />My Classes</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default InstructorMenu;
