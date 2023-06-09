import React from "react";

const ClassesCard = ({ data }) => {
  const { image, name, instructorName, availableSeats, price } = data;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img className="h-[368px] object-cover" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Course Name: {name}</h2>
        <p className="text-gray-700 mb-2 text-xl">Instructor Name: {instructorName}</p>
        <div className="flex">
          <p className="text-gray-700 mb-2 text-xl">
            Available Seats: {availableSeats}
          </p>
          <p className="text-gray-700 mb-2 font-bold text-2xl">Price: <span className="text-violet-700">${price}</span></p>
        </div>
        <button className="btn bg-violet-700 hover:bg-violet-600 text-gray-100 mt-4">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default ClassesCard;
