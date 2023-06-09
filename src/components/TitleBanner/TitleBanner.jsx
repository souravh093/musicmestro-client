import React from "react";

const TitleBanner = ({ title, subtitle }) => {
  return (
    <div className="bg-violet-500 py-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl text-white font-bold">{title}</h1>
        <p className="text-lg text-white mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default TitleBanner;
