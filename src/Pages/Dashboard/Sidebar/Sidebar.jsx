import React from "react";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-900 px-2 py-5">
      <div className="flex gap-2 items-center">
        <img className="w-16" src={logo} alt="logo" />
        <h2 className="text-2xl font-bold text-gray-100 overflow-hidden">
          MusicMaestro
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
