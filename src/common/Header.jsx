import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser, FaRegHeart, FaShoppingCart, FaHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { RiLoginBoxLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../Components/BlogData/BlogData";
import { ToastContainer } from "react-toastify";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/product" },
  { name: "Service", path: "/service" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  // CHECK USER LOGIN
  useEffect(() => {
    const checkUser = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(currentUser);
    };

    checkUser();

    window.addEventListener("storage", checkUser);

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  // SEARCH FILTER
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  // CLOSE DROPDOWN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <ToastContainer />

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white shadow"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* TOP BAR */}

          <div className="flex items-center justify-between py-4">
            {/* LOGO */}

            <Link to="/" className="flex flex-col">
              <h1 className="text-2xl font-bold text-orange-600">AG Traders</h1>
              <span className="text-xs text-gray-500">
                Premium Kitchen Products
              </span>
            </Link>

            {/* MENU */}

            <ul className="hidden lg:flex gap-8 font-medium">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="hover:text-orange-600 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* SEARCH */}

            <div className="hidden md:block relative w-72" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Search wooden belan, marble chakla..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />

              <GoSearch className="absolute right-3 top-3 text-gray-400" />

              {isSearchOpen && searchQuery && (
                <div className="absolute w-full bg-white shadow-lg border mt-2 rounded max-h-64 overflow-y-auto">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-100"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />

                      <div className="text-left">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-green-600">
                          ₹{product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT ICONS */}

            <div className="flex items-center gap-6">
              {/* WISHLIST */}

              <Link to="/wishlist" className="relative">
                {wishlistItems > 0 ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}

                {wishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {wishlistItems}
                  </span>
                )}
              </Link>

              {/* CART */}

              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-xl" />

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* PROFILE */}

              <div className="relative">
                {!user ? (
                  <Link to="/login">
                    <RiLoginBoxLine className="text-2xl" />
                  </Link>
                ) : (
                  <>
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                      <FaRegUser className="text-xl" />
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-0 mt-3 w-44 bg-white shadow-lg border rounded"
                        >
                          <div className="p-3 border-b text-sm font-semibold">
                            {user?.name || "User"}
                          </div>

                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Profile
                          </Link>

                          <Link
                            to="/orders"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Orders
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}

              <button
                className="lg:hidden text-xl"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                ☰
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}

          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="lg:hidden border-t py-4"
              >
                {menuItems.map((item, index) => (
                  <Link key={index} to={item.path} className="block px-4 py-2">
                    {item.name}
                  </Link>
                ))}

                {!user ? (
                  <Link to="/login" className="block px-4 py-2 text-orange-600">
                    Login
                  </Link>
                ) : (
                  <>
                    <Link to="/profile" className="block px-4 py-2">
                      Profile
                    </Link>

                    <Link to="/orders" className="block px-4 py-2">
                      Orders
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-red-600"
                    >
                      Logout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
