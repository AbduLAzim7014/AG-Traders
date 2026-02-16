import React, { useState } from "react";
import { motion } from "framer-motion";
import services from "./serviceDATA/servicesData";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

export default function Service() {
  const [activeId, setActiveId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E2723]">
            Our Services – AG Traders
          </h1>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Trusted wooden & marble kitchen products with professional service
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-14">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3E2723]">
              <CountUp end={5000} duration={2} />+
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">Happy Customers</p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3E2723]">
              <CountUp end={10000} duration={2} />+
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">Products Sold</p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3E2723]">
              <CountUp end={40} duration={2} />+
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">Years Experience</p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3E2723]">
              4.8⭐
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">Customer Rating</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer"
                onClick={() =>
                  setActiveId(activeId === service.id ? null : service.id)
                }
              >
                <div className="flex justify-center mb-4">
                  <Icon className="text-3xl text-[#3E2723]" />
                </div>

                <h2 className="text-lg font-semibold text-center text-[#3E2723]">
                  {service.title}
                </h2>

                <p className="text-gray-600 text-center mt-2 text-sm">
                  {service.short}
                </p>

                {activeId === service.id && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-700 mt-3 text-xs text-center"
                  >
                    {service.full}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#3E2723] text-white mt-16 p-6 sm:p-10 rounded-2xl text-center shadow-xl"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            Need Bulk Orders or Wholesale Inquiry?
          </h2>

          <p className="mb-6 text-gray-200 text-sm sm:text-base">
            Contact AG Traders for special pricing on bulk wooden and marble
            kitchen products.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-white text-[#3E2723] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Request Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#3E2723] text-center">
            Request a Service
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              required
            />

            <select
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              required
            >
              <option value="">Select Service</option>
              <option>Bulk Order</option>
              <option>Wholesale Inquiry</option>
              <option>Custom Product</option>
            </select>

            <button className="bg-[#3E2723] text-white py-3 rounded-lg md:col-span-3 hover:bg-[#5D4037] transition">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
