import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTruck,
  FaLock,
  FaHeadset,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaFire,
  FaGift,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { products, services } from "./BlogData/BlogData";
import ProductCard from "../pages/ProductCard";
import Testimonials from "./Testimonials";

const img1 = "src/assets/Images/babol belan.png";
const img2 = "src/assets/Images/neems.png";
const img3 = "src/assets/Images/sarmikaa.png";

import belan from "../../src/assets/Images/belan.png";
import babolBelan from "../../src/assets/Images/babolgool.png";
import neemBelan from "../assets/Images/babolgool.png";
import marbleChakla from "../../src/assets/Images/sarmika.png";
import { toast } from "react-toastify";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typing = setTimeout(() => {
      if (charIndex < words[wordIndex].length) {
        setText((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 1500);
      }
    }, 100);

    return () => clearTimeout(typing);
  }, [charIndex, wordIndex]);
  const categories = [
    { name: "All", icon: "🛍️" },
    { name: "Wooden", icon: "🪵" },
    { name: "Marble", icon: "💎" },
    { name: "Kitchen", icon: "👨‍🍳" },
  ];

  const features = [
    { icon: <FaTruck />, title: "Free Shipping", desc: "On orders above ₹500" },
    {
      icon: <FaCheckCircle />,
      title: "100% Authentic",
      desc: "Direct from manufacturer",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      desc: "SSL encrypted checkout",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Dedicated customer care",
    },
  ];

  const Submitevent = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("error fill email ");
    } else {
      toast.success("sucess submit ");
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.slice(0, 6);
  const topServices = services.slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  const specialOffers = [
    {
      id: 1,
      name: "Wooden Belan",
      price: 199,
      img: belan,
    },
    {
      id: 2,
      name: "Babul Wooden Belan",
      price: 249,
      img: babolBelan,
    },
    {
      id: 3,
      name: "Neem Wooden Belan",
      price: 299,
      img: neemBelan,
    },
    {
      id: 4,
      name: "Marble Chakla Belan",
      price: 499,
      img: marbleChakla,
    },
  ];

  return (
    <>
      {/* ================= HERO CAROUSEL ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900 to-black">
        {/* Animated Gradient Blur Circles */}
        <div className="absolute w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10 relative z-10">
          {/* LEFT CONTENT */}
          <div className="text-white">
            <span className="inline-block px-4 py-1 mb-4 text-sm bg-yellow-400 text-black rounded-full font-semibold shadow-lg">
              🔥 Flat 50% Off
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Elevate Your Shopping <br />
              With <span className="text-yellow-400">AG Traders</span>
            </h1>

            <p className="mt-6 text-gray-300 max-w-lg">
              Premium quality products at unbeatable wholesale prices. Fast
              delivery, secure payment & trusted service.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-xl hover:scale-105 transition duration-300">
                Shop Collection
              </button>

              <button className="px-8 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition duration-300">
                Explore Deals
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative flex justify-center">
            <div className="absolute w-80 h-80 bg-yellow-400 rounded-full blur-2xl opacity-30"></div>

            <img
              src="src/assets/Images/belan.png"
              alt="product"
              className="relative w-72 md:w-96 drop-shadow-2xl animate-bounce "
            />

            {/* Floating Card */}
            <div className="absolute bottom-5 left-5 backdrop-blur-lg bg-white/10 border border-white/20 p-4 rounded-xl shadow-xl text-white">
              <p className="text-sm">Starting From</p>
              <h3 className="text-xl font-bold text-yellow-400">$99</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST FEATURES ================= */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 items-center hover:bg-orange-50 p-4 rounded-lg transition"
              >
                <div className="text-4xl text-orange-600">{feature.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORY SHOWCASE ================= */}
      <section className="py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveCategory(cat.name)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl text-center transition-all transform hover:scale-105 ${
                  activeCategory === cat.name
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-900 shadow hover:shadow-lg"
                }`}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">
              Explore our most loved products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/product"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition flex items-center gap-2"
            >
              View All Products <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {specialOffers.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg p-4 text-gray-900"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h3 className="font-bold text-lg mb-2">{product.name}</h3>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-orange-600">
                ₹{product.price}
              </span>

              <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                -30%
              </span>
            </div>

            <button className="w-full mt-3 bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 transition">
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose AG Traders?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "All products are handcrafted with the finest materials",
              },
              {
                title: "Affordable Prices",
                desc: "Best prices without compromising on quality",
              },
              {
                title: "Fast Delivery",
                desc: "Quick and reliable shipping across India",
              },
              {
                title: "Customer Support",
                desc: "Dedicated team ready to help 24/7",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✨</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {topServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <Testimonials />

      {/* ================= NEWSLETTER ================= */}
      <section className="py-16 bg-linear-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 text-orange-100">
              Get exclusive offers and new product updates directly to your
              inbox
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                required
              />
              <button
                onClick={Submitevent}
                type="submit"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Subscribe
              </button>
            </form>

            <p className="text-orange-100 text-sm">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                About AG Traders
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Since 2000, AG Traders has been committed to delivering premium
                quality wooden and marble kitchen products.
              </p>
              <div className="space-y-3">
                {[
                  "Handcrafted with precision",
                  "100% Eco-friendly materials",
                  "Traditional techniques",
                  "Lifetime quality guarantee",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-orange-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: "40+", label: "Years Experience" },
                { number: "5000+", label: "Happy Customers" },
                { number: "50+", label: "Products" },
                { number: "4.9★", label: "Rating" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center"
                >
                  <h3 className="text-3xl font-bold text-orange-600 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 bg-linear-to-b from-gray-900 to-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Kitchen?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Explore our premium collection of wooden and marble kitchen
            essentials
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/product"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2"
            >
              Shop Now <FaArrowRight />
            </Link>
            <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-orange-500 hover:text-white transition flex items-center justify-center gap-2">
              <FaPhone /> Call Us
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="bg-orange-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-6">
          <div className="flex items-center gap-3">
            <FaPhone className="text-2xl" />
            <div>
              <p className="text-sm text-orange-100">Call us</p>
              <p className="font-bold">+91 9462568415</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-2xl" />
            <div>
              <p className="text-sm text-orange-100">Email us</p>
              <p className="font-bold">abdulkhalik4548@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaGift className="text-2xl" />
            <div>
              <p className="text-sm text-orange-100">Special Offers</p>
              <p className="font-bold">No hidden charges</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
