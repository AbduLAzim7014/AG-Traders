import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message cannot be empty";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Side - Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-[#3E2723]">
            Contact AG Traders
          </h2>

          <p className="text-gray-600 mb-6">
            Have questions about our wooden & marble kitchen products? We are
            here to help you!
          </p>

          <div className="space-y-5 text-gray-700">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#3E2723]" />
              <span>+91 9462568415 </span>
              <span>+91 9462568415 </span>
              <span>+91 9462568415 </span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#3E2723]" />
              <span>Agtraders4585@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#3E2723]" />
              <span>Rajisthan, Jodhpur India</span>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-6 rounded-xl overflow-hidden">
            <iframe
              title="AG Traders Location"
              src="https://www.google.com/maps/embed?pb=!1m18..."
              className="w-full h-60"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-[#3E2723]">
            Send Us a Message
          </h2>

          {submitted && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              ✅ Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#3E2723] text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-[#5D4037]"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
