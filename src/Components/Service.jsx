import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { services } from "./BlogData/BlogData";
import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaTools,
  FaQuoteLeft,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call
    toast.info("Processing your inquiry...");
    setTimeout(() => {
      toast.success("Inquiry Sent! We'll reach out within 24 hours.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#0f172a] text-white py-20 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]"
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold mb-4 border border-orange-500/30"
          >
            Trusted Service Provider
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Excellence in <span className="text-orange-500">Every Detail</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            AG Traders combines traditional craftsmanship with modern efficiency
            to deliver premium quality products globally.
          </p>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative -mt-16 z-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem
            label="Happy Customers"
            val={5000}
            color="text-orange-600"
            icon={<FaUsers />}
          />
          <StatItem
            label="Products Delivered"
            val={50000}
            color="text-blue-600"
            icon={<FaTruck />}
          />
          <StatItem
            label="Years of Trust"
            val={40}
            color="text-green-600"
            icon={<FaAward />}
          />
          <StatItem
            label="Rating"
            val={4.9}
            color="text-purple-600"
            icon={<FaCheckCircle />}
            isFloat
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* 3. SERVICES GRID */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
              Our Core Offerings
            </h2>
            <div className="w-24 h-2 bg-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                layout
                onClick={() =>
                  setActiveService(
                    activeService === service.id ? null : service.id,
                  )
                }
                className={`p-8 rounded-[2.5rem] transition-all duration-500 cursor-pointer border ${
                  activeService === service.id
                    ? "bg-[#0f172a] text-white shadow-2xl border-orange-500"
                    : "bg-white border-gray-100 hover:border-orange-200"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner ${
                    activeService === service.id
                      ? "bg-orange-500 text-white"
                      : "bg-orange-50 text-orange-500"
                  }`}
                >
                  {serviceIcons[service.icon] || <FaTools />}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p
                  className={`text-sm mb-4 ${activeService === service.id ? "text-gray-400" : "text-gray-500"}`}
                >
                  {service.description}
                </p>

                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-orange-400 text-sm pt-4 border-t border-white/10 italic mb-4">
                        {service.details ||
                          "Experience top-tier quality standards and direct pricing."}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Parent onClick ko rokne ke liye
                          navigate(`/product`); // Ya aap specific category page par bhej sakte hain
                        }}
                        className="bg-orange-500 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-orange-600"
                      >
                        Explore More
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. WORKING PROCESS */}
        <div className="mb-32 bg-white p-12 rounded-[40px] shadow-sm border border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-2 uppercase tracking-wide">
              Working Process
            </h2>
            <p className="text-gray-500 font-medium">
              Simple steps to get your premium products
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Selection",
                desc: "Browse our premium catalogue.",
              },
              {
                num: "02",
                title: "Quality Check",
                desc: "Manual inspection for wood grain.",
              },
              {
                num: "03",
                title: "Packing",
                desc: "Expert export-grade packaging.",
              },
              {
                num: "04",
                title: "Delivery",
                desc: "Express shipping within 24 hours.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="text-6xl font-black text-gray-100 absolute -top-10 left-0 -z-10">
                  {step.num}
                </span>
                <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. CONTACT FORM SECTION */}
        <section className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
              Need a Bulk <span className="text-orange-500">Business</span>{" "}
              Quote?
            </h2>
            <div className="space-y-6">
              <ContactLink
                icon={<FaPhone />}
                title="Call Anytime"
                detail="+91 9462568415"
              />
              <ContactLink
                icon={<FaEnvelope />}
                title="Email Us"
                detail="abdulkhalik4548@gmail.com"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-3 bg-[#0f172a] p-10 rounded-[2.5rem] shadow-2xl relative"
          >
            <FaQuoteLeft className="absolute top-8 right-8 text-white opacity-5 text-7xl" />
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4 relative z-10"
            >
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="tel"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
              <div className="relative group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-input w-full appearance-none pr-10 cursor-pointer"
                >
                  <option value="" className="text-gray-900">
                    Select Category
                  </option>
                  <option value="Bulk" className="text-gray-900">
                    Bulk Order
                  </option>
                  <option value="Wholesale" className="text-gray-900">
                    Wholesale
                  </option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-focus-within:rotate-180 transition-transform" />
              </div>
              <textarea
                placeholder="Message..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input md:col-span-2 h-32 resize-none"
              ></textarea>
              <button
                type="submit"
                className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all active:scale-[0.98]"
              >
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </section>
      </div>

      <style>{`
        .form-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 0.75rem;
          color: white;
          outline: none;
          transition: 0.3s;
        }
        .form-input:focus {
          border-color: #f97316;
          background: rgba(255, 255, 255, 0.1);
        }
        .form-input option {
          background: white;
          color: #111;
        }
      `}</style>
    </div>
  );
}

// Sub-components
function StatItem({ label, val, color, icon, isFloat = false }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white flex flex-col items-center text-center"
    >
      <div className={`text-2xl ${color} mb-2`}>{icon}</div>
      <h2 className={`text-3xl font-black ${color}`}>
        <CountUp
          end={val}
          decimals={isFloat ? 1 : 0}
          duration={3}
          enableScrollSpy
        />
        {!isFloat && "+"}
      </h2>
      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter mt-1">
        {label}
      </p>
    </motion.div>
  );
}

function ContactLink({ icon, title, detail }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          {title}
        </p>
        <p className="font-bold text-gray-800">{detail}</p>
      </div>
    </div>
  );
}
