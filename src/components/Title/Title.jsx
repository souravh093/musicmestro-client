import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="flex justify-center text-center my-16">
      <div>
        <h2 className="text-5xl font-bold text-gray-700 mb-3">{title}</h2>
        <p className="text-lg text-gray-700 mb-2">{subTitle}</p>
        <hr className="border-0 h-1 w-6/12 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
      </div>
    </div>
  );
};

export default Title;
