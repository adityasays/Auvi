import React from "react";
import { motion } from "framer-motion";

const PrettyLoader = () => {
  const circleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-16 h-16"
        variants={containerVariants}
        animate="animate"
      >
        {/* Outer Circle */}
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-t-indigo-500 border-r-violet-500 border-b-indigo-600 border-l-violet-600 opacity-75"
          variants={circleVariants}
          animate="animate"
        />
        {/* Inner Circle */}
        <motion.div
          className="absolute w-10 h-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600"
          variants={circleVariants}
          animate="animate"
          style={{ scale: 0.6 }}
        />
      </motion.div>
      <motion.span
        className="ml-4 text-lg font-semibold text-indigo-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], transition: { duration: 1.5, repeat: Infinity } }}
      >
        Generating...
      </motion.span>
    </div>
  );
};

export default PrettyLoader;