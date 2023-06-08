import React from "react";
import { Link } from "react-router-dom";

const StudentMenu = () => {
  return (
    <ul className="space-y-2 font-medium">
      <li>
        <Link
          to="/dashboard"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="ml-3">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/allusers"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="flex-1 ml-3 whitespace-nowrap">Classes</span>
        </Link>
      </li>
    </ul>
  );
};

export default StudentMenu;
