import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader/DashboardHeader";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-6 bg-gray-200">
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
