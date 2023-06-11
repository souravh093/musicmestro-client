import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const ProfileCard = ({ data }) => {
  const { image, name, email } = data;

  const cardRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const options = {
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          controls.start({ x: 0, opacity: 1 });
        }
      });
    }, options);

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [controls]);


  return (
    <motion.div
      ref={cardRef}
      initial={{ x: -200, opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900"
    >
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-32 w-full"
          src={image}
          alt="Woman looking front"
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-gray-500">{email}</p>
      </div>
      <div className="p-4 border-t mx-8 mt-2">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
        >
          Follow
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
