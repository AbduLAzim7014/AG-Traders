import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../Components/BlogData/BlogData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 bg-linear-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Thousands of satisfied customers trust AG Traders for premium
            quality wooden products
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {testimonials.map(
              (testimonial, idx) =>
                current === idx && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                  >
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      {/* Avatar and Name */}
                      <div className="text-center">
                        <div className="text-8xl mb-4">{testimonial.image}</div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-orange-600 font-semibold mb-2">
                          {testimonial.role}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">
                          📍 {testimonial.location}
                        </p>
                        <div className="flex justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < Math.floor(testimonial.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Comment */}
                      <div className="md:col-span-2">
                        <div className="text-6xl text-orange-500 mb-4 leading-none">
                          "
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          {testimonial.comment}
                        </p>
                        <div className="flex gap-2">
                          {[...Array(Math.floor(testimonial.rating))].map(
                            (_, i) => (
                              <span key={i} className="text-yellow-400 text-xl">
                                ★
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition shadow-lg"
            >
              <FaChevronLeft />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    current === idx
                      ? "bg-orange-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition shadow-lg"
            >
              <FaChevronRight />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-gray-600">
            {current + 1} / {testimonials.length}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center"
          >
            <h3 className="text-4xl font-bold text-orange-600 mb-2">5000+</h3>
            <p className="text-gray-700 font-semibold">
              Happy Customers Worldwide
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 text-center"
          >
            <h3 className="text-4xl font-bold text-green-600 mb-2">4.9/5</h3>
            <p className="text-gray-700 font-semibold">
              Average Customer Rating
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center"
          >
            <h3 className="text-4xl font-bold text-blue-600 mb-2">98%</h3>
            <p className="text-gray-700 font-semibold">
              Customer Satisfaction Rate
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
