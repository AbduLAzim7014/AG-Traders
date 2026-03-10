import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { services } from "./BlogData/BlogData";
import { FaTruck, FaShieldAlt, FaHeadset, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const serviceIcons = {
  "✓": <FaCheckCircle />,
  "🚚": <FaTruck />,
  "🎯": <FaShieldAlt />,
  "💬": <FaHeadset />,
};

export default function Service() {
  const [activeService, setActiveService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your inquiry! We'll contact you soon.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100"
    >
      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Premium quality wooden products with professional service,
              reliable delivery, and exceptional customer support.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-orange-600 mb-2">
              <CountUp end={5000} duration={2} />+
            </h2>
            <p className="text-gray-600 font-semibold">Happy Customers</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-green-600 mb-2">
              <CountUp end={50000} duration={2} />+
            </h2>
            <p className="text-gray-600 font-semibold">Products Sold</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-2">
              <CountUp end={40} duration={2} />+
            </h2>
            <p className="text-gray-600 font-semibold">Years Experience</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-purple-600 mb-2">4.9⭐</h2>
            <p className="text-gray-600 font-semibold">Customer Rating</p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Why Choose AG Traders?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() =>
                  setActiveService(
                    activeService === service.id ? null : service.id,
                  )
                }
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer p-6"
              >
                {/* Icon with gradient background */}
                <motion.div
                  className={`w-16 h-16 rounded-full bg-linear-to-r ${service.color} flex items-center justify-center text-white mb-4 text-2xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {serviceIcons[service.icon] || service.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Expandable Details */}
                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-4"
                    >
                      <p className="text-gray-700 text-sm">{service.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-orange-600 text-sm font-semibold mt-4 flex items-center gap-1">
                  {activeService === service.id ? "▼" : "▶"} Read more
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-12 mb-16 text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Premium Quality?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Join thousands of happy customers who trust AG Traders for authentic
            wooden kitchen products
          </p>
          <Link
            to="/product"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105"
          >
            Shop Now
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Request a Service or Bulk Quote
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Contact us for wholesale inquiries, bulk orders, or custom products
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              placeholder="Your Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
            />

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
            />

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
            />

            <motion.select
              whileFocus={{ scale: 1.02 }}
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition bg-white"
            >
              <option value="">Select Service Type *</option>
              <option value="bulk">Bulk Order</option>
              <option value="wholesale">Wholesale Inquiry</option>
              <option value="custom">Custom Product</option>
              <option value="export">Export Inquiry</option>
              <option value="other">Other</option>
            </motion.select>

            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              name="message"
              placeholder="Your Message (Optional)"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="col-span-1 md:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="col-span-1 md:col-span-2 bg-linear-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition text-lg"
            >
              Submit Inquiry
            </motion.button>
          </form>

          <div className="text-center mt-8 pt-8 border-t">
            <p className="text-gray-600 mb-4">Or contact us directly:</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a
                href="tel:+919462568415"
                className="text-orange-600 font-bold text-lg hover:text-orange-700 transition"
              >
                📞 +91-946-256-8415
              </a>
              <a
                href="mailto:info@agtraders.com"
                className="text-orange-600 font-bold text-lg hover:text-orange-700 transition"
              >
                📧 abdulkhalik4548@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
