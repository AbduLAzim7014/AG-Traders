import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { RiLoginBoxLine } from "react-icons/ri";

import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Service", path: "/service" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch Products
  useEffect(() => {
    fetch("https://yourproject.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => {
        const woodenProducts = data.map((item) => item.name);
        setProducts(woodenProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  const handleItemClick = (item) => {
    setSearchQuery(item);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(savedWishlist.length);
  }, []);

  const [wishlistCount, setWishlistCount] = useState(0);

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Click Outside Close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      className="w-full bg-white shadow-sm sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* LOGO */}
          <div className="flex flex-col">
            <motion.h2
              className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              🛍️ A G Traders
            </motion.h2>

            <motion.p
              className="text-xs text-gray-500"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Premium Wooden Items
            </motion.p>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className="font-medium text-gray-700 hover:text-yellow-500 transition"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.li>
            ))}
          </ul>

          {/* SEARCH */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <motion.div
              className="flex items-center border rounded-lg overflow-hidden"
              whileFocus={{ scale: 1.02 }}
            >
              <input
                type="text"
                placeholder="Search wooden products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchOpen(true)}
                className="px-4 py-2 w-60 focus:outline-none"
              />
              <GoSearch className="text-gray-600 text-[22px] px-2" />
            </motion.div>

            <AnimatePresence>
              {isSearchOpen && filteredProducts.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-1 w-60 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-50"
                >
                  {filteredProducts.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleItemClick(item)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex items-center gap-5">
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link to="/login">
                <RiLoginBoxLine className="text-[20px] cursor-pointer hover:text-yellow-500" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link to="/profile">
                <FaRegUser className="text-[20px] cursor-pointer hover:text-yellow-500" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.2 }}>
              <Link to="/wishlist">
                <FaRegHeart className="text-[20px] cursor-pointer hover:text-yellow-500" />
              </Link>
            </motion.div>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t py-4 space-y-4"
            >
              <div className="px-4">
                <input
                  type="text"
                  placeholder="Search wooden products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <ul className="flex flex-col items-center gap-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-gray-700 hover:text-yellow-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center gap-6 pt-2">
                <RiLoginBoxLine className="text-xl" />
                <FaRegUser className="text-xl" />
                <FaRegHeart className="text-xl" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
