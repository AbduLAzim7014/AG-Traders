import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../Components/BlogData/BlogData";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-play Logic: Har 5 second mein testimonial badlega
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []); // Now it's safe because it uses the functional update (prev) => ... // Empty dependency array is safer here if using functional updates
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter">
            Real Stories, Real Quality
          </h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Join thousands of happy homes using AG Traders handcrafted
            kitchenware.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-14 border border-gray-100 relative overflow-hidden"
            >
              {/* Decoration Background Icon */}
              <FaQuoteLeft className="absolute top-10 left-10 text-orange-50 text-7xl -z-0" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                {/* Avatar Section */}
                <div className="flex-shrink-0 text-center">
                  <div className="text-8xl mb-4 drop-shadow-xl scale-110">
                    {testimonials[current].image}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">
                    {testimonials[current].name}
                  </h3>
                  <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mt-1">
                    {testimonials[current].role}
                  </p>
                  <p className="text-gray-400 text-[10px] mt-1 font-bold italic">
                    📍 {testimonials[current].location}
                  </p>
                </div>

                {/* Comment Section */}
                <div className="flex-1">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.floor(testimonials[current].rating)
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-xl leading-relaxed font-medium italic">
                    "{testimonials[current].comment}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-4 rounded-full bg-white border shadow-sm text-gray-400 hover:text-orange-600 transition-all hover:shadow-md active:scale-95"
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === idx
                      ? "bg-orange-600 w-10"
                      : "bg-gray-200 w-2 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-4 rounded-full bg-white border shadow-sm text-gray-400 hover:text-orange-600 transition-all hover:shadow-md active:scale-95"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="bg-orange-50 p-8 rounded-3xl text-center border border-orange-100 shadow-sm">
            <h3 className="text-4xl font-black text-orange-600 mb-2">5000+</h3>
            <p className="text-gray-700 font-bold uppercase text-xs">
              Happy Customers
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-3xl text-center border border-green-100 shadow-sm">
            <h3 className="text-4xl font-black text-green-600 mb-2">4.9/5</h3>
            <p className="text-gray-700 font-bold uppercase text-xs">
              Top Rated Quality
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-3xl text-center border border-blue-100 shadow-sm">
            <h3 className="text-4xl font-black text-blue-600 mb-2">98%</h3>
            <p className="text-gray-700 font-bold uppercase text-xs">
              Return Rate
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
