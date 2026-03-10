import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "Products", path: "/product" },
        { name: "Services", path: "/service" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Chakla", path: "/product" },
        { name: "Belan", path: "/product" },
        { name: "Wooden Items", path: "/product" },
        { name: "Premium Collection", path: "/product" },
      ],
    },
    {
      title: "Business",
      links: [
        { name: "Bulk Orders", path: "/service" },
        { name: "Wholesale Inquiry", path: "/service" },
        { name: "Drop Shipping", path: "/service" },
        { name: "Custom Products", path: "/service" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", path: "/contact" },
        { name: "Shipping Info", path: "/service" },
        { name: "Return Policy", path: "/" },
        { name: "Privacy Policy", path: "/" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFaceBook, url: "#", label: "Facebook" },
    { icon: FaInstagram, url: "#", label: "Instagram" },
    { icon: FaTwitter, url: "#", label: "Twitter" },
    { icon: FaYoutube, url: "#", label: "YouTube" },
    { icon: FaLinkedinIn, url: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-bold bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-3">
                AG Traders
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Premium handcrafted wooden kitchen products. Made with quality,
              delivered with care.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all"
                  >
                    <Icon size={16} />
                  </motion.a>
                ),
              )}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-lg font-bold text-white mb-4 border-b border-orange-600 pb-2">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                    >
                      → {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-orange-600 to-orange-500 rounded-xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-orange-100 mb-4">
            Get exclusive deals and latest product updates delivered to your
            inbox
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-gray-900"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50 transition"
            >
              Subscribe
            </motion.button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white mt-2 text-sm"
            >
              ✓ Thank you for subscribing!
            </motion.p>
          )}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FaPhone size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Phone</h4>
              <a
                href="tel:+919462568415"
                className="text-gray-400 hover:text-orange-500 transition"
              >
                +91-9462-568-415
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FaEnvelope size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Email</h4>
              <a
                href="mailto:info@agtraders.com"
                className="text-gray-400 hover:text-orange-500 transition"
              >
                info@agtraders.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Location</h4>
              <p className="text-gray-400 text-sm">India</p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-black bg-opacity-50 py-6"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AG Traders. All rights reserved.
            </p>

            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <Link to="/" className="hover:text-orange-500 transition">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/" className="hover:text-orange-500 transition">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/" className="hover:text-orange-500 transition">
                Refund Policy
              </Link>
            </div>

            <p className="text-gray-400 text-sm">
              Made with <span className="text-red-500">❤️</span> by Abdul Azim
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

// Fix import error
const FaFaceBook = FaFacebookF;
