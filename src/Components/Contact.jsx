import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!formData.message.trim()) newErrors.message = "Message is empty";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        toast.success("🚀 Message dispatched! Talk soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSubmitting(false);
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-6 relative overflow-hidden font-sans">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-100 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-orange-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Available Worldwide
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-[#1a1a1a] mb-8 uppercase tracking-tighter leading-none"
          >
            Ready to <span className="text-orange-600">Level Up</span> <br />
            Your Kitchen?
          </motion.h1>

          <p className="text-gray-500 max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            From Jodhpur to the world. Reach out for bulk orders, custom
            craftsmanship, or just to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 mb-20 items-stretch">
          {/* Left Side: Dynamic Contact Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-black text-gray-900 mb-6 uppercase italic flex items-center gap-2">
              Direct Access <FaArrowRight className="text-orange-600 text-sm" />
            </h2>
            <ContactCard
              icon={<FaPhoneAlt />}
              title="Voice Call"
              detail="+91 9462568415"
              color="bg-blue-50 text-blue-600"
            />
            <ContactCard
              icon={<FaWhatsapp />}
              title="WhatsApp Chat"
              detail="+91 7728011202"
              color="bg-green-50 text-green-600"
            />
            <ContactCard
              icon={<FaEnvelope />}
              title="Official Email"
              detail="abdulkhalik4548@gmail.com"
              color="bg-orange-50 text-orange-600"
            />
            <ContactCard
              icon={<FaMapMarkerAlt />}
              title="Visit Factory"
              detail="Ghasmandi Rd, Jodhpur"
              color="bg-gray-50 text-gray-600"
            />
          </div>

          {/* Right Side: High-Contrast Dark Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-[#0f172a] p-8 md:p-12 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/10 rounded-bl-full" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <ModernInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={errors.name}
                />
                <ModernInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                />
              </div>
              <ModernInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={errors.phone}
              />
              <div className="flex flex-col">
                <label className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-3 ml-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="What can we build for you?"
                  className="bg-white/5 border border-white/10 p-5 rounded-3xl text-white outline-none focus:border-orange-600 transition-all resize-none placeholder:text-white/10 shadow-inner"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-5 rounded-3xl font-black uppercase tracking-widest text-white bg-orange-600 hover:bg-orange-500 shadow-2xl shadow-orange-600/30 flex items-center justify-center gap-3 transition-all"
              >
                {isSubmitting ? (
                  "Dispatching..."
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="bg-gray-100 rounded-[3.5rem] h-[500px] overflow-hidden border-[12px] border-white shadow-2xl"
        >
          <iframe
            title="AG Traders Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.251403598717!2d73.01824137541793!3d26.285949577028163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c3563914a13%3A0xc3f6087d3a0429a1!2sGhasmandi%20Rd%2C%20Jodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="grayscale hover:grayscale-0 transition-all duration-1000 contrast-110"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}

// Sub-components
function ContactCard({ icon, title, detail, color }) {
  return (
    <motion.div
      whileHover={{ x: 10 }}
      className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 transition-all group cursor-pointer"
    >
      <div
        className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-xl transition-all group-hover:scale-110 shadow-sm`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">
          {title}
        </p>
        <p className="font-bold text-gray-800">{detail}</p>
      </div>
    </motion.div>
  );
}

function ModernInput({ label, error, ...props }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2 ml-2">
        {label}
      </label>
      <input
        {...props}
        className={`bg-white/5 border ${error ? "border-red-500/50" : "border-white/10"} p-4 rounded-2xl text-white outline-none focus:border-orange-600 transition-all placeholder:text-white/10`}
      />
      {error && (
        <span className="text-red-500 text-[10px] font-bold mt-2 ml-2 italic">
          {error}
        </span>
      )}
    </div>
  );
}
