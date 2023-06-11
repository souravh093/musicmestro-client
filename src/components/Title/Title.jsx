import React from "react";
import { motion } from "framer-motion";

const Title = ({ title, subTitle }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <motion.div
      className="flex justify-center text-center my-16"
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }} 
      variants={containerVariants}
    >
      <div>
        <motion.h2
          className="text-5xl font-bold text-gray-700 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {subTitle}
        </motion.p>
        <motion.hr
          className="border-0 h-1 w-6/12 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default Title;
