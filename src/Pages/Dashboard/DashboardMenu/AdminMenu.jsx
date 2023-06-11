import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";
import { NavLink, } from "react-router-dom";


const AdminMenu = () => {
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
          to="/dashboard/allusers"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap flex gap-2 items-center"><FaUsers /> All Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/allclasses"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap flex gap-2 item-center"><GiLoveSong />All Classes</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default AdminMenu;
