import React from "react";
import { NavLink } from "react-router-dom";
import { BsCartCheckFill } from 'react-icons/bs';
import { AiFillDashboard } from 'react-icons/ai';
import { MdDone, MdPayment } from 'react-icons/md';

import { useCart } from "../../../hook/useCart";

const StudentMenu = () => {
  const [carts] = useCart()
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
          <span className="flex-1 ml-3 whitespace-nowrap flex items-center gap-2"><AiFillDashboard /> Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/studentclasses"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap flex items-center gap-2"><BsCartCheckFill /> Classes</span>
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium rounded-full bg-blue-900 text-blue-300">{carts.length || 0}</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/studentinrollclass"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap flex items-center gap-2"><MdDone /> My enrolled Classes</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/paymenthistory"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive ? "border-2 text-gray-800" : "text-gray-600"
            }`
          }
        >
          <span className="flex-1 ml-3 whitespace-nowrap flex items-center gap-2"><MdPayment />Payment History</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default StudentMenu;
