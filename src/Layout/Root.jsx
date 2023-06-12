import React from "react";
import Header from "../Pages/Shared/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";

const Root = () => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-168px)] pt-[84px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
