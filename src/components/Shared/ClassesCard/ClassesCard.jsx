import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../../hook/useCart";
import { motion, useAnimation } from "framer-motion";

const ClassesCard = ({ data }) => {
  const { user, adminRole, instructorRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { image, _id, className, instructorName, availableSeats, price } = data;
  const [, cartRefetch] = useCart();
  const cardRef = useRef(null);
  const controls = useAnimation();

  const handleClass = () => {
    if (!user) {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }
    if (user && user.email) {
      const classItem = {
        classItemId: _id,
        name: className,
        price,
        instructorName,
        email: user?.email,
        image,
      };
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/carts`, classItem)
        .then((cartData) => {
          cartRefetch();
          toast.success("Successfully booked class");
          console.log(cartData);
        });
    }
  };

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
        }
      });
    }, options);

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [controls]); 

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={`card w-full bg-base-100 shadow-xl group ${availableSeats <= 0 && "bg-red-500"}`}
    >
      <figure>
        <motion.img
          className="h-[368px] w-full object-cover group-hover:scale-110 transition"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-gray-700">Course Name: {className}</h2>
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
          disabled={adminRole || instructorRole || availableSeats <= 0}
          onClick={() => handleClass(_id)}
          className="btn bg-violet-700 hover:bg-violet-600 text-gray-100 mt-4"
        >
          Enroll Now
        </button>
      </div>
    </motion.div>
  );
};

export default ClassesCard;
