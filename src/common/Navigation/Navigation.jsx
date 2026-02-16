import React from "react";
import { FaTruckMoving, FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <motion.nav
      className="w-full bg-[#3E2723] text-white text-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-[90%] mx-auto flex justify-between items-center py-2">
        {/* Left */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FaTruckMoving />
          <span className="tracking-wide">
            All India Fast Delivery | Premium Wooden Craft
          </span>
        </motion.div>

        {/* Right */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1, color: "#FFD700" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaPhoneAlt />
            <span>+91 9462568415</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.1, color: "#25D366" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaWhatsapp />
            <span>WhatsApp Support</span>
          </motion.div>
        </motion.div>
      </div>  
    </motion.nav>
  );
}
