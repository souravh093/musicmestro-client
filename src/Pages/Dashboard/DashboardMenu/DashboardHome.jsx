import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import bgDashboard from "../../../assets/bgDashboard.jpg"

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="hero w-full min-h-screen bg-base-200" style={{ backgroundImage: `url(${bgDashboard})` }}>
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-7xl font-bold">Welcome <br /> <span className="text-violet-500">{user?.displayName}</span></h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to="addclasses" className="btn bg-violet-800 text-white hover:bg-violet-700">Add Classes</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
