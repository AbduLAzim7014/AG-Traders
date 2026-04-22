import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTruck,
  FaLock,
  FaHeadset,
  FaCheckCircle,
  FaQuoteLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

// Data & Components
import { products } from "./BlogData/BlogData";
import ProductCard from "../pages/ProductCard";
import Testimonials from "./Testimonials";

// Assets
import belan from "../assets/Images/belan.png";
import babolBelan from "../assets/Images/babolgool.png";
import marbleChakla from "../assets/Images/sarmika.png";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");

  const slides = [
    { title: "Premium Wooden Belan", img: belan, bg: "bg-orange-900" },
    { title: "Babul Special Belan", img: babolBelan, bg: "bg-blue-900" },
    { title: "Marble Chakla Set", img: marbleChakla, bg: "bg-purple-900" },
  ];

  const categories = [
    { name: "Wooden Tools", img: belan, count: "120+ Products" },
    { name: "Marble Craft", img: marbleChakla, count: "45+ Products" },
    { name: "New Arrivals", img: babolBelan, count: "New" },
    { name: "Best Sellers", img: belan, count: "Popular" },
  ];

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans overflow-x-hidden">
      {/* 1. HERO SLIDER */}
      <section className="relative min-h-[600px] md:h-[650px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 ${slides[current].bg}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-gray-100" />

            <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center md:justify-between pt-20 pb-32 md:py-0">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white z-10 md:w-1/2 text-center md:text-left mb-8 md:mb-0"
              >
                <span className="inline-block px-3 py-1 rounded bg-orange-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
                  Factory Direct Pricing
                </span>
                <h1 className="text-4xl md:text-7xl font-black mb-4 leading-tight">
                  {slides[current].title}
                </h1>
                <p className="text-base md:text-xl mb-8 opacity-90 max-w-md mx-auto md:mx-0">
                  Experience the art of traditional cooking with our handcrafted
                  tools.
                </p>
                <Link
                  to="/product"
                  className="bg-yellow-400 text-black px-10 py-3 md:px-12 md:py-4 rounded-full font-black hover:scale-105 transition-transform shadow-xl inline-block"
                >
                  Explore Collection
                </Link>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="md:w-1/2 flex justify-center z-10"
              >
                <img
                  src={slides[current].img}
                  alt={slides[current].title}
                  className="w-full max-w-[260px] md:max-w-[500px] object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/30 hover:text-white hidden md:block"
        >
          <FaChevronLeft size={48} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/30 hover:text-white hidden md:block"
        >
          <FaChevronRight size={48} />
        </button>
      </section>

      {/* 2. OVERLAPPING CATEGORY CARDS - Added Stagger Animation */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative -mt-20 md:-mt-32 z-40 px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white p-6 shadow-2xl rounded-xl flex flex-col h-80 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter">
                  {cat.name}
                </h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full font-bold text-gray-500">
                  {cat.count}
                </span>
              </div>
              <div className="flex-grow flex items-center justify-center overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-32 object-contain"
                />
              </div>
              <Link
                to="/product"
                className="text-orange-600 text-sm font-black mt-4 flex items-center gap-2 group"
              >
                Shop Now{" "}
                <span className="group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. NEW SECTION: BRAND STORY (The "Extra" Section) */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <img
              src={belan}
              alt="Craftsmanship"
              className="relative z-10 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">
              Legacy of <span className="text-orange-600">Handcrafted</span>{" "}
              Excellence
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              For over three generations, we have been perfecting the art of
              kitchen tools. Each Belan and Chakla is carved from single-piece
              seasoned wood, ensuring zero splinters and a lifetime of smooth
              rotis.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-bold text-gray-900">100% Organic</h4>
                <p className="text-sm text-gray-500">
                  No chemical polishes used.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Artisan Made</h4>
                <p className="text-sm text-gray-500">
                  Supporting local woodcarvers.
                </p>
              </div>
            </div>
            <button className="border-b-2 border-orange-600 font-bold text-orange-600 pb-1 hover:text-orange-700 transition-colors">
              Read Our Full Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. BEST SELLERS - With Scroll Animation */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-10 px-6 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              Top Rated
            </h2>
            <p className="text-gray-500">
              The most loved tools by professional chefs
            </p>
          </div>
          <Link
            to="/product"
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-orange-600 transition-all"
          >
            View All Products
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-10 no-scrollbar">
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 0.98 }}
              className="min-w-[280px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. TRUST FEATURES - Animated Grid */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6">
          {[
            { icon: <FaTruck />, t: "Rapid Delivery", d: "Pan India Shipping" },
            {
              icon: <FaCheckCircle />,
              t: "Pure Materials",
              d: "Authentic Wood",
            },
            { icon: <FaLock />, t: "Encrypted Pay", d: "Safe Checkout" },
            { icon: <FaHeadset />, t: "Live Support", d: "Expert Help" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-3xl mb-4 text-orange-500">{item.icon}</div>
              <h4 className="font-bold uppercase tracking-widest text-sm">
                {item.t}
              </h4>
              <p className="text-xs text-gray-400 mt-2">{item.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
      `,
        }}
      />
    </div>
  );
}
