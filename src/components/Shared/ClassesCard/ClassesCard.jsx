import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import axios from "axios";

const ClassesCard = ({ data, refetch }) => {
  const { user } = useContext(AuthContext);

  const handleClass = (id) => {
    if (!user) {
      toast.error("Please Login/Sign up First");
      return;
    }
    if (user) {
      axios
        .put(`${import.meta.env.VITE_BASE_URL}/decreaseclasses/${id}`)
        .then((classData) => {
          if (classData.data.modifiedCount > 0) {
            toast.success("Successfully book class");
            refetch();
          }
          console.log(classData.data);
        });
    }
  };

  const { image, _id, className, instructorName, availableSeats, price } = data;
  return (
    <div className="card w-full bg-base-100 shadow-xl group">
      <figure>
        <img
          className="h-[368px] w-full object-cover group-hover:scale-110 transition"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Course Name: {className}</h2>
        <p className="text-gray-700 mb-2 text-xl">
          Instructor Name: {instructorName}
        </p>
        <div className="flex">
          <p className="text-gray-700 mb-2 text-xl">
            Available Seats: {availableSeats}
          </p>
          <p className="text-gray-700 mb-2 font-bold text-2xl">
            Price: <span className="text-violet-700">${price}</span>
          </p>
        </div>
        <button
          onClick={() => handleClass(_id)}
          className="btn bg-violet-700 hover:bg-violet-600 text-gray-100 mt-4"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default ClassesCard;
