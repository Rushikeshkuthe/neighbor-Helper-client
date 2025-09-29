import React from "react";
import { IoLocation } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0px 15px 30px rgba(0,0,0,0.15)" },
  tap: { scale: 0.98 }
};

const TaskCard = ({ title, description, location, reward, date, onAccept, context = "home" }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-300 shadow-md rounded-xl p-4 sm:p-6 border border-gray-200 flex flex-col cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 text-sm sm:text-base text-gray-500">
        <h2 className="text-lg sm:text-xl font-semibold text-indigo-800">{title}</h2>
        <span className="mt-1 sm:mt-0 text-gray-600">{date}</span>
      </div>

      <p className="text-gray-700 mt-2 sm:mt-3 text-sm sm:text-base flex-1">{description}</p>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm sm:text-base text-gray-500 gap-2 sm:gap-0">
        <div className="flex items-center gap-1 sm:gap-2">
          <IoLocation size={16} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
          <TbMoneybag size={16} />
          <span>₹{reward}</span>
        </div>
      </div>

      <motion.button
        className="mt-4 w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
        onClick={onAccept}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {context === "home" ? "Accept Task" : "Proceed Payment"}
      </motion.button>
    </motion.div>
  );
};

export default TaskCard;
