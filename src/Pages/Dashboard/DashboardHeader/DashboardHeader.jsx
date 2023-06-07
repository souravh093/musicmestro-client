import React, { useContext } from "react";
import ProfileImage from "../../Shared/Header/ProfileImage/ProfileImage";
import { AuthContext } from "../../../Provider/AuthProvider";

const DashboardHeader = () => {
    const {user} = useContext(AuthContext);
  return (
    <div className="bg-white py-5 px-10 items-center flex justify-between">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered border border-violet-700 w-24 md:w-auto"
        />
      </div>
      <div className="flex items-center gap-2">
        <h2>{user?.displayName}</h2>
        <ProfileImage />
      </div>
    </div>
  );
};

export default DashboardHeader;
