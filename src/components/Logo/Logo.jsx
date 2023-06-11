import React from "react";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2"
    >
      <img className="w-12" src={logo} alt="logo" />
      <h2 className="text-2xl font-semibold">
        Music<span className="text-violet-700">Maestro</span>
      </h2>
    </motion.li>
  );
};

export default Logo;
