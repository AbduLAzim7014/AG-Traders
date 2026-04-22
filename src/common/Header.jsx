import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaRegHeart,
  FaShoppingCart,
  FaHeart,
  FaChevronDown,
} from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { RiLoginBoxLine, RiMenuFill, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { auth } from "../pages/config/firebase";
import { getProducts } from "../services/productService";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/product" },
  { name: "Service", path: "/service" },
  { name: "Contact", path: "/contact" },
];

const categoryItems = [
  { name: "Chakla", path: "/product/category/chakla" },
  { name: "Belan", path: "/product/category/belan" },
  { name: "Marble", path: "/product/category/marble" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist?.length || 0;

  // 1. Auth Listener
  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  // 2. Scroll Listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Load Products
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingSearch(true);
      try {
        const fetched = await getProducts();
        setProductsList(fetched);
      } catch (error) {
        console.error("Search fetch error:", error);
      } finally {
        setIsLoadingSearch(false);
      }
    };
    loadProducts();
  }, []);

  // 4. Click Outside Listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target))
        setIsSearchOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 5. Optimized Search Filtering
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query || query.length < 2) return [];
    return productsList
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.material?.toLowerCase().includes(query),
      )
      .slice(0, 6);
  }, [searchQuery, productsList]);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/product?search=${searchQuery.trim()}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* BRAND LOGO */}
          <Link to="/" className="flex flex-col group">
            <h1 className="text-2xl font-black text-orange-600 tracking-tighter italic leading-none group-hover:scale-105 transition-transform">
              AG TRADERS
            </h1>
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400">
              Kitchen Excellence
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`text-sm font-bold flex items-center gap-1 transition-colors py-2 ${
                    location.pathname === item.path
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  {item.name}
                  {item.name === "Products" && (
                    <FaChevronDown className="text-[10px] group-hover:rotate-180 transition-transform" />
                  )}
                </Link>
                {item.name === "Products" && (
                  <div className="absolute top-full left-0 w-48 bg-white shadow-2xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all p-2">
                    {categoryItems.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        className="block px-4 py-2.5 text-sm rounded-lg hover:bg-orange-50 font-bold text-gray-700"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Box */}
            <div className="hidden md:block relative" ref={searchRef}>
              <div className="relative flex items-center group">
                <GoSearch
                  className={`absolute left-3 transition-colors ${isSearchOpen ? "text-orange-600" : "text-gray-400"}`}
                />
                <input
                  type="text"
                  placeholder="Find your tool..."
                  className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm w-48 lg:w-64 focus:ring-4 focus:ring-orange-500/10 focus:bg-white outline-none transition-all border border-transparent focus:border-orange-500/20 font-medium"
                  value={searchQuery}
                  onKeyDown={handleSearchSubmit}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isLoadingSearch && (
                  <div className="absolute right-3 w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                )}
              </div>

              <AnimatePresence>
                {isSearchOpen && searchQuery.length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full mt-3 w-80 right-0 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[60]"
                  >
                    <div className="p-2">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              navigate(`/product/${p.slug}`);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full p-3 flex gap-3 hover:bg-orange-50 rounded-xl text-left transition-colors"
                          >
                            <img
                              src={p.image}
                              className="w-10 h-10 object-contain bg-gray-50 rounded-lg"
                              alt=""
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-black text-gray-900 truncate">
                                {p.name}
                              </p>
                              <p className="text-xs text-orange-600 font-bold">
                                ₹{p.price}
                              </p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400 text-sm italic">
                          Product nahi mila...
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ICONS */}
            <div className="flex items-center gap-1">
              <HeaderIcon
                to="/wishlist"
                count={wishlistCount}
                icon={
                  wishlistCount > 0 ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )
                }
              />
              <HeaderIcon
                to="/cart"
                count={totalItems}
                icon={<FaShoppingCart />}
              />
            </div>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              {user ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center ml-2 border-2 border-orange-500 rounded-full p-0.5"
                >
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.email}&background=f97316&color=fff`
                    }
                    className="w-8 h-8 rounded-full"
                    alt="User"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#0f172a] text-white px-5 py-2.5 rounded-full text-xs font-black hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                  <RiLoginBoxLine size={16} />{" "}
                  <span className="hidden sm:inline tracking-widest">
                    LOGIN
                  </span>
                </Link>
              )}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-[2rem] border p-3 z-50"
                  >
                    <div className="px-4 py-3 border-b mb-2">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Account
                      </p>
                      <p className="text-sm font-black text-gray-900 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-orange-50 rounded-xl mb-1"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-orange-50 rounded-xl mb-1"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 font-black hover:bg-red-50 rounded-xl"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-2xl text-gray-700"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <RiCloseLine /> : <RiMenuFill />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 bg-white z-[150] p-6 lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-black text-orange-600 italic tracking-tighter text-xl">
                  AG TRADERS
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-3 bg-gray-100 rounded-full"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    {item.name === "Products" ? (
                      <div className="space-y-4">
                        <button
                          onClick={() =>
                            setIsMobileProductsOpen(!isMobileProductsOpen)
                          }
                          className="flex items-center justify-between w-full text-3xl font-black text-gray-900"
                        >
                          {item.name}{" "}
                          <FaChevronDown
                            className={`text-xl transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isMobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              className="pl-4 space-y-4 overflow-hidden"
                            >
                              {categoryItems.map((cat) => (
                                <Link
                                  key={cat.name}
                                  to={cat.path}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="block text-xl font-bold text-gray-500"
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="text-3xl font-black text-gray-900"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

const HeaderIcon = ({ to, icon, count }) => (
  <Link
    to={to}
    className="p-3 relative hover:bg-orange-50 rounded-2xl transition-all group"
  >
    <span className="text-xl text-gray-700 group-hover:text-orange-600">
      {icon}
    </span>
    {count > 0 && (
      <span className="absolute top-1 right-1 bg-orange-600 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
        {count}
      </span>
    )}
  </Link>
);
